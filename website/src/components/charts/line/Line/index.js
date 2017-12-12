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
import { LineDefaultProps, ResponsiveLineChartSvg } from '@nivo/line'
import ChartHeader from '../../../ChartHeader'
import ChartTabs from '../../../ChartTabs'
import LineControls from '../LineControls'
import generateCode from '../../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../../properties/ComponentPropsDocumentation'
import properties from '../props'
import config from '../../../../config'
import propsMapper from '../propsMapper'
import defaultSettings from './defaultSettings'
import generateData from './generateData'

export default class LinePage extends Component {
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
            defaults: LineDefaultProps,
        })

        const header = (
            <ChartHeader
                chartClass="LineChartSvg"
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
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveLineChartSvg</code>.
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
                    <ChartTabs chartClass="line" code={code} data={data} mode="horizontal">
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
