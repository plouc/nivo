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
import { ResponsiveRose, RoseDefaultProps } from '@nivo/rose'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import RoseControls from './RoseControls'
import generateCode from '../../../lib/generateChartCode'
import Stories from '../../Stories'
import { roseStories } from './stories'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import { generateHeavyDataSet } from './generators'
import propsMapper from './propsMapper'

const Tooltip = () => {
    /* return custom tooltip */
}

export default class RoseCanvas extends Component {
    state = {
        ...generateHeavyDataSet(),
        settings: {
            ...RoseDefaultProps,
            margin: {
                top: 20,
                right: 130,
                bottom: 20,
                left: 60,
            },

            colors: 'spectral',

            minValue: 'auto',
            maxValue: 'auto',

            borderColor: {
                type: 'inherit:darker',
                gamma: 1.6,
            },

            enableGridX: false,
            enableGridY: true,

            enableLabel: true,
            labelSkipWidth: 12,
            labelSkipHeight: 12,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1.6,
            },

            isInteractive: true,
            'custom tooltip example': false,
            tooltip: null,

            legends: [
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    onClick: data => {
                        alert(JSON.stringify(data, null, '    '))
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ],

            theme: nivoTheme,
        },
    }

    diceRoll = () => {
        this.setState(generateHeavyDataSet())
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(`${node.id}: ${node.value}\nclicked at x: ${event.clientX}, y: ${event.clientY}`)
    }

    render() {
        const { data, keys, indexBy, settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveRoseCanvas',
            {
                keys,
                indexBy,
                ...mappedSettings,
                tooltip: mappedSettings.tooltip ? Tooltip : undefined,
            },
            { pkg: '@nivo/rose', defaults: RoseDefaultProps }
        )

        const header = <ChartHeader chartClass="Rose" tags={['polar', 'canvas']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/rose">Rose</Link> component. Well suited for
                    large data sets as it does not impact DOM tree depth, however it doesn&apos;t
                    support transitions and patterns.
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveRoseCanvas</code>.
                </p>
                <p>
                    See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                    legends for this component.
                </p>
            </div>
        )

        const stories = <Stories stories={roseStories} />

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                        {description}
                    </MediaQuery>
                    <ChartTabs chartClass="rose" code={code} data={data} diceRoll={this.diceRoll}>
                        <ResponsiveRose
                            data={data}
                            keys={keys}
                            indexBy={indexBy}
                            {...mappedSettings}
                            onClick={this.handleNodeClick}
                        />
                    </ChartTabs>
                    <RoseControls
                        scope="RoseCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <MediaQuery query="(max-width: 1000px)">{stories}</MediaQuery>
                    <ComponentPropsDocumentation chartClass="Rose" properties={properties} />
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
