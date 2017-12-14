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
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import SunburstControls from './SunburstControls'
import { ResponsiveSunburst } from '@nivo/sunburst'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'

export default class Sunburst extends Component {
    state = {
        settings: {
            margin: {
                top: 40,
                right: 20,
                bottom: 20,
                left: 20,
            },

            identity: 'name',
            value: 'loc',

            cornerRadius: 2,

            // border
            borderWidth: 1,
            borderColor: 'white',

            // theming
            colors: 'nivo',
            colorBy: 'id',
            childColor: {
                type: 'inherit',
            },

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            // isInteractive
            isInteractive: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveSunburst', mappedSettings, { pkg: '@nivo/sunburst' })

        const header = (
            <ChartHeader chartClass="Sunburst" tags={['hierarchy', 'radial', 'circle']} />
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    The responsive alternative of this component is&nbsp;
                    <code>ResponsiveSunburst</code>.
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
                    <ChartTabs chartClass="sunburst" code={code} data={data} diceRoll={diceRoll}>
                        <ResponsiveSunburst data={data} {...mappedSettings} theme={nivoTheme} />
                    </ChartTabs>
                    <SunburstControls
                        scope="Sunburst"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Sunburst" properties={properties} />
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
