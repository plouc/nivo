/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import Helmet from 'react-helmet'
import { redColorRange } from '../../colors'
import range from 'lodash/range'
import random from 'lodash/random'
import {
    generateDayCounts,
    generateLibTree,
    generateDrinkStats,
    generateProgrammingLanguageStats,
    generateCountriesData,
    generateWinesTastes,
    generateSankeyData,
    generateChordData,
} from '@nivo/generators'
import { ResponsiveSankey } from '@nivo/sankey'
import { ResponsiveVoronoi } from '@nivo/voronoi'
import { ResponsiveRadar } from '@nivo/radar'
import { ResponsiveChord } from '@nivo/chord'
import { ResponsiveCalendar } from '@nivo/calendar'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { ResponsiveStream } from '@nivo/stream'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'

const colors = redColorRange

const calendarFrom = new Date(2015, 3, 1)
const calendarTo = new Date(2016, 5, 1)
const calendarData = generateDayCounts(calendarFrom, calendarTo)
const voronoi = {
    xDomain: [0, 400],
    yDomain: [0, 300],
}
voronoi.data = range(80).map(id => ({
    id,
    x: Math.random() * voronoi.xDomain[1],
    y: Math.random() * voronoi.yDomain[1],
}))

const radarMargin = { top: 20, right: 40, bottom: 10, left: 40 }

const streamDataLayerCount = 5
const generateStreamData = () =>
    range(16).map(() =>
        range(streamDataLayerCount).reduce((acc, i) => {
            acc[i] = random(10, 200)
            return acc
        }, {})
    )

const homeTheme = {
    axis: {
        ticks: {
            line: {
                stroke: '#c6432d',
            },
            text: {
                fill: '#c6432d',
                fontSize: 9,
            },
        },
    },
    grid: {
        line: {
            stroke: '#c6432d',
            strokeWidth: 1,
            strokeDasharray: '1,3',
        },
    },
    labels: {
        text: {
            fill: '#c6432d',
        },
    },
}

const commonAxes = {
    axisLeft: {
        tickSize: 4,
        tickPadding: 2,
    },
    axisBottom: {
        tickSize: 4,
        tickPadding: 2,
    },
}

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Helmet title="nivo" />
                <MediaQuery query="(min-width: 1200px)" className="home_item">
                    <Link to="/chord">
                        <ResponsiveChord
                            colors={colors}
                            padAngle={0.04}
                            innerRadiusRatio={0.94}
                            {...generateChordData({ size: 7 })}
                            enableLabel={false}
                            isInteractive={false}
                            animate={false}
                            arcBorderWidth={0}
                            ribbonBorderWidth={0}
                        />
                        <span className="home_item_label">
                            <span>Chord documentation</span>
                        </span>
                    </Link>
                </MediaQuery>
                <Link className="home_item" to="/line">
                    <ResponsiveLine
                        margin={{ top: 10, bottom: 15, left: 24, right: 10 }}
                        data={generateDrinkStats(12)}
                        yScale={{ type: 'linear', stacked: true }}
                        curve="monotoneX"
                        theme={homeTheme}
                        colors={colors}
                        animate={false}
                        isInteractive={false}
                        {...commonAxes}
                        dotSize={7}
                        dotBorderWidth={1}
                        dotBorderColor="#e25d47"
                    />
                    <span className="home_item_label">
                        <span>Line documentation</span>
                    </span>
                </Link>
                <Link className="home_item" to="/bubble">
                    <ResponsiveBubble
                        root={generateLibTree()}
                        identity="name"
                        enableLabel={false}
                        value="loc"
                        animate={false}
                        isInteractive={false}
                        colors={colors}
                    />
                    <span className="home_item_label">
                        <span>Bubble documentation</span>
                    </span>
                </Link>
                <MediaQuery query="(min-width: 1000px)" className="home_item">
                    <Link className="home_item" to="/bar">
                        <ResponsiveBar
                            data={generateCountriesData(['hot dogs', 'burgers', 'sandwich'], {
                                size: 11,
                            })}
                            indexBy="country"
                            keys={['hot dogs', 'burgers', 'sandwich']}
                            groupMode="grouped"
                            margin={{ top: 10, bottom: 15, left: 24, right: 10 }}
                            padding={0.2}
                            colors={colors}
                            theme={homeTheme}
                            enableLabel={false}
                            animate={false}
                            isInteractive={false}
                            {...commonAxes}
                        />
                        <span className="home_item_label">
                            <span>Bar documentation</span>
                        </span>
                    </Link>
                </MediaQuery>
                <MediaQuery query="(min-width: 1200px)" className="home_item">
                    <Link className="home_item" to="/bar">
                        <ResponsiveBar
                            data={generateCountriesData(
                                ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut'],
                                { size: 9 }
                            )}
                            indexBy="country"
                            keys={['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']}
                            groupMode="stacked"
                            layout="horizontal"
                            margin={{ top: 10, bottom: 15, left: 24, right: 0 }}
                            padding={0.4}
                            colors={colors}
                            theme={homeTheme}
                            enableLabel={false}
                            enableGridX={true}
                            enableGridY={false}
                            animate={false}
                            isInteractive={false}
                            {...commonAxes}
                        />
                        <span className="home_item_label">
                            <span>Bar documentation</span>
                        </span>
                    </Link>
                </MediaQuery>
                <div className="home_item">
                    <Link to="/components" className="logo" />
                </div>
                <div className="home_item home_item-baseline">
                    <p>
                        nivo provides a rich set of dataviz components,
                        <br />
                        built on top of the awesome d3 and Reactjs libraries.
                    </p>
                </div>
                <Link className="home_item" to="/stream">
                    <ResponsiveStream
                        data={generateStreamData()}
                        keys={range(streamDataLayerCount)}
                        margin={{ top: 10, bottom: 15, left: 24, right: 10 }}
                        theme={homeTheme}
                        colors={colors}
                        fillOpacity={0.75}
                        animate={false}
                        isInteractive={false}
                        {...commonAxes}
                    />
                    <span className="home_item_label">
                        <span>Stream documentation</span>
                    </span>
                </Link>
                <MediaQuery query="(min-width: 1200px)" className="home_item">
                    <Link className="home_item" to="/pie">
                        <ResponsivePie
                            margin={{
                                top: 26,
                                right: 60,
                                bottom: 26,
                                left: 60,
                            }}
                            data={generateProgrammingLanguageStats(true, 12).map(d => ({
                                id: d.label,
                                ...d,
                            }))}
                            innerRadius={0.6}
                            enableSlicesLabels={false}
                            radialLabelsLinkDiagonalLength={10}
                            radialLabelsLinkHorizontalLength={16}
                            colors={colors}
                            colorBy="id"
                            animate={false}
                            isInteractive={false}
                            theme={homeTheme}
                        />
                        <span className="home_item_label">
                            <span>Pie documentation</span>
                        </span>
                    </Link>
                </MediaQuery>
                <Link className="home_item" to="/calendar">
                    <ResponsiveCalendar
                        margin={{ top: 20, right: 2, bottom: 2, left: 20 }}
                        from={calendarFrom}
                        to={calendarTo}
                        data={calendarData}
                        dayBorderWidth={1}
                        yearSpacing={50}
                        yearLegendSpacing={6}
                        emptyColor="#e25d47"
                        dayBorderColor="#C6432D"
                        monthBorderColor="#C6432D"
                        colors={['#e96d5a', '#C6432D']}
                        isInteractive={false}
                        theme={homeTheme}
                    />
                    <span className="home_item_label">
                        <span>Calendar documentation</span>
                    </span>
                </Link>
                <Link className="home_item" to="/radar">
                    <ResponsiveRadar
                        {...generateWinesTastes()}
                        indexBy="taste"
                        margin={radarMargin}
                        theme={homeTheme}
                        colors={colors}
                        curve="linearClosed"
                        dotSize={7}
                        dotBorderWidth={1}
                        dotBorderColor="#e25d47"
                        animate={false}
                        isInteractive={false}
                    />
                    <span className="home_item_label">
                        <span>Radar documentation</span>
                    </span>
                </Link>
                <Link className="home_item" to="/voronoi">
                    <ResponsiveVoronoi
                        data={voronoi.data}
                        xDomain={voronoi.xDomain}
                        yDomain={voronoi.yDomain}
                        margin={{ top: 1, right: 1, bottom: 1, left: 1 }}
                        enableLinks={false}
                        linkLineColor="#d6513e"
                        cellLineColor="#c6432d"
                        cellLineWidth={1}
                        enablePoints={true}
                        pointSize={3}
                        pointColor="#c6432d"
                        animate={false}
                    />
                    <span className="home_item_label">
                        <span>Voronoi documentation</span>
                    </span>
                </Link>
                <MediaQuery query="(min-width: 1200px)" className="home_item">
                    <Link className="home_item" to="/treemap">
                        <ResponsiveTreeMap
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            root={generateLibTree()}
                            identity="name"
                            value="loc"
                            colors={colors}
                            leavesOnly={true}
                            innerPadding={1}
                            animate={false}
                            isInteractive={false}
                            label="loc"
                            labelFormat=".0s"
                            enableLabel={true}
                            labelTextColor="#e25d47"
                            borderColor="none"
                        />
                        <span className="home_item_label">
                            <span>TreeMap documentation</span>
                        </span>
                    </Link>
                </MediaQuery>
                <MediaQuery query="(min-width: 1000px)" className="home_item">
                    <Link className="home_item" to="/sunburst">
                        <ResponsiveSunburst
                            data={generateLibTree()}
                            identity="name"
                            value="loc"
                            animate={false}
                            isInteractive={false}
                            colors={colors}
                            borderColor="#e25d47"
                        />
                        <span className="home_item_label">
                            <span>Sunburst documentation</span>
                        </span>
                    </Link>
                </MediaQuery>
                <MediaQuery query="(min-width: 1000px)" className="home_item">
                    <Link className="home_item" to="/sankey">
                        <ResponsiveSankey
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            data={generateSankeyData({ nodeCount: 11, maxIterations: 2 })}
                            theme={homeTheme}
                            colors={colors}
                            animate={false}
                            isInteractive={false}
                            nodeOpacity={1}
                            nodeWidth={4}
                            nodePadding={12}
                            nodeBorderWidth={0}
                            linkOpacity={0.2}
                            linkBlendMode="normal"
                            linkContract={1}
                            labelTextColor="inherit"
                        />
                        <span className="home_item_label">
                            <span>Sankey documentation</span>
                        </span>
                    </Link>
                </MediaQuery>
                <MediaQuery query="(min-width: 1000px)" className="home_item">
                    <Link to="/chord">
                        <ResponsiveChord
                            colors={colors}
                            padAngle={0.04}
                            innerRadiusRatio={0.94}
                            {...generateChordData({ size: 5 })}
                            enableLabel={false}
                            animate={false}
                            isInteractive={false}
                            arcBorderWidth={0}
                            ribbonBorderWidth={0}
                        />
                        <span className="home_item_label">
                            <span>Chord documentation</span>
                        </span>
                    </Link>
                </MediaQuery>
            </div>
        )
    }
}

export default Home
