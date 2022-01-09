import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveHeatMapCanvas, canvasDefaultProps as defaults } from '@nivo/heatmap'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groups } from '../../data/components/heatmap/props'
import { getHeavyData } from '../../data/components/heatmap/generator'
import {
    Datum,
    ExtraProps,
    Data,
    CanvasUnmappedProps,
    CanvasMappedProps,
    CanvasComponentProps,
} from '../../data/components/heatmap/types'

const initialProperties: CanvasUnmappedProps = {
    margin: {
        top: 70,
        right: 60,
        bottom: 20,
        left: 80,
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
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 46,
    },
    axisRight: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 40,
    },
    axisBottom: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: false,
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
    borderWidth: 1,
    borderColor: '#000000',

    enableLabels: false,
    labelTextColor: defaults.labelTextColor,

    legends: [
        {
            anchor: 'left',
            translateX: -50,
            translateY: 0,
            length: 200,
            thickness: 10,
            direction: 'column',
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
        <ComponentTemplate<CanvasUnmappedProps, CanvasMappedProps, Data, CanvasComponentProps>
            name="HeatMapCanvas"
            meta={meta.HeatMapCanvas}
            icon="heatmap"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults as CanvasComponentProps}
            propertiesMapper={mapper}
            generateData={getHeavyData}
            getDataSize={data => data.length * data[0].data.length}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveHeatMapCanvas<Datum, ExtraProps>
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
