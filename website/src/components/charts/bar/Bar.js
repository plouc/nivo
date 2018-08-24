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
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { ResponsiveBar, BarDefaultProps } from '@nivo/bar'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import BarControls from './BarControls'
import config from '../../../config'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet as generateData } from './generators'
import propsMapper from './propsMapper'

const Tooltip = data => {
    /* return custom tooltip */
}

export default class Bar extends Component {
    state = {
        ...generateData(),
        settings: {
            // data
            indexBy: 'country',

            margin: {
                top: 50,
                right: 130,
                bottom: 50,
                left: 60,
            },

            padding: 0.3,
            innerPadding: 0,
            minValue: 'auto',
            maxValue: 'auto',

            groupMode: 'stacked',
            layout: 'vertical',
            reverse: false,

            colors: 'nivo',
            colorBy: 'id',
            defs: [
                patternDotsDef('dots', {
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                }),
                patternLinesDef('lines', {
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                }),
            ],
            fill: [
                { match: { id: 'fries' }, id: 'dots' },
                { match: { id: 'sandwich' }, id: 'lines' },
            ],
            borderRadius: 0,
            borderWidth: 0,
            borderColor: {
                type: 'inherit:darker',
                gamma: 1.6,
            },

            // axes
            'enable axisTop': false,
            axisTop: {
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
            },
            'enable axisRight': false,
            axisRight: {
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 0,
            },
            'enable axisBottom': true,
            axisBottom: {
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'center',
                legendOffset: 36,
            },
            'enable axisLeft': true,
            axisLeft: {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'center',
                legendOffset: -40,
            },

            enableGridX: false,
            enableGridY: true,

            enableLabel: true,
            labelSkipWidth: 12,
            labelSkipHeight: 12,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1.6,
            },

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            // interactivity
            isInteractive: true,
            'custom tooltip example': false,
            tooltip: null,

            legends: [
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 120,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemsSpacing: 2,
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    onClick: d => {
                        alert(JSON.stringify(d, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ],

            theme: nivoTheme,
        },
    }

    diceRoll = () => {
        this.setState(generateData())
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(`${node.id}: ${node.value}\nclicked at x: ${event.clientX}, y: ${event.clientY}`)
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveBar',
            {
                keys,
                ...mappedSettings,
                tooltip: mappedSettings.tooltip ? Tooltip : undefined,
            },
            { pkg: '@nivo/bar', defaults: BarDefaultProps }
        )

        const header = <ChartHeader chartClass="Bar" tags={['basic', 'isomorphic', 'api']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    Bar chart which can display multiple data series, stacked or side by side. Also
                    supports both vertical and horizontal layout, with negative values descending
                    below the x axis (or y axis if using horizontal layout).
                </p>
                <p className="description">
                    The bar item component can be customized to render any valid SVG element, it
                    will receive current bar style, data and event handlers, the storybook offers an{' '}
                    <a
                        href={`${
                            config.storybookUrl
                        }?selectedKind=Bar&selectedStory=custom%20bar%20item`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        example
                    </a>
                    .
                </p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveBar</code>.
                </p>
                <p className="description">
                    This component is available in the{' '}
                    <a
                        href="https://github.com/plouc/nivo-api"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        nivo-api
                    </a>
                    , see{' '}
                    <a
                        href={`${config.nivoApiUrl}/samples/bar.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sample
                    </a>{' '}
                    or <Link to="/bar/api">try it using the API client</Link>. You can also see more
                    example usages in{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=Bar&selectedStory=stacked`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
                </p>
                <p>
                    See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                    legends for this component.
                    <br />
                    However it requires an extra property for each legend configuration you pass to{' '}
                    <code>legends</code> property: <code>dataFrom</code>, it defines how to compute
                    legend's data and accept <code>indexes</code> or <code>keys</code>.<br />
                    <code>indexes</code> is suitable for simple bar chart with a single data serie
                    while <code>keys</code> may be used if you have several ones (groups).
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
                    <ChartTabs chartClass="bar" code={code} data={data} diceRoll={this.diceRoll}>
                        <ResponsiveBar
                            data={data}
                            keys={keys}
                            {...mappedSettings}
                            onClick={this.handleNodeClick}
                        />
                    </ChartTabs>
                    <BarControls
                        scope="Bar"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Bar" properties={properties} />
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
