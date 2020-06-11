import { useMemo } from 'react'
import { line, area, curveBasis, curveLinear } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { useTheme } from '@nivo/core'
import { FunnelDefaultProps as defaults } from './props'

const useShapeGenerators = interpolation =>
    useMemo(
        () => [
            // area generator which is used to draw funnel chart parts.
            area()
                .x0(d => d.x0)
                .x1(d => d.x1)
                .y(d => d.y)
                .curve(interpolation === 'smooth' ? curveBasis : curveLinear),
            // we're using a different line generator to draw borders, this way
            // we we don't have borders joining each side of the parts.
            // it's important to have an empty point when defining the points
            // to be used along with this, otherwise we'll get a line between both sides.
            line()
                .defined(d => d !== null)
                .x(d => d.x)
                .y(d => d.y)
                .curve(interpolation === 'smooth' ? curveBasis : curveLinear),
        ],
        [interpolation]
    )

const useScales = ({ data, width, height, spacing }) => useMemo(() => {
    const spacingValue = height * spacing
    const bandwidth = (height - spacingValue * (data.length -1)) / data.length

    // we're not using d3 band scale here to be able to get
    // the actual paddingInner value in pixels, required to
    // create centered separator lines between parts
    const bandScale = (index) => spacingValue * index + bandwidth * index
    bandScale.bandwidth = () => bandwidth
    bandScale.paddingInner = () => spacingValue

    const allValues = data.map(d => d.value)

    const linearScale = scaleLinear()
        .domain([0, Math.max(...allValues)])
        .range([0, width])

    return [bandScale, linearScale]
}, [data, width, height, spacing])

/**
 * Creates required layout to generate a funnel chart,
 * it uses almost the same parameters as the Funnel component.
 *
 * For purpose/constrains on the parameters, please have a look
 * at the component's props.
 */
export const useFunnel = ({
    data,
    width,
    height,
    direction,
    interpolation = defaults.interpolation,
    spacing = defaults.spacing,
    shapeContinuity: rawShapeContinuity = defaults.shapeContinuity,
    colors = defaults.colors,
    fillOpacity = defaults.fillOpacity,
    borderWidth = defaults.borderWidth,
    borderColor = defaults.borderColor,
    borderOpacity = defaults.borderOpacity,
    beforeSeparatorsLength = defaults.beforeSeparatorsLength,
    beforeSeparatorsOffset = defaults.beforeSeparatorsOffset,
    afterSeparatorsLength = defaults.afterSeparatorsLength,
    afterSeparatorsOffset = defaults.afterSeparatorsOffset,
}) => {
    const [areaGenerator, borderGenerator] = useShapeGenerators(interpolation)

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, 'id')
    const getBorderColor = useInheritedColor(borderColor, theme)

    const [bandScale, linearScale] = useScales({
        data, width, height, spacing
    })

    const parts = data.map((datum, index) => {
        const width = linearScale(datum.value)
        const height = bandScale.bandwidth()
        const y0 = bandScale(index)

        const enhancedPart = {
            data: datum,
            width,
            height,
            color: getColor(datum),
            fillOpacity,
            borderWidth,
            borderOpacity,
            x: 0,
            x0: width * -0.5,
            x1: width * 0.5,
            y: y0 + height * .5,
            y0: y0,
            y1: y0 + height,
        }

        enhancedPart.borderColor = getBorderColor(enhancedPart)

        return enhancedPart
    })

    const shapeContinuity = rawShapeContinuity / 2

    const beforeSeparators = []
    const afterSeparators = []

    parts.forEach((part, index) => {
        part.points = []
        part.points.push({ x: part.x0, y: part.y0 })
        part.points.push({ x: part.x1, y: part.y0 })

        const nextPart = parts[index + 1]
        if (nextPart) {
            part.points.push({ x: nextPart.x1, y: part.y1 })
            part.points.push({ x: nextPart.x0, y: part.y1 })
        } else {
            part.points.push({ x: part.x1, y: part.y1 })
            part.points.push({ x: part.x0, y: part.y1 })
        }

        part.areaPoints = [
            {
                x0: part.points[0].x,
                x1: part.points[1].x,
                y: part.y0,
            },
            {
                x0: part.points[0].x,
                x1: part.points[1].x,
                y: part.y0 + part.height * shapeContinuity,
            },
            {
                x0: part.points[3].x,
                x1: part.points[2].x,
                y: part.y1 - part.height * shapeContinuity,
            },
            {
                x0: part.points[3].x,
                x1: part.points[2].x,
                y: part.y1,
            },
        ]

        part.borderPoints = []
        part.borderPoints.push({
            x: part.areaPoints[0].x0,
            y: part.areaPoints[0].y,
        })
        part.borderPoints.push({
            x: part.areaPoints[1].x0,
            y: part.areaPoints[1].y,
        })
        part.borderPoints.push({
            x: part.areaPoints[2].x0,
            y: part.areaPoints[2].y,
        })
        part.borderPoints.push({
            x: part.areaPoints[3].x0,
            y: part.areaPoints[3].y,
        })
        part.borderPoints.push(null)
        part.borderPoints.push({
            x: part.areaPoints[3].x1,
            y: part.areaPoints[3].y,
        })
        part.borderPoints.push({
            x: part.areaPoints[2].x1,
            y: part.areaPoints[2].y,
        })
        part.borderPoints.push({
            x: part.areaPoints[1].x1,
            y: part.areaPoints[1].y,
        })
        part.borderPoints.push({
            x: part.areaPoints[0].x1,
            y: part.areaPoints[0].y,
        })

        beforeSeparators.push({
            partId: part.data.id,
            x0: -part.width / 2 - beforeSeparatorsOffset,
            x1: -linearScale.range()[1] / 2 - beforeSeparatorsLength,
            y: part.y0 - bandScale.paddingInner() / 2
        })
        afterSeparators.push({
            partId: part.data.id,
            x0: part.width / 2 + afterSeparatorsOffset,
            x1: linearScale.range()[1] / 2 + afterSeparatorsLength,
            y: part.y0 - bandScale.paddingInner() / 2
        })
    })

    beforeSeparators.push({
        ...beforeSeparators[beforeSeparators.length - 1],
        partId: 'none',
        y: parts[parts.length - 1].y1,
    })
    afterSeparators.push({
        ...afterSeparators[afterSeparators.length - 1],
        partId: 'none',
        y: parts[parts.length - 1].y1,
    })

    return {
        parts,
        areaGenerator,
        borderGenerator,
        beforeSeparators,
        afterSeparators,
    }
}
