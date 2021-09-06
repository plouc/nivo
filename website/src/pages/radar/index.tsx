import React from 'react'
import { generateWinesTastes } from '@nivo/generators'
import { ResponsiveRadar, RadarSvgProps, svgDefaultProps } from '@nivo/radar'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/radar/meta.yml'
import mapper from '../../data/components/radar/mapper'
import { groups } from '../../data/components/radar/props'

type MappedRadarProps = Omit<RadarSvgProps<any>, 'data' | 'keys' | 'width' | 'height'>
type UnmappedRadarProps = Omit<MappedRadarProps, 'valueFormat'> & {
    valueFormat: {
        format: string
        enabled: boolean
    }
}

const initialProperties: UnmappedRadarProps = {
    indexBy: 'taste',
    maxValue: 'auto',
    valueFormat: { format: '>-.2f', enabled: true },

    margin: {
        top: 70,
        right: 80,
        bottom: 40,
        left: 80,
    },

    curve: 'linearClosed',

    borderWidth: 2,
    borderColor: { from: 'color' },

    gridLevels: 5,
    gridShape: 'circular',
    gridLabelOffset: 36,

    enableDots: svgDefaultProps.enableDots,
    dotSize: 10,
    dotColor: { theme: 'background' },
    dotBorderWidth: 2,
    dotBorderColor: svgDefaultProps.dotBorderColor,
    enableDotLabel: svgDefaultProps.enableDotLabel,
    dotLabel: svgDefaultProps.dotLabel,
    dotLabelYOffset: svgDefaultProps.dotLabelYOffset,

    colors: { scheme: 'nivo' },
    fillOpacity: 0.25,
    blendMode: 'multiply',

    animate: true,
    motionConfig: 'wobbly',

    isInteractive: true,

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

const Radar = () => (
    <ComponentTemplate<UnmappedRadarProps, MappedRadarProps, any>
        name="Radar"
        meta={meta.Radar}
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
        generateData={generateWinesTastes}
        getTabData={data => data.data}
    >
        {(properties, data, theme) => {
            return (
                <ResponsiveRadar data={data.data} keys={data.keys} {...properties} theme={theme} />
            )
        }}
    </ComponentTemplate>
)

export default Radar
