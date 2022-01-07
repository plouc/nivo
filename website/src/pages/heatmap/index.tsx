import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import isFunction from 'lodash/isFunction'
import { ResponsiveHeatMap, svgDefaultProps as defaults } from '@nivo/heatmap'
import { generateXYSeries } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groups } from '../../data/components/heatmap/props'

const getData = () =>
    generateXYSeries({
        serieIds: ['Japan', 'France', 'US', 'Germany', 'Norway', 'Iceland', 'UK', 'Vietnam'],
        x: {
            values: ['Train', 'Subway', 'Bus', 'Car', 'Boat', 'Moto', 'Moped', 'Bicycle', 'Others'],
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
    xInnerPadding: defaults.xInnerPadding,
    yOuterPadding: defaults.yOuterPadding,
    yInnerPadding: defaults.yInnerPadding,

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
    emptyColor: '#555555',
    cellComponent: 'rect',
    opacity: defaults.opacity,
    activeOpacity: defaults.activeOpacity,
    inactiveOpacity: defaults.inactiveOpacity,
    borderRadius: defaults.borderRadius,
    borderWidth: defaults.borderWidth,
    borderColor: defaults.borderColor,

    enableLabels: defaults.enableLabels,
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

    annotations: defaults.annotations,

    animate: defaults.animate,
    motionConfig: defaults.motionConfig,

    isInteractive: defaults.isInteractive,
    hoverTarget: defaults.hoverTarget,
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

export default HeatMap
