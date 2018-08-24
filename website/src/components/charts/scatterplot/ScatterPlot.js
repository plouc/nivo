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
import { ResponsiveScatterPlot, ScatterPlotDefaultProps } from '@nivo/scatterplot'
import config from '../../../config'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ScatterPlotControls from './ScatterPlotControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'
import { generateLightDataSet as generateData } from './generators'

export default class ScatterPlot extends Component {
    state = {
        data: generateData(),
        settings: {
            margin: {
                top: 60,
                right: 140,
                bottom: 70,
                left: 90,
            },

            colors: 'nivo',
            colorBy: 'id',

            // symbols
            symbolSize: 6,
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
                legendOffset: 46,
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
                legendOffset: -60,
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

            'custom tooltip example': false,
            tooltip: null,

            theme: nivoTheme,

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
        alert(
            `${node.serie} (${node.id}): x: ${node.x}, y: ${node.y}\nclicked at x: ${
                event.clientX
            }, y: ${event.clientY}`
        )
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveScatterPlot',
            {
                ...mappedSettings,
            },
            { pkg: '@nivo/scatterplot', defaults: ScatterPlotDefaultProps }
        )

        const header = <ChartHeader chartClass="ScatterPlot" tags={['basic', 'isomorphic']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    A scatter plot chart, which can display several data series.
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveScatterPlot</code>, it also offers another implementation, see{' '}
                    <Link to="/scatterplot/canvas">ScatterPlotCanvas</Link>.
                </p>
                <p className="description">
                    You can also see more example usages in{' '}
                    <a
                        href={`${
                            config.storybookUrl
                        }?selectedKind=ScatterPlot&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
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
                        chartClass="scatterplot"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveScatterPlot
                            data={data}
                            {...mappedSettings}
                            onClick={this.handleNodeClick}
                        />
                    </ChartTabs>
                    <ScatterPlotControls
                        scope="ScatterPlot"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="ScatterPlot" properties={properties} />
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
