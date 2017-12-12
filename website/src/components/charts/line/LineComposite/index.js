/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import omit from 'lodash/omit'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { generatePointsSerie } from '@nivo/generators'
import { ResponsiveWrapper } from '@nivo/core'
import { Scales, LinearScaleX, LinearScaleY } from '@nivo/scales'
import { XAxis, YAxis, Grid } from '@nivo/axes'
import { LineSvg, LineDefaultProps, LineAreas, LineAreaSvg } from '@nivo/line'
import { defaultTheme } from '@nivo/core'
import ChartHeader from '../../../ChartHeader'
import ChartTabs from '../../../ChartTabs'
import LineControls from '../LineControls'
import generateCode from '../../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../../properties/ComponentPropsDocumentation'
import properties from '../props'
import config from '../../../../config'
import defaultProps from '../defaultProps'
import propsMapper from '../propsMapper'

const generateData = () => {
    const a = generatePointsSerie({
        x1: 120,
        xStep: 2,
        y0: 10,
        y1: 80,
        yRand: 3,
        easing: 'random',
    })

    const b = generatePointsSerie({
        x1: 90,
        xStep: 1,
        y0: 0,
        y1: 42,
        yRand: 12,
        easing: 'random',
    })

    const c = generatePointsSerie({
        x0: 5,
        x1: 120,
        xStep: 3,
        y0: 24,
        y1: 2,
        yRand: 3,
        easing: 'random',
        xGaps: [[35, 45], [85, 95]],
    })

    return { a, b, c }
}

export default class LinePage extends Component {
    state = {
        data: generateData(),
        settings: {
            ...omit(defaultProps, ['width', 'height']),
            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 80,
                    itemHeight: 20,
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

    render() {
        const { data, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveLine', mappedSettings, {
            pkg: '@nivo/line',
            defaults: LineDefaultProps,
        })

        const header = (
            <ChartHeader
                chartClass="Line"
                tags={['basic', 'isomorphic', 'api']}
                diceRoll={this.diceRoll}
            />
        )

        const description = (
            <div className="chart-description">
                <p className="description">Line chart with stacking ability.</p>
                <p>
                    Given an array of data series having an id and a nested array of points (with x,
                    y properties), it will compute the line for each data serie.&nbsp; If stacked is
                    true, y values will be automatically aggregated.<br />
                    This component also accept empty values, but please note that they must be
                    explicitly <i>defined</i> though, eg. <code>{'{ x: 10, y: null }'}</code>.
                </p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveLine</code>.
                </p>
                <p className="description">
                    This component is available in the{' '}
                    <a
                        href="https://github.com/plouc/nivo-api"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        nivo-api
                    </a>, see{' '}
                    <a
                        href={`${config.nivoApiUrl}/samples/line.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sample
                    </a>{' '}
                    or <Link to="/line/api">try it using the API client</Link>. You can also see
                    more example usages in{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=Line&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>.
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
                    <ChartTabs chartClass="line" code={'code'} data={data} mode="horizontal">
                        <ResponsiveWrapper>
                            {({ width, height }) => (
                                <svg width={width} height={height}>
                                    <Scales
                                        scales={[
                                            <LinearScaleX
                                                id="x"
                                                data={[data.a, data.b, data.c]}
                                                width={
                                                    width -
                                                    settings.margin.left -
                                                    settings.margin.right
                                                }
                                            />,
                                            <LinearScaleY
                                                id="yAB"
                                                data={[data.a, data.b]}
                                                axis="y"
                                                height={
                                                    height -
                                                    settings.margin.top -
                                                    settings.margin.bottom
                                                }
                                            />,
                                            <LinearScaleY
                                                id="yC"
                                                data={[data.c]}
                                                axis="y"
                                                height={
                                                    height -
                                                    settings.margin.top -
                                                    settings.margin.bottom
                                                }
                                            />,
                                        ]}
                                    >
                                        {scales => (
                                            <g
                                                transform={`translate(${settings.margin.left}, ${
                                                    settings.margin.top
                                                })`}
                                            >
                                                <Grid
                                                    width={
                                                        width -
                                                        settings.margin.left -
                                                        settings.margin.right
                                                    }
                                                    height={
                                                        height -
                                                        settings.margin.top -
                                                        settings.margin.bottom
                                                    }
                                                    xScale={settings.enableGridX ? scales.x : null}
                                                    yScale={
                                                        settings.enableGridY ? scales.yAB : null
                                                    }
                                                    theme={defaultTheme}
                                                />
                                                <XAxis
                                                    width={
                                                        width -
                                                        settings.margin.left -
                                                        settings.margin.right
                                                    }
                                                    height={
                                                        height -
                                                        settings.margin.top -
                                                        settings.margin.bottom
                                                    }
                                                    scale={scales.x}
                                                    position="bottom"
                                                    theme={defaultTheme}
                                                />
                                                <YAxis
                                                    width={
                                                        width -
                                                        settings.margin.left -
                                                        settings.margin.right
                                                    }
                                                    height={
                                                        height -
                                                        settings.margin.top -
                                                        settings.margin.bottom
                                                    }
                                                    scale={scales.yAB}
                                                    position="left"
                                                    theme={defaultTheme}
                                                />
                                                <YAxis
                                                    width={
                                                        width -
                                                        settings.margin.left -
                                                        settings.margin.right
                                                    }
                                                    height={
                                                        height -
                                                        settings.margin.top -
                                                        settings.margin.bottom
                                                    }
                                                    scale={scales.yC}
                                                    position="right"
                                                    theme={defaultTheme}
                                                />
                                                <LineAreaSvg
                                                    height={
                                                        height -
                                                        settings.margin.top -
                                                        settings.margin.bottom
                                                    }
                                                    curve={settings.curve}
                                                    data={data.c}
                                                    xScale={scales.x}
                                                    yScale={scales.yC}
                                                    style={{
                                                        fill: '#1fa8ad',
                                                        fillOpacity: 0.1,
                                                    }}
                                                />
                                                <LineAreaSvg
                                                    height={
                                                        height -
                                                        settings.margin.top -
                                                        settings.margin.bottom
                                                    }
                                                    curve={settings.curve}
                                                    data={data.a}
                                                    xScale={scales.x}
                                                    yScale={scales.yAB}
                                                    style={{
                                                        fill: '#a8432d',
                                                        fillOpacity: 0.03,
                                                    }}
                                                />
                                                <LineAreaSvg
                                                    height={
                                                        height -
                                                        settings.margin.top -
                                                        settings.margin.bottom
                                                    }
                                                    curve={settings.curve}
                                                    data={data.b}
                                                    xScale={scales.x}
                                                    yScale={scales.yAB}
                                                    style={{
                                                        fill: '#ed705b',
                                                        fillOpacity: 0.1,
                                                    }}
                                                />
                                                <LineSvg
                                                    data={data.c}
                                                    xScale={scales.x}
                                                    yScale={scales.yC}
                                                    curve={settings.curve}
                                                    style={{
                                                        stroke: '#1fa8ad',
                                                        strokeWidth: 3,
                                                        strokeLinecap: 'round',
                                                        strokeDasharray: '1 8',
                                                    }}
                                                />
                                                <LineSvg
                                                    data={data.a}
                                                    xScale={scales.x}
                                                    yScale={scales.yAB}
                                                    style={{
                                                        stroke: '#a8432d',
                                                        strokeWidth: 1,
                                                    }}
                                                />
                                                <LineSvg
                                                    data={data.b}
                                                    xScale={scales.x}
                                                    yScale={scales.yAB}
                                                    style={{
                                                        stroke: '#ed705b',
                                                    }}
                                                />
                                            </g>
                                        )}
                                    </Scales>
                                </svg>
                            )}
                        </ResponsiveWrapper>
                    </ChartTabs>
                    <LineControls
                        scope="Line"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Line" properties={properties} />
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
