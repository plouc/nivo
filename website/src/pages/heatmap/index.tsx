import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveHeatMap, svgDefaultProps as defaults } from '@bitbloom/nivo-heatmap'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { getLightData } from '../../data/components/heatmap/generator'
import { groups } from '../../data/components/heatmap/props'
import {
    Datum,
    ExtraProps,
    Data,
    SvgUnmappedProps,
    SvgMappedProps,
    SvgComponentProps,
} from '../../data/components/heatmap/types'

const initialProperties: SvgUnmappedProps = {
    margin: {
        top: 60,
        right: 90,
        bottom: 60,
        left: 90,
    },
    valueFormat: { format: '>-.2s', enabled: true },
    forceSquare: defaults.forceSquare,
    sizeVariation: defaults.sizeVariation,
    xOuterPadding: defaults.xOuterPadding,
    xInnerPadding: defaults.xInnerPadding,
    yOuterPadding: defaults.yOuterPadding,
    yInnerPadding: defaults.yInnerPadding,
    enableGridX: defaults.enableGridX,
    enableGridY: defaults.enableGridY,
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
        legendOffset: 70,
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
        enable: true,
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
    cellComponent: defaults.cellComponent,
    borderRadius: defaults.borderRadius,
    opacity: defaults.opacity,
    activeOpacity: defaults.activeOpacity,
    inactiveOpacity: defaults.inactiveOpacity,
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
    isInteractive: defaults.isInteractive,
    hoverTarget: defaults.hoverTarget,
    animate: defaults.animate,
    motionConfig: defaults.motionConfig,
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
        <ComponentTemplate<SvgUnmappedProps, SvgMappedProps, Data, SvgComponentProps>
            name="HeatMap"
            meta={meta.HeatMap}
            icon="heatmap"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults as SvgComponentProps}
            propertiesMapper={mapper}
            generateData={getLightData}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveHeatMap<Datum, ExtraProps>
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
