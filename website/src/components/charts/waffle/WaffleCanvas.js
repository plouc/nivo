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
import { ResponsiveWaffleCanvas, WaffleDefaultProps } from '@nivo/waffle'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import WaffleControls from './WaffleControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import config from '../../../config'
import propsMapper from './propsMapper'

const generateData = () => [
    {
        id: 'car',
        label: 'car',
        value: Math.random() * 20,
        color: '#eaafaf',
    },
    {
        id: 'walk',
        label: 'walk',
        value: Math.random() * 20,
        color: '#a2738c',
    },
    {
        id: 'scooter',
        label: 'scooter',
        value: Math.random() * 20,
        color: '#645c84',
    },
    {
        id: 'bicycle',
        label: 'bicycle',
        value: Math.random() * 20,
        color: '#427996',
    },
    {
        id: 'e-bicycle',
        label: 'e-bicycle',
        value: Math.random() * 20,
        color: '#42291c',
    },
    {
        id: 'moto',
        label: 'moto',
        value: Math.random() * 20,
        color: '#3f5468',
    },
    {
        id: 'other',
        label: 'other',
        value: Math.random() * 20,
        color: '#b8e4c9',
    },
]

export default class WaffleCanvas extends Component {
    state = {
        data: generateData(),
        settings: {
            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

            // data
            total: 140,

            // layout
            rows: 40,
            columns: 40,
            fillDirection: 'bottom',
            padding: 0.5,

            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 120,
            },

            // styling
            theme: nivoTheme,
            emptyColor: '#cccccc',
            emptyOpacity: 1,
            colors: 'category10',
            colorBy: 'id',
            borderWidth: 0,
            borderColor: {
                type: 'inherit:darker',
                gamma: 0.3,
            },

            isInteractive: true,
            'custom tooltip example': false,
            tooltip: null,

            legends: [
                {
                    anchor: 'top-left',
                    direction: 'column',
                    justify: false,
                    translateX: -100,
                    translateY: 0,
                    itemsSpacing: 4,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    itemTextColor: '#777',
                    symbolSize: 20,
                    onClick: data => {
                        alert(JSON.stringify(data, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                                itemBackground: '#f7fafb',
                            },
                        },
                    ],
                },
            ],
        },
    }

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        if (node.data) {
            alert(
                `cell: ${node.position}\n${node.data.label}: ${node.data.value}\nclicked at x: ${
                    event.clientX
                }, y: ${event.clientY}`
            )
        } else {
            alert(
                `empty cell: ${node.position}\nclicked at x: ${event.clientX}, y: ${event.clientY}`
            )
        }
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveWaffleCanvas',
            {
                ...mappedSettings,
                tooltip: mappedSettings.tooltip ? 'CustomTooltip(props) => (…)' : undefined,
            },
            {
                pkg: '@nivo/waffle',
                defaults: WaffleDefaultProps,
            }
        )

        const header = <ChartHeader chartClass="WaffleCanvas" tags={['canvas']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/waffle">Waffle</Link> component. Well suited
                    for large data sets as it does not impact DOM tree depth and does not involve
                    React diffing stuff for children (not that useful when using canvas), however
                    you'll lose the isomorphic ability and transitions (for now).
                </p>
                <p className="description">
                    You can also see more example usages in{' '}
                    <a
                        href={`${
                            config.storybookUrl
                        }?selectedKind=WaffleCanvas&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveWaffleCanvas</code>, it also offers other implementations, see{' '}
                    <Link to="/waffle">Waffle</Link> and <Link to="/waffle/html">WaffleHtml</Link>.
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
                        chartClass="waffle"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                        nodeCount={settings.rows * settings.columns}
                    >
                        <ResponsiveWaffleCanvas
                            data={data}
                            {...mappedSettings}
                            onClick={this.handleNodeClick}
                        />
                    </ChartTabs>
                    <WaffleControls
                        scope="WaffleCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation
                        chartClass="WaffleCanvas"
                        properties={properties}
                    />
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
