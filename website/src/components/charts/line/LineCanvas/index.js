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
import { GridCanvas, XAxisCanvas, YAxisCanvas } from '@nivo/axes'
import {
    LineDefaultProps,
    Scales,
    LinearScaleX,
    LinearScaleY,
    Lines,
    LineAreas,
    CanvasWrapper,
    LineCanvas,
    LineAreaCanvas,
} from '@nivo/line'
import ChartHeader from '../../../ChartHeader'
import ChartTabs from '../../../ChartTabs'
import LineControls from '../LineControls'
import generateCode from '../../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../../properties/ComponentPropsDocumentation'
import properties from '../props'
import config from '../../../../config'
import defaultProps from '../defaultProps'
import propsMapper from '../propsMapper'

export default class LinePage extends Component {
    state = {
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

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { /*data,*/ diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveLine', mappedSettings, {
            pkg: '@nivo/line',
            defaults: LineDefaultProps,
        })

        const header = (
            <ChartHeader
                chartClass="Line"
                tags={['basic', 'isomorphic', 'api']}
                diceRoll={diceRoll}
            />
        )

        const dataA = generatePointsSerie({
            x1: 120,
            xStep: 0.5,
            y0: 30,
            y1: 80,
            yRand: 2,
            easing: 'random',
        })

        const dataB = generatePointsSerie({
            x1: 90,
            xStep: 0.2,
            y0: 0,
            y1: 42,
            yRand: 4,
            easing: 'random',
        })

        const dataC = generatePointsSerie({
            x0: 15,
            x1: 120,
            xStep: 1,
            y0: 24,
            y1: 2,
            yRand: 2,
            easing: 'random',
            xGaps: [[35, 45], [85, 95]],
        })

        const data = []

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
                    <ChartTabs chartClass="line" code={''} data={data} mode="horizontal">
                        <ResponsiveWrapper>
                            {({ width, height }) => (
                                <CanvasWrapper width={width} height={height} pixelRatio={2}>
                                    {ctx => (
                                        <Scales
                                            scales={[
                                                <LinearScaleX
                                                    id="x"
                                                    data={[dataA, dataB, dataC]}
                                                    width={
                                                        width -
                                                        settings.margin.left -
                                                        settings.margin.right
                                                    }
                                                />,
                                                <LinearScaleY
                                                    id="yAB"
                                                    data={[dataA, dataB]}
                                                    axis="y"
                                                    height={
                                                        height -
                                                        settings.margin.top -
                                                        settings.margin.bottom
                                                    }
                                                />,
                                                <LinearScaleY
                                                    id="yC"
                                                    data={[dataC]}
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
                                                <Fragment>
                                                    <GridCanvas
                                                        ctx={ctx}
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
                                                        xScale={scales.x}
                                                        yScale={scales.yAB}
                                                    />
                                                    <XAxisCanvas
                                                        ctx={ctx}
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
                                                        position="bottom"
                                                        scale={scales.x}
                                                    />
                                                    <YAxisCanvas
                                                        ctx={ctx}
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
                                                        position="right"
                                                        scale={scales.yAB}
                                                    />
                                                    <LineAreas
                                                        height={
                                                            height -
                                                            settings.margin.top -
                                                            settings.margin.bottom
                                                        }
                                                    >
                                                        {generator => (
                                                            <Fragment>
                                                                <LineAreaCanvas
                                                                    ctx={ctx}
                                                                    generator={generator}
                                                                    data={dataA}
                                                                    xScale={scales.x}
                                                                    yScale={scales.yAB}
                                                                />
                                                                <LineAreaCanvas
                                                                    ctx={ctx}
                                                                    generator={generator}
                                                                    data={dataB}
                                                                    xScale={scales.x}
                                                                    yScale={scales.yAB}
                                                                />
                                                                <LineAreaCanvas
                                                                    ctx={ctx}
                                                                    generator={generator}
                                                                    data={dataC}
                                                                    xScale={scales.x}
                                                                    yScale={scales.yC}
                                                                />
                                                            </Fragment>
                                                        )}
                                                    </LineAreas>
                                                    <Lines ctx={ctx}>
                                                        {generator => (
                                                            <Fragment>
                                                                <LineCanvas
                                                                    ctx={ctx}
                                                                    generator={generator}
                                                                    data={dataA}
                                                                    xScale={scales.x}
                                                                    yScale={scales.yAB}
                                                                />
                                                                <LineCanvas
                                                                    ctx={ctx}
                                                                    generator={generator}
                                                                    data={dataB}
                                                                    xScale={scales.x}
                                                                    yScale={scales.yAB}
                                                                />
                                                                <LineCanvas
                                                                    ctx={ctx}
                                                                    generator={generator}
                                                                    data={dataC}
                                                                    xScale={scales.x}
                                                                    yScale={scales.yC}
                                                                />
                                                            </Fragment>
                                                        )}
                                                    </Lines>
                                                </Fragment>
                                            )}
                                        </Scales>
                                    )}
                                </CanvasWrapper>
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
