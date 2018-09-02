/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import range from 'lodash/range'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'
import { ResponsiveBullet, BulletDefaultProps } from '@nivo/bullet'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import BulletControls from './BulletControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './props'

const generateBulletData = (
    id,
    max,
    { rangeCount = 3, measureCount = 1, markerCount = 1, float = false } = {}
) => {
    const ranges = range(rangeCount - 1).reduce(
        acc => {
            const remaining = max - acc[0]
            return [random(remaining, float), ...acc]
        },
        [max]
    )

    const measures = range(measureCount).reduce(acc => {
        if (acc.length === 0) return [random(max, float)]
        return [random(acc[0], float), ...acc]
    }, [])

    const markers = range(markerCount).map(() => max * 0.6 + random(max * 0.4))

    return {
        id,
        ranges,
        measures,
        markers,
    }
}

const generateData = () => [
    generateBulletData('fake A', shuffle([100, 120, 140])[0]),
    // generateBulletData('fake B', 2, { float: true, measureCount: 2 }),
    // generateBulletData('fake C', shuffle([40, 60, 80])[0], { rangeCount: 5 }),
    // generateBulletData('fake D', 500000, { measureCount: 2 }),
    // generateBulletData('fake E', shuffle([9, 11, 13])[0], { markerCount: 2 }),
]

export default class Bullet extends Component {
    state = {
        data: generateData(),
        settings: {
            margin: {
                top: 50,
                right: 40,
                bottom: 50,
                left: 50,
            },
            layout: 'vertical',
            reverse: false,
            spacing: 40,
            measureSize: 0.4,
            markerSize: 0.6,
            axisPosition: 'after',
            animate: false,
            motionStiffness: 90,
            motionDamping: 12,
        },
    }

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, settings } = this.state

        const code = generateCode('ResponsiveBullet', settings, {
            pkg: '@nivo/bullet',
            defaults: BulletDefaultProps,
        })

        const header = <ChartHeader chartClass="Bullet" tags={['isomorphic']} />

        const description = (
            <div className="chart-description">
                <p className="description">
                    Bullet chart supporting multiple ranges/measures/markers.
                </p>
                <p className="description">
                    The responsive alternative of this component is <code>ResponsiveBullet</code>.
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
                    <ChartTabs chartClass="bullet" code={code} data={data} diceRoll={this.diceRoll}>
                        <ResponsiveBullet data={data} {...settings} />
                    </ChartTabs>
                    <BulletControls
                        scope="Bullet"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Bullet" properties={properties} />
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
