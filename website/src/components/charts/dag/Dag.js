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
import shuffle from 'lodash/shuffle'
import { ResponsiveDag, commonDefaultProps as defaultProps } from '@nivo/dag'
import { generateBulletData } from '@nivo/generators'
import nivoTheme from '../../../nivoTheme'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import DagControls from './DagControls'
import Stories from '../../Stories'
import { dagStories } from './stories'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'

const generateData = () => [
    generateBulletData('temp.', shuffle([100, 120, 140])[0]),
    generateBulletData('power', 2, { float: true, measureCount: 2 }),
    generateBulletData('volume', shuffle([40, 60, 80])[0], { rangeCount: 8 }),
    generateBulletData('cost', 500000, { measureCount: 2 }),
    generateBulletData('revenue', shuffle([9, 11, 13])[0], { markerCount: 2 }),
]

export default class Dag extends Component {
    state = {
        data: generateData(),
        settings: {
            layering: 'simplex',
            coord: 'vertical',
            margin: {
                top: 50,
                right: 90,
                bottom: 50,
                left: 90,
            },
            animate: true,
            motionStiffness: 90,
            motionDamping: 12,
            theme: nivoTheme,
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

        const code = generateCode('ResponsiveDag', settings, {
            pkg: '@nivo/dag',
            defaults: defaultProps,
        })

        const header = <ChartHeader chartClass="Dag" tags={['isomorphic']} />

        const description = (
            <div className="chart-description">
                <p className="description">DAG.</p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveDag</code>.
                </p>
            </div>
        )

        const stories = <Stories stories={dagStories} />

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                        {description}
                    </MediaQuery>
                    <ChartTabs chartClass="dag" code={code} data={data} diceRoll={this.diceRoll}>
                        <ResponsiveDag data={data} {...settings} />
                    </ChartTabs>
                    <DagControls
                        scope="Dag"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <MediaQuery query="(max-width: 1000px)">{stories}</MediaQuery>
                    <ComponentPropsDocumentation chartClass="Dag" properties={properties} />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                        {description}
                        {stories}
                    </MediaQuery>
                </div>
            </div>
        )
    }
}
