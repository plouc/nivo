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
import propsMapper from './propsMapper'

const generateData = () => [
    {
        id: 'men',
        label: 'men',
        value: Math.random() * 33,
    },
    {
        id: 'women',
        label: 'women',
        value: Math.random() * 33,
    },
    {
        id: 'children',
        label: 'children',
        value: Math.random() * 33,
    },
]

export default class WaffleCanvas extends Component {
    state = {
        data: generateData(),
        settings: {
            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

            // data
            total: 100,

            // layout
            rows: 84,
            columns: 68,
            padding: 1,

            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
            },

            // styling
            emptyColor: '#cccccc',
            emptyOpacity: 1,
            colors: 'nivo',
            colorBy: 'id',
            borderWidth: 0,
            borderColor: {
                type: 'inherit:darker',
                gamma: 0.3,
            },

            isInteractive: true,
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

        const code = generateCode('ResponsiveWaffleCanvas', mappedSettings, {
            pkg: '@nivo/waffle',
            defaults: WaffleDefaultProps,
        })

        const header = <ChartHeader chartClass="WaffleCanvas" tags={['canvas']} />

        const description = (
            <div className="chart-description">
                <p className="description">A waffle component using canvas rendering.</p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveWaffleHtml</code>, it also offers other implementations, see{' '}
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
                            theme={nivoTheme}
                            onClick={this.handleNodeClick}
                        />
                    </ChartTabs>
                    <WaffleControls
                        scope="Waffle"
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
