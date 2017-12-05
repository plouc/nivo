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
import { ResponsiveStream, StreamDefaultProps } from '@nivo/stream'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import StreamControls from './StreamControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet } from './generators'
import defaultProps from './defaultProps'
import propsMapper from './propsMapper'

export default class Stream extends Component {
    state = {
        ...generateLightDataSet(),
        settings: defaultProps,
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ ...generateLightDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('Stream', mappedSettings, {
            pkg: '@nivo/stream',
            defaults: StreamDefaultProps,
        })

        const header = (
            <ChartHeader
                chartClass="Stream"
                tags={['stacked', 'isomorphic']}
                diceRoll={this.diceRoll}
            />
        )

        const description = (
            <div className="chart-description">
                <p className="description">Stream chart.</p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveStream</code>.
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
                    <ChartTabs chartClass="stream" mode="horizontal" code={code} data={data}>
                        <ResponsiveStream
                            data={data}
                            keys={keys}
                            {...mappedSettings}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <StreamControls
                        scope="Stream"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Stream" properties={properties} />
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
