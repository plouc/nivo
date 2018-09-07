/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import merge from 'lodash/merge'
import { Link } from 'react-router-dom'
import {
    ResponsiveParallelCoordinatesCanvas,
    commonDefaultProps as defaultProps,
} from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import nivoTheme from '../../../nivoTheme'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ParallelCoordinatesControls from './ParallelCoordinatesControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import propsMapper from './propsMapper'
import variables from './variables'

const lineCount = 320

export default class ParallelCoordinatesCanvas extends Component {
    state = {
        data: generateParallelCoordinatesData({ size: lineCount }),
        settings: {
            variables,
            margin: {
                top: 50,
                right: 60,
                bottom: 50,
                left: 60,
            },
            layout: defaultProps.layout,
            curve: defaultProps.curve,
            colors: defaultProps.colors,
            colorBy: defaultProps.colorBy,
            strokeWidth: 1,
            lineOpacity: 0.2,
            axesPlan: defaultProps.axesPlan,
            axesTicksPosition: defaultProps.axesTicksPosition,
            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
            theme: merge({}, nivoTheme, {
                axis: {
                    ticks: {
                        line: {
                            strokeWidth: 2,
                            strokeLinecap: 'square',
                        },
                    },
                    domain: {
                        line: {
                            strokeWidth: 2,
                            strokeLinecap: 'square',
                        },
                    },
                },
            }),
        },
    }

    diceRoll = () => {
        this.setState({ data: generateParallelCoordinatesData({ size: lineCount }) })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveParallelCoordinatesCanvas', mappedSettings, {
            pkg: '@nivo/parallel-coordinates',
            defaults: defaultProps,
        })

        const header = <ChartHeader chartClass="ParallelCoordinatesCanvas" tags={['canvas']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the{' '}
                    <Link to="/parallel-coordinates">ParallelCoordinates</Link> component. Well
                    suited for large data sets as it does not impact DOM tree depth and does not
                    involve React diffing stuff for children (not that useful when using canvas),
                    however you'll lose the isomorphic ability and transitions.
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveParallelCoordinatesCanvas</code>.
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
                        chartClass="parallel-coordinates"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                        nodeCount={lineCount}
                        nodeCountWording="lines"
                    >
                        <ResponsiveParallelCoordinatesCanvas data={data} {...mappedSettings} />
                    </ChartTabs>
                    <ParallelCoordinatesControls
                        scope="ParallelCoordinatesCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation
                        chartClass="ParallelCoordinatesCanvas"
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
