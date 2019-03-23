/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ResponsiveSankey, SankeyDefaultProps } from '@nivo/sankey'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import SankeyControls from './SankeyControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'

const initialSettings = {
    margin: {
        top: 40,
        right: 160,
        bottom: 40,
        left: 50,
    },

    layout: 'horizontal',
    align: 'justify',
    sort: 'auto',
    colors: 'category10',

    nodeOpacity: 1,
    nodeHoverOpacity: 1,
    nodeThickness: 18,
    nodeInnerPadding: 3,
    nodeSpacing: 24,
    nodeBorderWidth: 0,
    nodeBorderColor: {
        type: 'inherit:darker',
        gamma: 0.8,
    },

    linkOpacity: 0.5,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.1,
    linkContract: 0,
    linkBlendMode: 'multiply',
    enableLinkGradient: true,

    enableLabels: true,
    labelPosition: 'outside',
    labelOrientation: 'vertical',
    labelPadding: 16,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1,
    },

    animate: true,
    motionStiffness: 140,
    motionDamping: 13,

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
            itemTextColor: '#999',
            symbolSize: 14,
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
}

const Sankey = ({ data, randomizeLinkValues }) => {
    const [settings, setSettings] = useState(initialSettings)

    const mappedSettings = propsMapper(settings)

    const code = generateCode('ResponsiveSankey', mappedSettings, {
        pkg: '@nivo/sankey',
        defaults: SankeyDefaultProps,
    })

    const header = <ChartHeader chartClass="Sankey" tags={['relational', 'flow', 'svg']} />

    const description = (
        <div className="chart-description">
            <p className="description">
                Computes a sankey diagram from nodes and links, built on top of{' '}
                <a href="https://github.com/d3/d3-sankey" target="_blank" rel="noopener noreferrer">
                    d3-sankey
                </a>
                . The responsive alternative of this component is <code>ResponsiveSankey</code>.
            </p>
            <p className="description">
                Please be careful with the data you use for this chart as it does not support cyclic
                dependencies.
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
                or <Link to="/sankey/api">try it using the API client</Link>. You can also see more
                example usages in{' '}
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
                See the <Link to="/guides/legends">dedicated guide</Link> on how to setup legends
                for this component.
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
                <SankeyControls scope="Sankey" settings={settings} onChange={setSettings} />
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

export default Sankey
