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
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap'
import isFunction from 'lodash/isFunction'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import HeatMapControls from './HeatMapControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import { generateHeavyDataSet } from './generators'
import propsMapper from './propsMapper'

export default class HeatMap extends Component {
    state = {
        ...generateHeavyDataSet(),
        settings: {
            indexBy: 'country',

            margin: {
                top: 100,
                right: 60,
                bottom: 100,
                left: 60,
            },

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

            minValue: 'auto',
            maxValue: 'auto',
            forceSquare: false,
            sizeVariation: 0,
            padding: 0,
            colors: 'BrBG',

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
                enable: true,
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 0,
            },
            axisBottom: {
                enable: true,
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
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
            enableGridY: true,

            // cells
            cellShape: 'rect',
            cellOpacity: 1,
            cellBorderWidth: 0,
            cellBorderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },

            // labels
            enableLabels: false,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1.4,
            },

            // motion
            animate: true,
            motionStiffness: 120,
            motionDamping: 9,

            // interactivity
            isInteractive: true,
            hoverTarget: 'rowColumn',
            cellHoverOpacity: 1,
            cellHoverOthersOpacity: 0.5,
        },
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

    diceRoll = () => {
        this.setState({ ...generateHeavyDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveHeatMapCanvas',
            Object.assign({ keys }, mappedSettings, {
                cellShape: isFunction(mappedSettings.cellShape)
                    ? 'Custom(props) => (…)'
                    : mappedSettings.cellShape,
            }),
            { pkg: '@nivo/heatmap' }
        )

        const header = (
            <ChartHeader chartClass="HeatMapCanvas" tags={['heatmap', 'canvas', 'experimental']} />
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/heatmap">HeatMap</Link> component. Well suited
                    for large data sets as it does not impact DOM tree depth and does not involve
                    React diffing stuff (not that useful when using canvas), however you'll lose the
                    isomorphic ability and transitions (for now).
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveHeatMapCanvas</code>.
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
                        nodeCount={data.length * keys.length}
                    >
                        <ResponsiveHeatMapCanvas
                            data={data}
                            keys={keys}
                            {...mappedSettings}
                            onClick={this.handleNodeClick}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <HeatMapControls
                        scope="HeatMapCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation
                        chartClass="HeatMapCanvas"
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
