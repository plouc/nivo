/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import merge from 'lodash/merge'
import { ResponsiveParallelCoordinatesCanvas, commonDefaultProps } from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/parallel-coordinates/meta.yml'
import mapper from '../../data/components/parallel-coordinates/mapper'
import { groupsByScope } from '../../data/components/parallel-coordinates/props'
import variables from '../../data/components/parallel-coordinates/variables'

const lineCount = 320

const initialProperties = {
    variables,
    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },
    layout: commonDefaultProps.layout,
    curve: commonDefaultProps.curve,
    colors: commonDefaultProps.colors,
    colorBy: commonDefaultProps.colorBy,
    strokeWidth: 1,
    lineOpacity: 0.2,
    axesPlan: commonDefaultProps.axesPlan,
    axesTicksPosition: commonDefaultProps.axesTicksPosition,
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
}

const generateData = () => generateParallelCoordinatesData({ size: lineCount })

const ParallelCoordinatesCanvas = () => {
    return (
        <ComponentTemplate
            name="ParallelCoordinatesCanvas"
            meta={meta.ParallelCoordinatesCanvas}
            icon="parallel-coordinates"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groupsByScope.ParallelCoordinatesCanvas}
            initialProperties={initialProperties}
            defaultProperties={commonDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={() => lineCount}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveParallelCoordinatesCanvas
                        data={data}
                        {...properties}
                        theme={merge({}, theme, {
                            axis: {
                                ticks: {
                                    line: {
                                        strokeWidth: 2,
                                        strokeLinecap: 'square',
                                    },
                                },
                                domain: {
                                    line: {
                                        strokeWidth: 2,
                                        strokeLinecap: 'square',
                                    },
                                },
                            },
                        })}
                    />
                )
            }}
        </ComponentTemplate>
    )
}
/*
const ParallelCoordinatesCanvas = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateParallelCoordinatesData({ size: lineCount }))
    const diceRoll = useCallback(
        () => setData(generateParallelCoordinatesData({ size: lineCount })),
        [setData]
    )

    const mappedSettings = mapper(settings)

    const code = generateCode('ResponsiveParallelCoordinatesCanvas', mappedSettings, {
        pkg: '@nivo/parallel-coordinates',
        defaults: defaultProps,
    })

    return (
        <ComponentPage>
            <SEO title="ParallelCoordinatesCanvas" keywords={meta.ParallelCoordinatesCanvas.tags} />
            <ComponentHeader
                chartClass="ParallelCoordinatesCanvas"
                tags={meta.ParallelCoordinatesCanvas.tags}
            />
            <ComponentFlavorSelector flavors={meta.flavors} current="canvas" />
            <ComponentDescription description={meta.ParallelCoordinatesCanvas.description} />
            <ComponentTabs
                chartClass="parallel-coordinates"
                code={code}
                data={data}
                diceRoll={diceRoll}
                nodeCount={lineCount}
                nodeCountWording="lines"
            >
                <ResponsiveParallelCoordinatesCanvas
                    data={data}
                    {...mappedSettings}
                    theme={merge({}, theme.nivo, {
                        axis: {
                            ticks: {
                                line: {
                                    strokeWidth: 2,
                                    strokeLinecap: 'square',
                                },
                            },
                            domain: {
                                line: {
                                    strokeWidth: 2,
                                    strokeLinecap: 'square',
                                },
                            },
                        },
                    })}
                />
            </ComponentTabs>
            <ComponentSettings
                component="ParallelCoordinatesCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.ParallelCoordinatesCanvas}
            />
        </ComponentPage>
    )
}
*/

export default ParallelCoordinatesCanvas
