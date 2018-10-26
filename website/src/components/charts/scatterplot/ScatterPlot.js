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
import nivoTheme from '../../../nivoTheme'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import Stories from '../../Stories'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import ScatterPlotControls from './ScatterPlotControls'
import properties from './props'
import propsMapper from './propsMapper'
import { generateLightDataSet as generateData } from './generators'
import { scatterPlotStories } from './stories'

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

            xScale: {
                type: 'linear',
                min: 0,
                max: 'auto',
            },
            yScale: {
                type: 'linear',
                min: 0,
                max: 'auto',
            },

            colors: 'nivo',
            colorBy: 'serie.id',

            symbolSize: 6,
            symbolShape: 'circle',

            axisTop: {
                enable: false,
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
            },
            axisRight: {
                enable: false,
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 0,
            },
            axisBottom: {
                enable: true,
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'weight',
                legendPosition: 'middle',
                legendOffset: 46,
                format: d => `${d} kg`,
            },
            axisLeft: {
                enable: true,
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'size',
                legendPosition: 'middle',
                legendOffset: -60,
                format: d => `${d} cm`,
            },

            enableGridX: true,
            enableGridY: true,

            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            isInteractive: true,
            useMesh: false,
            debugMesh: false,

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

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(
            `serie: ${node.serie.id}, x: ${node.x}, y: ${node.y}\nclicked at x: ${
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
                    <Link to="/scatterplot/canvas">ScatterPlotCanvas</Link>. You can also see more
                    example usages in{' '}
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
                    Alternatively, you can set <code>useMesh</code> to <code>true</code>
                    to have finer interactions.
                </p>
                <p className="description">
                    See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                    legends for this component.
                </p>
            </div>
        )

        const stories = <Stories stories={scatterPlotStories} />

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
                        {stories}
                    </MediaQuery>
                </div>
            </div>
        )
    }
}
