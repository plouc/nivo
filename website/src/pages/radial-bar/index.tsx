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

    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },

    colors: svgDefaultProps.colors,
    cornerRadius: 2,

    animate: true,
    motionConfig: 'gentle' as const,
    transitionMode: 'pushOut' as const,

    isInteractive: svgDefaultProps.isInteractive,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
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
    const ids = ['A', 'B', 'C']
    if (Math.random() > 0.5) {
        ids.push('D')
    }

    const categories = ['first', 'second', 'third']
    if (Math.random() < 0.5) {
        categories.push('fourth')
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
        codePropertiesMapper={(properties: any, data: any) => ({
            keys: data.keys,
            ...properties,
        })}
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
