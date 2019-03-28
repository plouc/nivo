/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveScatterPlotCanvas, ScatterPlotDefaultProps } from '@nivo/scatterplot'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/scatterplot/meta.yml'
import mapper from '../../data/components/scatterplot/mapper'
import { groupsByScope } from '../../data/components/scatterplot/props'
import { generateHeavyDataSet } from '../../data/components/scatterplot/generator'

const initialProperties = {
    margin: {
        top: 60,
        right: 140,
        bottom: 70,
        left: 90,
    },

    xScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    colors: 'nivo',
    colorBy: 'serie.id',

    symbolSize: 4,
    symbolShape: 'circle',

    axisTop: {
        enable: false,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'weight',
        legendPosition: 'middle',
        legendOffset: 36,
        format: d => `${d} kg`,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'size',
        legendPosition: 'middle',
        legendOffset: -40,
        format: d => `${d} cm`,
    },

    enableGridX: true,
    enableGridY: true,

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    useMesh: true,
    debugMesh: false,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 130,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            symbolSize: 12,
            symbolShape: 'circle',
        },
    ],
}

const ScatterPlotCanvas = () => {
    return (
        <ComponentTemplate
            name="ScatterPlotCanvas"
            meta={meta.ScatterPlotCanvas}
            icon="scatterplot"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groupsByScope.ScatterPlotCanvas}
            initialProperties={initialProperties}
            defaultProperties={ScatterPlotDefaultProps}
            propertiesMapper={mapper}
            generateData={generateHeavyDataSet}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveScatterPlotCanvas
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[point] serie: ${node.serie.id}, x: ${node.x}, y: ${
                                    node.y
                                }`,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

/*
const ScatterPlotCanvas = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateHeavyDataSet())
    const diceRoll = useCallback(() => setData(generateHeavyDataSet()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[point] serie: ${node.serie.id}, x: ${node.x}, y: ${node.y}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = mapper(settings)

    const code = generateCode(
        'ResponsiveScatterPlotCanvas',
        {
            ...mappedSettings,
        },
        { pkg: '@nivo/scatterplot', defaults: ScatterPlotDefaultProps }
    )

    return (
        <ComponentPage>
            <SEO title="ScatterPlotCanvas" keywords={meta.ScatterPlotCanvas.tags} />
            <ComponentHeader chartClass="ScatterPlotCanvas" tags={meta.ScatterPlotCanvas.tags} />
            <ComponentFlavorSelector flavors={meta.flavors} current="canvas" />
            <ComponentDescription description={meta.ScatterPlotCanvas.description} />
            <ComponentTabs
                chartClass="scatterplot"
                code={code}
                data={data}
                diceRoll={diceRoll}
                nodeCount={data.length * data[0].data.length}
            >
                <ResponsiveScatterPlotCanvas
                    data={data}
                    {...mappedSettings}
                    theme={theme.nivo}
                    onClick={onClick}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} />
            <ComponentSettings
                component="ScatterPlotCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.ScatterPlotCanvas}
            />
            <Stories stories={meta.ScatterPlotCanvas.stories} />
        </ComponentPage>
    )
}
*/

export default ScatterPlotCanvas
