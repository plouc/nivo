import React from 'react'
import { ResponsiveRadialBar, RadialBarSvgProps, svgDefaultProps } from '@nivo/radial-bar'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/radial-bar/meta.yml'
import mapper from '../../data/components/radar/mapper'
import { groups } from '../../data/components/radial-bar/props'

type MappedRadarProps = Omit<RadialBarSvgProps, 'data' | 'width' | 'height'>
type UnmappedRadarProps = Omit<RadialBarSvgProps, 'valueFormat'> & {
    valueFormat: {
        format: string
        enabled: boolean
    }
}

const initialProperties: UnmappedRadarProps = {
    valueFormat: { format: '>-.2f', enabled: true },

    startAngle: svgDefaultProps.startAngle,
    endAngle: svgDefaultProps.endAngle,
    padding: svgDefaultProps.padding,
    padAngle: svgDefaultProps.padAngle,
    cornerRadius: 2,

    margin: {
        top: 20,
        right: 120,
        bottom: 20,
        left: 20,
    },

    colors: svgDefaultProps.colors,
    borderWidth: svgDefaultProps.borderWidth,
    borderColor: svgDefaultProps.borderColor,

    enableTracks: svgDefaultProps.enableTracks,
    tracksColor: svgDefaultProps.tracksColor,

    enableRadialGrid: svgDefaultProps.enableRadialGrid,
    enableCircularGrid: svgDefaultProps.enableCircularGrid,

    radialAxisStart: svgDefaultProps.radialAxisStart,
    radialAxisEnd: svgDefaultProps.radialAxisEnd,

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
        icon="radar"
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
