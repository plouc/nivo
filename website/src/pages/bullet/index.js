/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import shuffle from 'lodash/shuffle'
import { ResponsiveBullet, BulletDefaultProps } from '@nivo/bullet'
import { generateBulletData } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bullet/meta.yml'
import { groups } from '../../data/components/bullet/props'

const generateData = () => [
    generateBulletData('temp.', shuffle([100, 120, 140])[0]),
    generateBulletData('power', 2, { float: true, measureCount: 2 }),
    generateBulletData('volume', shuffle([40, 60, 80])[0], { rangeCount: 8 }),
    generateBulletData('cost', 500000, { measureCount: 2 }),
    generateBulletData('revenue', shuffle([9, 11, 13])[0], { markerCount: 2 }),
]

const initialProperties = {
    margin: {
        top: 50,
        right: 90,
        bottom: 50,
        left: 90,
    },
    layout: BulletDefaultProps.layout,
    reverse: BulletDefaultProps.reverse,
    spacing: 46,
    titlePosition: BulletDefaultProps.titlePosition,
    titleAlign: 'start',
    titleOffsetX: -70,
    titleOffsetY: BulletDefaultProps.titleOffsetY,
    titleRotation: BulletDefaultProps.titleRotation,
    measureSize: 0.2,
    markerSize: 0.6,
    axisPosition: BulletDefaultProps.axisPosition,
    rangeColors: BulletDefaultProps.rangeColors,
    measureColors: BulletDefaultProps.measureColors,
    markerColors: BulletDefaultProps.markerColors,
    animate: true,
    motionStiffness: 90,
    motionDamping: 12,
}

const Bullet = () => {
    return (
        <ComponentTemplate
            name="Bullet"
            meta={meta.Bullet}
            icon="bullet"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={BulletDefaultProps}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBullet
                        data={data}
                        {...properties}
                        theme={theme}
                        onRangeClick={range => {
                            logAction({
                                type: 'click',
                                label: `[range] ${range.id}: [${range.v0}, ${range.v1}]`,
                                color: range.color,
                                data: range,
                            })
                        }}
                        onMeasureClick={measure => {
                            logAction({
                                type: 'click',
                                label: `[measure] ${measure.id}: [${measure.v0}, ${measure.v1}]`,
                                color: measure.color,
                                data: measure,
                            })
                        }}
                        onMarkerClick={marker => {
                            logAction({
                                type: 'click',
                                label: `[marker] ${marker.id}: ${marker.value}`,
                                color: marker.color,
                                data: marker,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Bullet
