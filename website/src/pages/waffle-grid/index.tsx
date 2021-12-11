import React from 'react'
import { randomDemographicMatrix } from '@nivo/generators'
import { ResponsiveWaffleGrid, WaffleGridSvgProps, svgDefaultProps } from '@nivo/waffle-grid'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle-grid/meta.yml'
import mapper from '../../data/components/radial-bar/mapper'
import { groups } from '../../data/components/waffle-grid/props'

type MappedWaffleGridProps = Omit<
    WaffleGridSvgProps,
    'data' | 'xRange' | 'yRange' | 'width' | 'height'
>
type UnmappedWaffleGridProps = MappedWaffleGridProps

const initialProperties: UnmappedWaffleGridProps = {
    cellValue: 1000,
    maxValue: svgDefaultProps.maxValue,
    enableBlankCells: svgDefaultProps.enableBlankCells,
    spacing: 16,

    blankCellColor: svgDefaultProps.blankCellColor,
    valueCellColor: svgDefaultProps.valueCellColor,

    enableGridX: svgDefaultProps.enableGridX,
    enableGridY: svgDefaultProps.enableGridY,

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
}

const WaffleGrid = () => (
    <ComponentTemplate<
        UnmappedWaffleGridProps,
        MappedWaffleGridProps,
        ReturnType<typeof randomDemographicMatrix>
    >
        name="WaffleGrid"
        meta={meta.WaffleGrid}
        icon="waffle-grid"
        flavors={meta.flavors}
        currentFlavor="svg"
        properties={groups}
        initialProperties={initialProperties}
        defaultProperties={svgDefaultProps}
        propertiesMapper={mapper}
        codePropertiesMapper={(
            properties: MappedWaffleGridProps,
            data: ReturnType<typeof randomDemographicMatrix>
        ) => ({
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
