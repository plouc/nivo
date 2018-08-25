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
import { ResponsiveWaffle, WaffleDefaultProps } from '@nivo/waffle'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import WaffleControls from './WaffleControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import config from '../../../config'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'

const generateData = () => [
    {
        id: 'men',
        label: 'men',
        value: Math.random() * 33,
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: Math.random() * 33,
        color: '#ba72ff',
    },
    {
        id: 'children',
        label: 'children',
        value: Math.random() * 33,
        color: '#a1cfff',
    },
]

export default class Waffle extends Component {
    state = {
        data: generateData(),
        settings: {
            // data
            total: 100,

            // layout
            rows: 18,
            columns: 14,
            fillDirection: 'bottom',
            padding: 1,

            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 120,
            },

            // styling
            cellComponent: 'default',
            emptyColor: '#cccccc',
            emptyOpacity: 1,
            colors: 'nivo',
            colorBy: 'id',
            borderWidth: 0,
            borderColor: {
                type: 'inherit:darker',
                gamma: 0.3,
            },

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 11,

            // interactivity
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

            theme: nivoTheme,
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

        const mappedSettings = propsMapper(settings, { component: 'Waffle' })

        const code = generateCode(
            'ResponsiveWaffle',
            {
                ...mappedSettings,
                cellComponent: mappedSettings.cellComponent
                    ? 'CustomCell(props) => (…)'
                    : undefined,
                tooltip: mappedSettings.tooltip ? 'CustomTooltip(props) => (…)' : undefined,
            },
            {
                pkg: '@nivo/waffle',
                defaults: WaffleDefaultProps,
            }
        )

        const header = <ChartHeader chartClass="Waffle" tags={['svg', 'isomorphic']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    A waffle component. You can fully customize it using <code>cellComponent</code>{' '}
                    property to define your own cell component, if you wish to do so you should have
                    a look at{' '}
                    <a
                        href="https://github.com/plouc/nivo/blob/master/packages/nivo-waffle/src/WaffleCell.js"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        native SVG component
                    </a>{' '}
                    for available properties.
                </p>
                <p className="description">
                    You can also see more example usages in{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=Waffle&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
                </p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveWaffle</code>,
                    it also offers other implementations, see{' '}
                    <Link to="/waffle/html">WaffleHtml</Link> and{' '}
                    <Link to="/waffle/canvas">WaffleCanvas</Link>.
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
                        <ResponsiveWaffle
                            data={data}
                            {...mappedSettings}
                            onClick={this.handleNodeClick}
                        />
                    </ChartTabs>
                    <WaffleControls
                        scope="Waffle"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Waffle" properties={properties} />
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
