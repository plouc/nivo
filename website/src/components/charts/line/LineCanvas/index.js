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
import { ResponsiveLineChartCanvas, LineChartCanvas } from '@nivo/line'
import ChartHeader from '../../../ChartHeader'
import ChartTabs from '../../../ChartTabs'
import LineControls from '../LineControls'
import generateCode from '../../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../../properties/ComponentPropsDocumentation'
import properties from '../props'
import propsMapper from '../propsMapper'
import generateData from './generateData'
import defaultSettings from './defaultSettings'

export default class LineChartCanvasDemo extends Component {
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

        const code = generateCode('ResponsiveLineChartCanvas', mappedSettings, {
            pkg: '@nivo/line',
            defaults: LineChartCanvas.defaultProps,
        })

        const header = (
            <ChartHeader
                chartClass="LineChartCanvas"
                tags={['basic', 'isomorphic', 'api']}
                diceRoll={this.diceRoll}
            />
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/line">LineChartSvg</Link> component. Well
                    suited for large data sets as it does not impact DOM tree depth and does not
                    involve React diffing stuff for children (not that useful when using canvas),
                    however you'll lose the isomorphic ability and transitions.
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveLineChartCanvas</code>.
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
                    <ChartTabs chartClass="line" code={code} diceRoll={this.diceRoll}>
                        <ResponsiveLineChartCanvas {...mappedSettings} data={data} pixelRatio={2} />
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
