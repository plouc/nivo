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
import { ResponsiveVoronoi, VoronoiDefaultProps } from '@nivo/voronoi'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import VoronoiControls from './VoronoiControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'

export default class Voronoi extends Component {
    constructor(props) {
        super(props)

        this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this)

        this.state = {
            settings: Object.assign({}, Voronoi.defaultProps, {
                margin: {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1,
                },
                enablePolygons: true,
                enableSites: true,
                enableLinks: false,
                borderWidth: 2,
                borderColor: '#000000',
                linkWidth: 1,
                linkColor: '#bbbbbb',
                siteSize: 4,
                siteColor: '#c6432d',
            }),
        }
    }

    handleSettingsUpdate(settings) {
        this.setState({ settings })
    }

    render() {
        const { data, diceRoll } = this.props
        const { settings } = this.state

        const code = generateCode('ResponsiveVoronoi', settings, {
            pkg: '@nivo/voronoi',
            defaults: VoronoiDefaultProps,
        })

        const header = <ChartHeader chartClass="Voronoi" tags={['voronoi', 'experimental']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    Voronoi Tessellation, uses{' '}
                    <a
                        href="https://github.com/d3/d3-voronoi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        d3-voronoi
                    </a>
                    , see{' '}
                    <a
                        href="http://bl.ocks.org/mbostock/4060366"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        this block
                    </a>
                    . The responsive alternative of this component is <code>ResponsiveVoronoi</code>
                    .
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
                    <ChartTabs chartClass="voronoi" code={code} data={data} diceRoll={diceRoll}>
                        <ResponsiveVoronoi
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            data={data}
                            {...settings}
                        />
                    </ChartTabs>
                    <VoronoiControls
                        scope="Voronoi"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Voronoi" properties={properties} />
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
