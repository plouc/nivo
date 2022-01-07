import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import isFunction from 'lodash/isFunction'
import { ResponsiveHeatMapCanvas, canvasDefaultProps as defaults } from '@nivo/heatmap'
import { generateXYSeries, sets } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groups } from '../../data/components/heatmap/props'

const getData = () =>
    generateXYSeries({
        serieIds: sets.countryCodes.slice(0, 26),
        x: {
            values: sets.names,
        },
        y: {
            length: NaN,
            min: -100_000,
            max: 100_000,
            round: true,
        },
    })

const initialProperties = {
    margin: {
        top: 70,
        right: 90,
        bottom: 120,
        left: 60,
    },

    minValue: defaults.minValue,
    maxValue: defaults.maxValue,
    valueFormat: { format: '>-.2s', enabled: true },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    forceSquare: defaults.forceSquare,
    sizeVariation: 0,
    xOuterPadding: defaults.xOuterPadding,
    xInnerPadding: defaults.xInnerPadding,
    yOuterPadding: defaults.yOuterPadding,
    yInnerPadding: defaults.yInnerPadding,

    enableGridX: false,
    enableGridY: false,
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
        legendOffset: -42,
    },

    renderCell: 'rect',
    colors: {
        type: 'diverging',
        scheme: 'red_yellow_blue',
        divergeAt: 0.5,
        minValue: -100_000,
        maxValue: 100_000,
    },
    emptyColor: '#555555',
    opacity: defaults.opacity,
    activeOpacity: defaults.activeOpacity,
    inactiveOpacity: defaults.inactiveOpacity,
    borderWidth: defaults.borderWidth,
    borderColor: defaults.borderColor,

    enableLabels: false,
    labelTextColor: defaults.labelTextColor,

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

    animate: true,
    motionConfig: defaults.motionConfig,

    isInteractive: true,
    hoverTarget: 'rowColumn',
}

const HeatMapCanvas = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/heatmap-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="HeatMapCanvas"
            meta={meta.HeatMapCanvas}
            icon="heatmap"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
                cellShape: isFunction(properties.cellShape)
                    ? 'Custom(props) => (…)'
                    : properties.cellShape,
            })}
            generateData={getData}
            getDataSize={data => data.length * data[0].data.length}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveHeatMapCanvas
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={cell => {
                            logAction({
                                type: 'click',
                                label: `${cell.serieId} → ${cell.data.x}: ${cell.formattedValue}`,
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

export default HeatMapCanvas
