/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import range from 'lodash/range'
import MediaQuery from 'react-responsive'
import { ResponsiveVoronoi, VoronoiDefaultProps } from '@nivo/voronoi'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import VoronoiControls from './VoronoiControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'

const xDomain = [0, 100]
const yDomain = [0, 100]

const generateData = () =>
    range(100).map(id => ({ id, x: Math.random() * xDomain[1], y: Math.random() * yDomain[1] }))

export default class Voronoi extends Component {
    constructor(props) {
        super(props)

        this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this)

        this.state = {
            data: generateData(),
            settings: {
                ...Voronoi.defaultProps,

                xDomain,
                yDomain,

                margin: {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1,
                },

                enableLinks: true,
                linkLineWidth: 1,
                linkLineColor: '#cccccc',

                enableCells: true,
                cellLineWidth: 2,
                cellLineColor: '#c6432d',

                enablePoints: true,
                pointSize: 6,
                pointColor: '#c6432d',
            },
        }
    }

    diceRoll = () => {
        this.setState({
            data: generateData(),
        })
    }

    handleSettingsUpdate(settings) {
        this.setState({ settings })
    }

    render() {
        const { data, settings } = this.state

        const code = generateCode('ResponsiveVoronoi', settings, {
            pkg: '@nivo/voronoi',
            defaults: VoronoiDefaultProps,
        })

        const header = <ChartHeader chartClass="Voronoi" tags={['voronoi', 'experimental']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    Delaunay/Voronoi Tessellation, uses{' '}
                    <a
                        href="https://github.com/d3/d3-delaunay"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        d3-delaunay
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
                    <ChartTabs
                        chartClass="voronoi"
                        code={code}
                        data={data}
                        diceRoll={this.diceRoll}
                    >
                        <ResponsiveVoronoi
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            data={data}
                            xDomain={xDomain}
                            yDomain={yDomain}
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
