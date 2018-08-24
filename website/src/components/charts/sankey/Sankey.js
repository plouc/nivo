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
import { ResponsiveSankey, SankeyDefaultProps as defaults } from '@nivo/sankey'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import SankeyControls from './SankeyControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'

export default class Sankey extends Component {
    state = {
        settings: {
            margin: {
                top: 40,
                right: 160,
                bottom: 40,
                left: 50,
            },

            align: 'justify',
            colors: 'd320b',

            // nodes
            nodeOpacity: 1,
            nodeHoverOpacity: 1,
            nodeWidth: 18,
            nodePaddingX: 0,
            nodePaddingY: 12,
            nodeBorderWidth: 1,
            nodeBorderColor: {
                type: 'inherit:darker',
                gamma: 0.8,
            },

            // links
            linkOpacity: 0.25,
            linkHoverOpacity: 0.6,
            linkHoverOthersOpacity: 0.1,
            linkContract: 0,
            linkBlendMode: 'multiply',
            enableLinkGradient: true,

            // labels
            enableLabels: true,
            labelPosition: 'outside',
            labelOrientation: 'vertical',
            labelPadding: 16,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1,
            },

            // motion
            animate: true,
            motionStiffness: 120,
            motionDamping: 11,

            // interactivity
            isInteractive: true,

            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 130,
                    itemWidth: 100,
                    itemHeight: 14,
                    itemDirection: 'right-to-left',
                    itemsSpacing: 2,
                    symbolSize: 14,
                },
            ],
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, randomizeLinkValues } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveSankey', mappedSettings, {
            pkg: '@nivo/sankey',
            defaults,
        })

        const header = <ChartHeader chartClass="Sankey" tags={['relational', 'flow', 'api']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    Computes a sankey diagram from nodes and links, uses{' '}
                    <a
                        href="https://github.com/d3/d3-sankey"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        d3-sankey
                    </a>
                    , see{' '}
                    <a
                        href="https://bl.ocks.org/mbostock/ca9a0bb7ba204d12974bca90acc507c0"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        this block
                    </a>
                    . The responsive alternative of this component is <code>ResponsiveSankey</code>.
                </p>
                <p className="description">
                    Please be careful with the data you use for this chart as it does not support
                    cyclic dependencies.
                    <br />
                    For example, something like <code>A —> A</code> or <code>A —> B —> C —> A</code>{' '}
                    will crash.
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
                        href={`${config.nivoApiUrl}/samples/sankey.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sample
                    </a>{' '}
                    or <Link to="/sankey/api">try it using the API client</Link>. You can also see
                    more example usages in{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=Sankey&selectedStory=default`}
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
                    <ChartTabs
                        chartClass="sankey"
                        code={code}
                        data={data}
                        diceRoll={randomizeLinkValues}
                    >
                        <ResponsiveSankey data={data} {...mappedSettings} theme={nivoTheme} />
                    </ChartTabs>
                    <SankeyControls
                        scope="Sankey"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Sankey" properties={properties} />
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
