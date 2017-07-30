import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Nivo, { defaultTheme } from '../../../Nivo'
import { margin as marginPropType } from '../../../PropTypes'
import { getColorRange } from '../../../ColorUtils'
import SvgWrapper from '../SvgWrapper'
import Axis from '../../axes/Axis'
import Grid from '../../axes/Grid'
import BarItem from './BarItem'
import BarItemLabel from './BarItemLabel'
import { scaleBand, scaleLinear, stack } from 'd3'

const axisPropType = PropTypes.shape({
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    format: PropTypes.func,
})

const getAxis = (
    axes,
    scale,
    position,
    width,
    height,
    theme,
    { animate, motionStiffness, motionDamping }
) => {
    if (!axes[position]) return null

    const axis = axes[position]

    return (
        <Axis
            key={position}
            width={width}
            height={height}
            position={position}
            scale={scale}
            format={axis.format}
            tickSize={axis.tickSize}
            tickPadding={axis.tickPadding}
            theme={theme}
            animate={animate}
            motionStiffness={motionStiffness}
            motionDamping={motionDamping}
        />
    )
}

export default class Bar extends Component {
    static propTypes = {
        // data
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                data: PropTypes.arrayOf(
                    PropTypes.shape({
                        x: PropTypes.oneOfType([
                            PropTypes.number,
                            PropTypes.string,
                        ]).isRequired,
                        y: PropTypes.oneOfType([
                            PropTypes.number,
                            PropTypes.string,
                        ]).isRequired,
                    })
                ).isRequired,
            })
        ).isRequired,

        groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,

        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: marginPropType,
        xPadding: PropTypes.number.isRequired,

        // axes
        axes: PropTypes.shape({
            top: axisPropType,
            right: axisPropType,
            bottom: axisPropType,
            left: axisPropType,
        }),
        enableGridX: PropTypes.bool.isRequired,
        enableGridY: PropTypes.bool.isRequired,

        // labels
        enableLabels: PropTypes.bool.isRequired,

        // interactions
        onClick: PropTypes.func,

        theme: PropTypes.object.isRequired,
        colors: PropTypes.any.isRequired,

        // motion
        animate: PropTypes.bool.isRequired,
        motionStiffness: PropTypes.number.isRequired,
        motionDamping: PropTypes.number.isRequired,
    }

    static defaultProps = {
        margin: Nivo.defaults.margin,
        groupMode: 'stacked',
        colors: Nivo.defaults.colorRange,
        xPadding: 0.1,
        enableLabels: true,
        axes: {
            left: {},
            bottom: {},
        },
        enableGridX: false,
        enableGridY: true,
        theme: {},
        animate: true,
        motionStiffness: Nivo.defaults.motionStiffness,
        motionDamping: Nivo.defaults.motionDamping,
    }

    render() {
        const {
            data,
            groupMode,
            margin: _margin,
            width: _width,
            height: _height,
            colors,
            xPadding,
            axes,
            enableGridX,
            enableGridY,
            enableLabels,
            theme: _theme,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom

        const theme = _.merge({}, defaultTheme, _theme)
        const color = getColorRange(colors)

        // determining x scale
        const xLengths = _.uniq(data.map(({ data }) => data.length))
        if (xLengths.length > 1) {
            throw new Error(
                [
                    `Found inconsitent data for x,`,
                    `expecting all series to have same length`,
                    `but found: ${xLengths.join(', ')}`,
                ].join(' ')
            )
        }
        const xScale = scaleBand()
            .rangeRound([0, width])
            .domain(data[0].data.map(({ x }) => x))
            .padding(xPadding)

        // determining y scale, depending on `groupMode`
        let maxY
        if (groupMode === 'stacked') {
            maxY = _.max(
                _.range(xLengths).map(i =>
                    _.sumBy(data, serie => serie.data[i].y)
                )
            )
        } else if (groupMode === 'grouped') {
            maxY = _.maxBy(
                data.reduce((acc, serie) => [...acc, ...serie.data], []),
                'y'
            ).y
        } else {
            throw new TypeError(
                [
                    `'${groupMode}' is not a valid group mode,`,
                    `must be one of: 'grouped', 'stacked'`,
                ].join(' ')
            )
        }
        const yScale = scaleLinear().rangeRound([height, 0]).domain([0, maxY])

        const rects = []
        if (groupMode === 'grouped') {
            data.forEach(({ id, data: serie }, serieIndex) => {
                serie.forEach(d => {
                    const barWidth = xScale.bandwidth() / data.length
                    const x = xScale(d.x) + barWidth * serieIndex
                    const y = yScale(d.y)
                    const barHeight = height - y

                    const value = d.y

                    if (barWidth > 0 && barHeight > 0) {
                        rects.push({
                            key: `${id}.${d.x}`,
                            value,
                            x,
                            y,
                            width: barWidth,
                            height: barHeight,
                            color: color(id),
                        })
                    }
                })
            })
        } else if (groupMode === 'stacked') {
            const stackedData = data.map(({ id }) => ({
                id,
                data: [],
            }))
            _.range(xLengths).forEach(index => {
                data.forEach(({ data: serie }, serieIndex) => {
                    const d = serie[index]

                    let y0 = 0
                    let y1 = d.y
                    if (serieIndex > 0) {
                        y0 = stackedData[serieIndex - 1].data[index].y1
                        y1 = d.y + y0
                    }

                    stackedData[serieIndex].data[index] = Object.assign({}, d, {
                        y0,
                        y1,
                    })
                })
            })

            console.log(stackedData)

            stackedData.forEach(({ id, data: serie }) => {
                serie.forEach(d => {
                    const x = xScale(d.x)
                    const barWidth = xScale.bandwidth()
                    const y = yScale(d.y1)
                    const barHeight = yScale(d.y0) - y

                    const value = d.y

                    if (barWidth > 0 && barHeight > 0) {
                        rects.push({
                            key: `${id}.${d.x}`,
                            value,
                            x,
                            y,
                            width: barWidth,
                            height: barHeight,
                            color: color(id),
                        })
                    }
                })
            })
        }

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        return (
            <SvgWrapper width={_width} height={_height} margin={margin}>
                <Grid
                    theme={theme}
                    width={width}
                    height={height}
                    xScale={enableGridX ? xScale : null}
                    yScale={enableGridY ? yScale : null}
                />
                {['left', 'right'].map(position =>
                    getAxis(axes, yScale, position, width, height, theme, motionProps)
                )}
                {['top', 'bottom'].map(position =>
                    getAxis(axes, xScale, position, width, height, theme, motionProps)
                )}
                {rects.map(d => <BarItem key={d.key} {...d} />)}
                {enableLabels &&
                    rects.map(d => <BarItemLabel {...d} key={d.key} />)}
            </SvgWrapper>
        )
    }
}
