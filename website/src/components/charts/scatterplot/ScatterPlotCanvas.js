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
import { ResponsiveScatterPlotCanvas, ScatterPlotDefaultProps } from '@nivo/scatterplot'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ScatterPlotControls from './ScatterPlotControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import { generateHeavyDataSet as generateData } from './generators'

export default class ScatterPlotCanvas extends Component {
    state = {
        data: generateData(),
        settings: {
            margin: {
                top: 60,
                right: 140,
                bottom: 70,
                left: 90,
            },

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

            colors: 'nivo',
            colorBy: 'id',

            // symbols
            symbolSize: 4,
            symbolShape: 'circle',

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
                legend: 'weight',
                legendPosition: 'center',
                legendOffset: 36,
                format: d => `${d} kg`,
            },
            'enable axisLeft': true,
            axisLeft: {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'size',
                legendPosition: 'center',
                legendOffset: -40,
                format: d => `${d} cm`,
            },

            enableGridX: true,
            enableGridY: true,

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            // interactivity
            isInteractive: true,

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
        },
    }

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(`${node.id}: ${node.value}\nclicked at x: ${event.clientX}, y: ${event.clientY}`)
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveScatterPlotCanvas',
            {
                ...mappedSettings,
            },
            { pkg: '@nivo/scatterplot', defaults: ScatterPlotDefaultProps }
        )

        const header = (
            <ChartHeader
                chartClass="ScatterPlotCanvas"
                tags={['basic', 'canvas']}
                diceRoll={this.diceRoll}
            />
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/scatterplot">ScatterPlot</Link> component.
                    Well suited for large data sets as it does not impact DOM tree depth and does
                    not involve React diffing stuff for children (not that useful when using
                    canvas), however you'll lose the isomorphic ability and transitions.
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveScatterPlotCanvas</code>, it also offers another implementation,
                    see <Link to="/scatterplot">ScatterPlot</Link>.
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
                        chartClass="scatterplot"
                        code={code}
                        data={data}
                        nodeCount={data.length * data[0].data.length}
                    >
                        <ResponsiveScatterPlotCanvas
                            data={data}
                            {...mappedSettings}
                            theme={nivoTheme}
                            onClick={this.handleNodeClick}
                        />
                    </ChartTabs>
                    <ScatterPlotControls
                        scope="ScatterPlotCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation
                        chartClass="ScatterPlotCanvas"
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
