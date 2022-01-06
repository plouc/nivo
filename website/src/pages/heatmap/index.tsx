import React from 'react'
import {
    ResponsiveHeatMap,
    svgDefaultProps as defaults,
} from '../../../../packages/heatmap/dist/nivo-heatmap.cjs'
import { patternLinesDef } from '@nivo/core'
import isFunction from 'lodash/isFunction'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groups } from '../../data/components/heatmap/props'
import { graphql, useStaticQuery } from 'gatsby'

interface XYRangeStaticValues {
    values: string[] | number[]
}

interface XYRandomNumericValues {
    length: number
    min: number
    max: number
    round?: boolean
}

type XYRangeValues = XYRangeStaticValues | XYRandomNumericValues

const generateXYSeries = ({
    serieIds,
    x,
    y,
}: {
    serieIds: string[]
    x: XYRangeValues
    y: XYRangeValues
}) => {
    const xLength = 'length' in x ? x.length : x.values.length

    let getX: (index: number) => string | number
    if ('values' in x) {
        getX = (index: number) => x.values[index]
    } else {
        getX = () => {
            let xValue = x.min + Math.random() * (x.max - x.min)
            if (x.round) {
                xValue = Math.round(xValue)
            }

            return xValue
        }
    }

    let getY: (index: number) => string | number
    if ('values' in y) {
        getY = (index: number) => y.values[index]
    } else {
        getY = () => {
            let yValue = y.min + Math.random() * (y.max - y.min)
            if (y.round) {
                yValue = Math.round(yValue)
            }

            return yValue
        }
    }

    return serieIds.map(serieId => {
        return {
            id: serieId,
            data: Array.from({ length: xLength }).map((_, index) => {
                return {
                    x: getX(index),
                    y: getY(index),
                }
            }),
        }
    })
}

const getData = () => {
    return generateXYSeries({
        serieIds: ['Japan', 'France', 'US', 'Germany', 'Norway', 'Iceland', 'UK', 'Vietnam'],
        x: {
            values: ['Plane', 'Train', 'Subway', 'Bus', 'Car', 'Moto', 'Bicycle', 'Others'],
        },
        y: {
            length: NaN,
            min: -100_000,
            max: 100_000,
            round: true,
        },
    })
}

const initialProperties = {
    margin: {
        top: 60,
        right: 90,
        bottom: 60,
        left: 90,
    },

    minValue: defaults.minValue,
    maxValue: defaults.maxValue,
    valueFormat: { format: '>-.2s', enabled: true },

    forceSquare: defaults.forceSquare,
    sizeVariation: 0,
    xOuterPadding: defaults.xOuterPadding,
    xInnerPadding: 0.05,
    yOuterPadding: defaults.yOuterPadding,
    yInnerPadding: 0.05,

    enableGridX: defaults.enableGridX,
    enableGridY: defaults.enableGridY,
    axisTop: {
        enable: true,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 46,
    },
    axisRight: {
        enable: true,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 70,
    },
    axisBottom: {
        enable: false,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: -72,
    },

    colors: {
        type: 'diverging',
        scheme: 'red_yellow_blue',
        divergeAt: 0.5,
        minValue: -100_000,
        maxValue: 100_000,
    },
    cellComponent: 'rect',
    cellOpacity: 1,
    activeCellOpacity: 1,
    inactiveCellOpacity: 1,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.6]],
    },

    enableLabels: true,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 2]],
    },

    defs: [
        patternLinesDef('lines', {
            background: 'inherit',
            color: 'rgba(0, 0, 0, 0.1)',
            rotation: -45,
            lineWidth: 4,
            spacing: 7,
        }),
    ],
    fill: [{ match: d => false && d.value < 30, id: 'lines' }],

    legends: [
        {
            anchor: 'bottom',
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: { format: '>-.2s', enabled: true },
            title: 'Value →',
            titleAlign: 'start',
            titleOffset: 4,
        },
    ],

    annotations: [],

    animate: defaults.animate,
    motionConfig: defaults.motionConfig,

    isInteractive: defaults.isInteractive,
    hoverTarget: 'cell',
}

const HeatMap = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/heatmap.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="HeatMap"
            meta={meta.HeatMap}
            icon="heatmap"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults}
            propertiesMapper={mapper}
            codePropertiesMapper={properties => ({
                ...properties,
                cellShape: isFunction(properties.cellShape)
                    ? 'Custom(props) => (…)'
                    : properties.cellShape,
            })}
            generateData={getData}
            // getTabData={data => data.data}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveHeatMap
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={cell => {
                            logAction({
                                type: 'click',
                                label: `${cell.serieId} ${cell.data.x}: ${cell.formattedValue}`,
                                color: cell.color,
                                data: cell,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default HeatMap
