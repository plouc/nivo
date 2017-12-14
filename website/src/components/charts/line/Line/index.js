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
import { ResponsiveLineChartSvg, LineChartSvg } from '@nivo/line'
import ChartHeader from '../../../ChartHeader'
import ChartTabs from '../../../ChartTabs'
import LineControls from '../LineControls'
import generateCode from '../../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../../properties/ComponentPropsDocumentation'
import properties from '../props'
import config from '../../../../config'
import propsMapper from '../propsMapper'
import generateData from './generateData'
import defaultSettings from './defaultSettings'

export default class LineChartSvgDemo extends Component {
    state = {
        data: generateData(),
        settings: { ...defaultSettings },
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

        const code = generateCode('ResponsiveLineChartSvg', mappedSettings, {
            pkg: '@nivo/line',
            defaults: LineChartSvg.defaultProps,
        })

        const header = (
            <ChartHeader chartClass="LineChartSvg" tags={['basic', 'isomorphic', 'api']} />
        )

        const description = (
            <div className="chart-description">
                <p>
                    A line chart with stacking ability. Given an array of data series having an id
                    and a nested array of points (with x, y properties), it will compute the line
                    for each data serie.&nbsp; If stacked is true, y values will be automatically
                    aggregated. By default it uses a linear scale for x axis, but if you wish to use
                    text values for <code>x</code>, you can provide a custom <code>xScale</code>{' '}
                    config.
                </p>
                <p>
                    This component also accepts empty values, but please note that they must be
                    explicitly <i>defined</i> though, eg. <code>{'{ x: 10, y: null }'}</code>. When{' '}
                    <code>stacked</code> is <code>true</code>, you must use consistent lengths, also
                    if one of the series contains some null values, all values for subsequent series
                    at identical index will be nullified too because there's no way to stack those,
                    that's why if you change the <code>stacked</code> value on this example, you'll
                    see that some points disappear when switched on.
                </p>
                <p>
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveLineChartSvg</code>, it also offers another implementation, see{' '}
                    <Link to="/line/canvas">LineChartCanvas</Link>.
                </p>
                <p>
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
                <p>
                    For more advanced features (eg.{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=Line&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        dual y axis
                    </a>) or mixing with other chart types, you can also build your own chart using{' '}
                    <code>@nivo/line</code> <Link to="/line/components">low level components</Link>.
                </p>
                <p>
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
                    <ChartTabs chartClass="line" code={code} data={data} diceRoll={this.diceRoll}>
                        <ResponsiveLineChartSvg data={data} {...mappedSettings} />
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
