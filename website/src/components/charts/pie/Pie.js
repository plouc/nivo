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
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import PieControls from './PieControls'
import { ResponsivePie, PieDefaultProps } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import config from '../../../config'
import propsMapper from './propsMapper'

const DATASET_SIZE = 5
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

export default class Pie extends Component {
    state = {
        data: generateData(),
        settings: {
            margin: {
                top: 40,
                right: 80,
                bottom: 80,
                left: 80,
            },

            startAngle: 0,
            endAngle: 360,
            sortByValue: false,
            innerRadius: 0.5,
            padAngle: 0.7,
            cornerRadius: 3,
            fit: true,

            // Styling
            colors: 'nivo',
            colorBy: 'id',

            // border
            borderWidth: 1,
            borderColor: { type: 'inherit:darker', gamma: 0.2 },

            // radial labels
            enableRadialLabels: true,
            radialLabel: 'id',
            radialLabelsSkipAngle: 10,
            radialLabelsTextXOffset: 6,
            radialLabelsTextColor: { type: 'custom', color: '#333333' },
            radialLabelsLinkOffset: 0,
            radialLabelsLinkDiagonalLength: 16,
            radialLabelsLinkHorizontalLength: 24,
            radialLabelsLinkStrokeWidth: 1,
            radialLabelsLinkColor: { type: 'inherit' },

            // slice labels
            enableSlicesLabels: true,
            sliceLabel: 'value',
            slicesLabelsSkipAngle: 10,
            slicesLabelsTextColor: { type: 'custom', color: '#333333' },

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            // isInteractive
            isInteractive: true,

            'custom tooltip example': false,
            tooltip: null,
            theme: nivoTheme,
            'showcase pattern usage': true,
            defs: [],
            fill: [],
            legends: [
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    onClick: d => {
                        alert(JSON.stringify(d, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                            },
                        },
                    ],
                },
            ],
        },
    }

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(`${node.label}: ${node.value}\nclicked at x: ${event.clientX}, y: ${event.clientY}`)
    }

    render() {
        const { data, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsivePie', mappedSettings, {
            pkg: '@nivo/pie',
            defaults: PieDefaultProps,
        })

        const header = (
            <ChartHeader
                chartClass="Pie"
                tags={['basic', 'radial', 'circle', 'isomorphic', 'api']}
            />
        )

        const description = (
            <div className="chart-description">
                <p>
                    Generates a pie chart from an array of data, each datum must have an id and a
                    value property.
                    <br />
                    Note that margin object does not take radial labels into account,&nbsp; so you
                    should adjust it to leave enough room for it.
                </p>
                <p className="description">
                    The responsive alternative of this component is&nbsp;
                    <code>ResponsivePie</code>.
                </p>
                <p className="description">
                    This component is available in the{' '}
                    <a
                        href="https://github.com/plouc/nivo-api"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        nivo-api
                    </a>
                    , see{' '}
                    <a
                        href={`${config.nivoApiUrl}/samples/pie.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sample
                    </a>{' '}
                    or <Link to="/pie/api">try it using the API client</Link>. You can also see more
                    example usages in{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=Pie&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
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
                    <ChartTabs chartClass="pie" code={code} data={data} diceRoll={this.diceRoll}>
                        <ResponsivePie
                            data={data}
                            {...mappedSettings}
                            onClick={this.handleNodeClick}
                        />
                    </ChartTabs>
                    <PieControls
                        scope="Pie"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Pie" properties={properties} />
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
