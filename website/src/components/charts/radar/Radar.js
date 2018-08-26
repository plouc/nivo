/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'
import { ResponsiveRadar } from '@nivo/radar'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import RadarControls from './RadarControls'
import generateCode from '../../../lib/generateChartCode'
import Stories from '../../Stories'
import { radarStories } from './stories'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'
import propsMapper from './propsMapper'

export default class Radar extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        indexBy: PropTypes.string.isRequired,
    }

    state = {
        settings: {
            maxValue: 'auto',

            margin: {
                top: 70,
                right: 80,
                bottom: 40,
                left: 80,
            },

            curve: 'catmullRomClosed',

            // border
            borderWidth: 2,
            borderColor: { type: 'inherit' },

            // axes & grid
            gridLevels: 5,
            gridShape: 'circular',
            gridLabelOffset: 36,

            // dots
            enableDots: true,
            dotSize: 8,
            dotColor: { type: 'inherit' },
            dotBorderWidth: 0,
            dotBorderColor: { type: 'custom', color: '#ffffff' },
            enableDotLabel: true,
            dotLabel: 'value',
            dotLabelYOffset: -12,

            colors: 'nivo',
            colorBy: 'key',
            fillOpacity: 0.1,

            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            isInteractive: true,

            legends: [
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
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

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, keys, indexBy, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveRadar',
            {
                keys,
                indexBy,
                ...mappedSettings,
            },
            { pkg: '@nivo/radar' }
        )

        const header = (
            <ChartHeader chartClass="Radar" tags={['radar', 'radial', 'circle', 'isomorphic']} />
        )

        const description = (
            <div className="chart-description">
                <p>
                    Generates a radar chart from an array of data. Note that margin object does not
                    take grid labels into account, so you should adjust it to leave enough room for
                    it.
                </p>
                <p className="description">
                    The responsive alternative of this component is&nbsp;
                    <code>ResponsiveRadar</code>.
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
                        href={`${config.nivoApiUrl}/samples/radar.svg`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sample
                    </a>{' '}
                    or <Link to="/radar/api">try it using the API client</Link>.
                </p>
                <p className="description">
                    See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                    legends for this component.
                </p>
            </div>
        )

        const stories = <Stories stories={radarStories} />

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                        {description}
                    </MediaQuery>
                    <ChartTabs chartClass="radar" code={code} data={data} diceRoll={diceRoll}>
                        <ResponsiveRadar
                            data={data}
                            keys={keys}
                            indexBy={indexBy}
                            {...mappedSettings}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <RadarControls
                        scope="Radar"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <MediaQuery query="(max-width: 1000px)">{stories}</MediaQuery>
                    <ComponentPropsDocumentation chartClass="Radar" properties={properties} />
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
