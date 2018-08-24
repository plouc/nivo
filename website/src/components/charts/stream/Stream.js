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
import { ResponsiveStream, StreamDefaultProps } from '@nivo/stream'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import StreamControls from './StreamControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet } from './generators'
import defaultProps from './defaultProps'
import propsMapper from './propsMapper'

export default class Stream extends Component {
    state = {
        ...generateLightDataSet(),
        settings: {
            ...defaultProps,
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
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ ...generateLightDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveStream',
            {
                keys,
                ...mappedSettings,
            },
            {
                pkg: '@nivo/stream',
                defaults: StreamDefaultProps,
            }
        )

        const header = <ChartHeader chartClass="Stream" tags={['stacked', 'isomorphic']} />

        const description = (
            <div className="chart-description">
                <p className="description">Stream chart.</p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveStream</code>.
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
                    <ChartTabs chartClass="stream" code={code} data={data} diceRoll={this.diceRoll}>
                        <ResponsiveStream
                            data={data}
                            keys={keys}
                            {...mappedSettings}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <StreamControls
                        scope="Stream"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Stream" properties={properties} />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                        {description}
                    </MediaQuery>
                </div>
            </div>
        )
    }
}
