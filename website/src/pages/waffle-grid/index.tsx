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
    cellValue: 1000,
    enableBlankCells: svgDefaultProps.enableBlankCells,
    spacing: svgDefaultProps.spacing,
    // valueFormat: { format: '>-.2f', enabled: true },

    margin: {
        top: 20,
        right: 20,
        bottom: 100,
        left: 100,
    },

    animate: svgDefaultProps.animate,
    motionConfig: 'gentle',
    blankCellsMotionConfig: 'stiff',
    blankCellsStaggeredDelay: svgDefaultProps.blankCellsStaggeredDelay,
    valueCellsMotionConfig: 'gentle',
    valueCellsStaggeredDelay: svgDefaultProps.valueCellsStaggeredDelay,

    isInteractive: svgDefaultProps.isInteractive,

    /*
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
    */
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
        codePropertiesMapper={(properties, data) => ({
            xRange: data.xRange.keys,
            yRange: data.yRange.keys,
            ...properties,
        })}
        generateData={randomDemographicMatrix}
        getTabData={data => data.data}
    >
        {(properties, data, theme, logAction) => (
            <ResponsiveWaffleGrid
                {...properties}
                data={data.data}
                xRange={data.xRange.keys}
                yRange={data.yRange.keys}
                theme={theme}
            />
        )}
    </ComponentTemplate>
)

export default WaffleGrid
