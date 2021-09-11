import React from 'react'
import { ResponsiveRadialBar, RadialBarSvgProps, svgDefaultProps } from '@nivo/radial-bar'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/radial-bar/meta.yml'
import mapper from '../../data/components/radial-bar/mapper'
import { groups } from '../../data/components/radial-bar/props'

type MappedRadarProps = Omit<RadialBarSvgProps, 'data' | 'width' | 'height'>
type UnmappedRadarProps = Omit<
    MappedRadarProps,
    'valueFormat' | 'radialAxisStart' | 'radialAxisEnd' | 'circularAxisInner' | 'circularAxisOuter'
> & {
    valueFormat: {
        format: string
        enabled: boolean
    }
    radialAxisStart: { enable: boolean } & RadialBarSvgProps['radialAxisStart']
    radialAxisEnd: { enable: boolean } & RadialBarSvgProps['radialAxisEnd']
    circularAxisInner: { enable: boolean } & RadialBarSvgProps['circularAxisInner']
    circularAxisOuter: { enable: boolean } & RadialBarSvgProps['circularAxisOuter']
}

const initialProperties: UnmappedRadarProps = {
    valueFormat: { format: '>-.2f', enabled: true },

    startAngle: svgDefaultProps.startAngle,
    endAngle: svgDefaultProps.endAngle,
    innerRadius: svgDefaultProps.innerRadius,
    padding: 0.4,
    padAngle: svgDefaultProps.padAngle,
    cornerRadius: 2,

    margin: {
        top: 40,
        right: 120,
        bottom: 40,
        left: 40,
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

const generateData = () => {
    const ids = ['Supermarket', 'Combini', 'Online']
    if (Math.random() > 0.5) {
        ids.push('Marché')
    }

    const categories = ['Vegetables', 'Fruits', 'Meat']
    if (Math.random() < 0.5) {
        categories.push('Fish')
    }

    return ids.map(id => ({
        id,
        data: categories.map(category => ({
            x: category,
            y: Math.round(Math.random() * 300),
        })),
    }))
}

const RadialBar = () => (
    <ComponentTemplate<UnmappedRadarProps, MappedRadarProps, any>
        name="RadialBar"
        meta={meta.RadialBar}
        icon="radial-bar"
        flavors={meta.flavors}
        currentFlavor="svg"
        properties={groups}
        initialProperties={initialProperties}
        defaultProperties={svgDefaultProps}
        propertiesMapper={mapper}
        generateData={generateData}
    >
        {(properties, data, theme, logAction) => (
            <ResponsiveRadialBar
                data={data}
                {...properties}
                theme={theme}
                onClick={bar => {
                    logAction({
                        type: 'click',
                        label: `${bar.category} - ${bar.groupId}: ${bar.value}`,
                        color: bar.color,
                        data: bar,
                    })
                }}
            />
        )}
    </ComponentTemplate>
)

export default RadialBar
