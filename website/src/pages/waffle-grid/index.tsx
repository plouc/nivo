import React from 'react'
import { randomDemographicMatrix } from '@nivo/generators'
import { ResponsiveWaffleGrid, WaffleGridSvgProps, svgDefaultProps } from '@nivo/waffle-grid'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle-grid/meta.yml'
import mapper from '../../data/components/radial-bar/mapper'
import { groups } from '../../data/components/waffle-grid/props'

type MappedRadarProps = Omit<WaffleGridSvgProps, 'data' | 'width' | 'height'>
type UnmappedRadarProps = MappedRadarProps

const initialProperties: UnmappedRadarProps = {
    valueFormat: { format: '>-.2f', enabled: true },

    startAngle: svgDefaultProps.startAngle,
    endAngle: svgDefaultProps.endAngle,
    innerRadius: svgDefaultProps.innerRadius,
    padding: 0.4,
    padAngle: svgDefaultProps.padAngle,
    cornerRadius: 2,

    margin: {
        top: 20,
        right: 20,
        bottom: 100,
        left: 100,
    },

    colors: svgDefaultProps.colors,
    borderWidth: svgDefaultProps.borderWidth,
    borderColor: svgDefaultProps.borderColor,

    enableTracks: svgDefaultProps.enableTracks,
    tracksColor: svgDefaultProps.tracksColor,

    enableRadialGrid: svgDefaultProps.enableRadialGrid,
    enableCircularGrid: svgDefaultProps.enableCircularGrid,
    radialAxisStart: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
    },
    radialAxisEnd: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
    },
    circularAxisInner: {
        enable: false,
        tickSize: 5,
        tickPadding: 12,
        tickRotation: 0,
    },
    circularAxisOuter: {
        enable: true,
        tickSize: 5,
        tickPadding: 12,
        tickRotation: 0,
    },

    enableLabels: svgDefaultProps.enableLabels,
    label: svgDefaultProps.label,
    labelsSkipAngle: svgDefaultProps.labelsSkipAngle,
    labelsRadiusOffset: svgDefaultProps.labelsRadiusOffset,
    labelsTextColor: svgDefaultProps.labelsTextColor,

    animate: true,
    motionConfig: 'gentle' as const,
    transitionMode: svgDefaultProps.transitionMode,

    isInteractive: svgDefaultProps.isInteractive,

    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 80,
            translateY: 0,
            itemsSpacing: 6,
            itemDirection: 'left-to-right',
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'square',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],
}

const WaffleGrid = () => (
    <ComponentTemplate<UnmappedRadarProps, MappedRadarProps, any>
        name="WaffleGrid"
        meta={meta.WaffleGrid}
        icon="waffle"
        flavors={meta.flavors}
        currentFlavor="svg"
        properties={groups}
        initialProperties={initialProperties}
        defaultProperties={svgDefaultProps}
        propertiesMapper={mapper}
        generateData={randomDemographicMatrix}
    >
        {(properties, data, theme, logAction) => (
            <ResponsiveWaffleGrid
                {...properties}
                data={data.data}
                xRange={data.xRange.keys}
                yRange={data.yRange.keys}
                cellValue={1000}
                theme={theme}
            />
        )}
    </ComponentTemplate>
)

export default WaffleGrid
