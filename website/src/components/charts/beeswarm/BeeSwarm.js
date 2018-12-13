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
import { ResponsiveBeeSwarm, BeeSwarmDefaultProps } from '@nivo/beeswarm'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import BeeSwarmControls from './BeeSwarmControls'
import generateCode from '../../../lib/generateChartCode'
import Stories from '../../Stories'
import { beeSwarmStories } from './stories'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet } from './generators'
import propsMapper from './propsMapper'

export default class BeeSwarm extends Component {
    state = {
        data: generateLightDataSet(),
        settings: {
            layout: 'horizontal',
            gap: BeeSwarmDefaultProps.gap,
            colors: BeeSwarmDefaultProps.colors,
            colorBy: BeeSwarmDefaultProps.colorBy,
            nodeSize: 10,
            nodePadding: 8,
            borderWidth: 1,
            borderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },
            scale: {
                type: 'linear',
                min: 0,
                max: 500,
            },
            margin: {
                top: 60,
                right: 80,
                bottom: 60,
                left: 80,
            },
            axisTop: {
                enable: true,
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 36,
            },
            axisRight: {
                enable: false,
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 0,
            },
            axisBottom: {
                enable: true,
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 46,
            },
            axisLeft: {
                enable: true,
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -60,
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
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ data: generateLightDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveBeeSwarm',
            {
                keys,
                ...mappedSettings,
            },
            {
                pkg: '@nivo/beeswarm',
                defaults: BeeSwarmDefaultProps,
            }
        )

        const header = <ChartHeader chartClass="BeeSwarm" tags={['svg', 'isomorphic']} />

        const description = (
            <div className="chart-description">
                <p className="description">A BeeSwarm plot chart.</p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveBeeSwarm</code>,
                    it also offers another implementation, see{' '}
                    <Link to="/beeswarm/canvas">BeeSwarmCanvas</Link>.
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
                        <ResponsiveBeeSwarm
                            data={data}
                            keys={keys}
                            {...mappedSettings}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <BeeSwarmControls
                        scope="BeeSwarm"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="BeeSwarm" properties={properties} />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                        {description}
                        <Stories stories={beeSwarmStories} />
                    </MediaQuery>
                </div>
            </div>
        )
    }
}
