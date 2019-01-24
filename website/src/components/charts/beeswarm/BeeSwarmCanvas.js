/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ResponsiveBeeSwarmCanvas, BeeSwarmCanvasDefaultProps } from '@nivo/beeswarm'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import BeeSwarmControls from './BeeSwarmControls'
import generateCode from '../../../lib/generateChartCode'
import Stories from '../../Stories'
import { beeSwarmCanvasStories } from './stories'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import { generateHeavyDataSet } from './generators'
import propsMapper from './propsMapper'

export default class BeeSwarmCanvas extends Component {
    state = {
        data: generateHeavyDataSet(),
        settings: {
            layout: 'horizontal',
            gap: 0,
            nodeSize: 3,
            nodePadding: 4,
            margin: {
                top: 40,
                right: 20,
                bottom: 40,
                left: 20,
            },
            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 100,
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
            isInteractive: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ data: generateHeavyDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveBeeSwarmCanvas',
            {
                keys,
                ...mappedSettings,
            },
            {
                pkg: '@nivo/beeswarm',
                defaults: BeeSwarmCanvasDefaultProps,
            }
        )

        const header = <ChartHeader chartClass="BeeSwarmCanvas" tags={['canvas']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/beeswarm">BeeSwarm</Link> component. Well
                    suited for large data sets as it does not impact DOM tree, however you&apos;ll
                    lose the isomorphic ability and transitions.
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveBeeSwarmCanvas</code>.
                </p>
                <p className="description">
                    See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                    legends for this component.
                </p>
            </div>
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                        {description}
                    </MediaQuery>
                    <ChartTabs
                        chartClass="beeswarm"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveBeeSwarmCanvas
                            data={data}
                            keys={keys}
                            {...mappedSettings}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <BeeSwarmControls
                        scope="BeeSwarmCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation
                        chartClass="BeeSwarmCanvas"
                        properties={properties}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                        {description}
                        <Stories stories={beeSwarmCanvasStories} />
                    </MediaQuery>
                </div>
            </div>
        )
    }
}
