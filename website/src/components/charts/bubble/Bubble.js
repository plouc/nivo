/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ResponsiveBubble, BubbleDefaultProps } from '@nivo/circle-packing'
import { patternLinesDef } from '@nivo/core'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import Stories from '../../Stories'
import { bubbleStories } from './stories'
import BubbleControls from './BubbleControls'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'

export default class Bubble extends Component {
    state = {
        settings: {
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            identity: 'name',
            value: 'loc',
            colors: 'nivo',
            colorBy: 'depth',
            padding: 6,
            leavesOnly: false,

            // labels
            enableLabel: true,
            label: 'id',
            labelSkipRadius: 8,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 0.8,
            },

            borderWidth: 2,
            borderColor: {
                type: 'inherit',
            },

            defs: [
                patternLinesDef('lines', {
                    background: 'none',
                    color: 'inherit',
                    rotation: -45,
                    lineWidth: 5,
                    spacing: 8,
                }),
            ],
            fill: [{ match: { depth: 1 }, id: 'lines' }],

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 12,

            // interactivity
            isInteractive: true,

            // zooming
            isZoomable: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { root, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode('ResponsiveBubble', mappedSettings, {
            pkg: '@nivo/circle-packing',
            defaults: BubbleDefaultProps,
        })

        const header = (
            <ChartHeader chartClass="Bubble" tags={['hierarchy', 'svg', 'isomorphic', 'api']} />
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    Bubble chart using circle packing with zooming ability. You can fully customize
                    it using <code>nodeComponent</code> property to define your own node component,
                    if you wish to do so you should have a look at{' '}
                    <a
                        href="https://github.com/plouc/nivo/blob/master/src/components/charts/bubble/BubbleNode.js"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        native SVG node component
                    </a>{' '}
                    for available properties.
                </p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveBubble</code>.
                    It also offers various implementations, see{' '}
                    <Link to="/bubble/html">BubbleHtml</Link> and{' '}
                    <Link to="/bubble/canvas">BubbleCanvas</Link>.
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
                        href={`${config.nivoApiUrl}/samples/bubble.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sample
                    </a>{' '}
                    or <Link to="/bubble/api">try it using the API client</Link>. You can also see
                    more example usages in{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=Bubble&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
                </p>
            </div>
        )

        const stories = <Stories stories={bubbleStories} />

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                        {description}
                    </MediaQuery>
                    <ChartTabs
                        chartClass="circle-packing"
                        code={code}
                        data={root}
                        diceRoll={diceRoll}
                    >
                        <ResponsiveBubble
                            root={cloneDeep(root)}
                            {...mappedSettings}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <BubbleControls
                        scope="Bubble"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <MediaQuery query="(max-width: 1000px)">{stories}</MediaQuery>
                    <ComponentPropsDocumentation chartClass="Bubble" properties={properties} />
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
