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
import { ResponsiveChordCanvas } from '@nivo/chord'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ChordControls from './ChordControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'
import nivoTheme from '../../../nivoTheme'
import { generateChordData } from '@nivo/generators'
import propsMapper from './propsMapper'

const MATRIX_SIZE = 38

export default class ChordCanvas extends Component {
    state = {
        ...generateChordData({ size: MATRIX_SIZE }),
        settings: {
            margin: {
                top: 60,
                right: 60,
                bottom: 60,
                left: 60,
            },

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

            padAngle: 0.006,
            innerRadiusRatio: 0.86,
            innerRadiusOffset: 0,

            // arcs
            arcOpacity: 1,
            arcBorderWidth: 1,
            arcBorderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },

            // ribbons
            ribbonOpacity: 0.5,
            ribbonBorderWidth: 1,
            ribbonBorderColor: {
                type: 'inherit:darker',
                gamma: 0.4,
            },

            // labels
            enableLabel: true,
            label: 'id',
            labelOffset: 9,
            labelRotation: -90,
            labelTextColor: {
                type: 'inherit:darker',
                gamma: 1,
            },

            colors: 'paired',

            // interactivity
            isInteractive: true,
            arcHoverOpacity: 1,
            arcHoverOthersOpacity: 0.4,
            ribbonHoverOpacity: 0.75,
            ribbonHoverOthersOpacity: 0,

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 7,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ ...generateChordData({ size: MATRIX_SIZE }) })
    }

    render() {
        const { settings, matrix, keys } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveChordCanvas',
            { keys, ...mappedSettings },
            {
                pkg: '@nivo/calendar',
                dataKey: 'matrix',
            }
        )

        const header = (
            <ChartHeader chartClass="ChordCanvas" tags={['relational', 'canvas', 'experimental']} />
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/chord">Chord</Link> component. Well suited for
                    large data sets as it does not impact DOM tree depth and does not involve React
                    diffing stuff (not that useful when using canvas), however you'll lose the
                    isomorphic ability and transitions (for now).
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveChordCanvas</code>.
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
                        chartClass="chord"
                        code={code}
                        data={matrix}
                        diceRoll={this.diceRoll}
                        nodeCount={MATRIX_SIZE * MATRIX_SIZE + MATRIX_SIZE}
                    >
                        <ResponsiveChordCanvas
                            matrix={matrix}
                            keys={keys}
                            {...mappedSettings}
                            theme={nivoTheme}
                        />
                    </ChartTabs>
                    <ChordControls
                        scope="ChordCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="ChordCanvas" properties={properties} />
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
