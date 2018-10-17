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
import { ResponsiveHeatMap, HeatMapDefaultProps } from '@nivo/heatmap'
import { patternLinesDef } from '@nivo/core'
import isFunction from 'lodash/isFunction'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import HeatMapControls from './HeatMapControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import config from '../../../config'
import { generateLightDataSet } from './generators'
import propsMapper from './propsMapper'

export default class HeatMap extends Component {
    state = {
        ...generateLightDataSet(),
        settings: {
            indexBy: 'country',

            margin: {
                top: 100,
                right: 60,
                bottom: 60,
                left: 60,
            },

            minValue: 'auto',
            maxValue: 'auto',
            forceSquare: true,
            sizeVariation: 0,
            padding: 0,
            colors: 'nivo',

            // axes
            axisTop: {
                enable: true,
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: '',
                legendOffset: 36,
            },
            axisRight: {
                enable: false,
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 0,
            },
            axisBottom: {
                enable: false,
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 36,
            },
            axisLeft: {
                enable: true,
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: -40,
            },

            enableGridX: false,
            enableGridY: false,

            // cells
            cellShape: 'rect',
            cellOpacity: 1,
            cellBorderWidth: 0,
            cellBorderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },

            // labels
            enableLabels: true,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1.8,
            },

            defs: [
                patternLinesDef('lines', {
                    background: 'inherit',
                    color: 'rgba(0, 0, 0, 0.1)',
                    rotation: -45,
                    lineWidth: 4,
                    spacing: 7,
                }),
            ],
            fill: [{ match: d => false && d.value < 30, id: 'lines' }],

            // motion
            animate: true,
            motionStiffness: 80,
            motionDamping: 9,

            // interactivity
            isInteractive: true,
            hoverTarget: 'cell',
            cellHoverOpacity: 1,
            cellHoverOthersOpacity: 0.25,
        },
    }

    diceRoll = () => {
        this.setState({ ...generateLightDataSet() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(
            `${node.yKey}.${node.xKey}: ${node.value}\nx: ${Math.round(node.x)}, y: ${Math.round(
                node.y
            )}, w: ${Math.round(node.width)}, h: ${Math.round(node.height)}\nclicked at x: ${
                event.clientX
            }, y: ${event.clientY}`
        )
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveHeatMap',
            Object.assign({ keys }, mappedSettings, {
                cellShape: isFunction(mappedSettings.cellShape)
                    ? 'Custom(props) => (…)'
                    : mappedSettings.cellShape,
            }),
            { pkg: '@nivo/heatmap', defaults: HeatMapDefaultProps }
        )

        const header = <ChartHeader chartClass="HeatMap" tags={['heatmap', 'svg']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    An heat map matrix, you can chose between various colors scales or pass yours,
                    you also have the ability to change the cell shape for rectangle or circle and
                    even use a custom rendering function.
                </p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveHeatMap</code>.
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
                        href={`${config.nivoApiUrl}/samples/heatmap.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sample
                    </a>{' '}
                    or <Link to="/heatmap/api">try it using the API client</Link>. You can also see
                    more example usages in{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=HeatMap&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
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
                        chartClass="heatmap"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveHeatMap
                            data={data}
                            keys={keys}
                            {...mappedSettings}
                            onClick={this.handleNodeClick}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <HeatMapControls
                        scope="HeatMap"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="HeatMap" properties={properties} />
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
