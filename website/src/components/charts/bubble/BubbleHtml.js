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
import { ResponsiveBubbleHtml, BubbleHtmlDefaultProps } from '@nivo/circle-packing'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import BubbleControls from './BubbleControls'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'

export default class BubbleHtml extends Component {
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
            colors: 'paired',
            colorBy: 'depth',
            padding: 1,
            leavesOnly: false,

            // labels
            enableLabel: true,
            label: 'id',
            labelSkipRadius: 10,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 0.8,
            },

            borderWidth: 0,
            borderColor: {
                type: 'inherit:darker',
                gamma: 0.3,
            },

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

        const code = generateCode('ResponsiveBubbleHtml', mappedSettings, {
            pkg: '@nivo/circle-packing',
            defaults: BubbleHtmlDefaultProps,
        })

        const header = (
            <ChartHeader chartClass="BubbleHtml" tags={['hierarchy', 'html', 'isomorphic']} />
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    Bubble chart using circle packing with zooming ability. You can fully customize
                    it using <code>nodeComponent</code> property to define your own node component,
                    if you wish to do so you should have a look at{' '}
                    <a
                        href="https://github.com/plouc/nivo/blob/master/src/components/charts/bubble/BubbleHtmlNode.js"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        native HTML node component
                    </a>{' '}
                    for available properties.
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveBubbleHtml</code>. It also offers various implementations, see{' '}
                    <Link to="/bubble">Bubble</Link> and{' '}
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
                        <ResponsiveBubbleHtml
                            root={cloneDeep(root)}
                            {...mappedSettings}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <BubbleControls
                        scope="BubbleHtml"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="BubbleHtml" properties={properties} />
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
