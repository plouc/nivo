/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import { ResponsiveBump, BumpDefaultProps } from '@nivo/bump'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bump/meta.yml'
import { groups } from '../../data/components/bump/props'
import mapper from '../../data/components/bump/mapper'

const generateData = () => {
    const years = range(2000, 2005)
    const ranks = range(1, 13)

    const series = ranks.map(rank => {
        return {
            id: `Serie ${rank}`,
            data: [],
        }
    })

    years.forEach(year => {
        shuffle(ranks).forEach((rank, i) => {
            series[i].data.push({
                x: year,
                y: rank,
            })
        })
    })

    return series
}

const initialProperties = {
    margin: {
        top: 40,
        right: 100,
        bottom: 40,
        left: 60,
    },

    interpolation: BumpDefaultProps.interpolation,
    xPadding: BumpDefaultProps.xPadding,
    xOuterPadding: BumpDefaultProps.xOuterPadding,
    yOuterPadding: BumpDefaultProps.yOuterPadding,

    colors: { scheme: 'spectral' },
    lineWidth: 3,
    activeLineWidth: 6,
    inactiveLineWidth: 3,
    opacity: BumpDefaultProps.opacity,
    activeOpacity: BumpDefaultProps.activeOpacity,
    inactiveOpacity: 0.15,

    startLabel: false,
    startLabelPadding: BumpDefaultProps.startLabelPadding,
    startLabelTextColor: BumpDefaultProps.startLabelTextColor,
    endLabel: 'id',
    endLabelPadding: BumpDefaultProps.endLabelPadding,
    endLabelTextColor: BumpDefaultProps.endLabelTextColor,

    pointSize: 10,
    activePointSize: 16,
    inactivePointSize: 0,
    pointColor: { theme: 'background' },
    pointBorderWidth: 3,
    activePointBorderWidth: 3,
    inactivePointBorderWidth: 0,
    pointBorderColor: { from: 'serie.color' },

    enableGridX: true,
    enableGridY: true,
    axisTop: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: v => `#${v}`,
        legend: 'ranking',
        legendPosition: 'middle',
        legendOffset: 40,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: v => `#${v}`,
        legend: 'ranking',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    isInteractive: true,

    animate: BumpDefaultProps.animate,
    motionConfig: BumpDefaultProps.motionConfig,
}

const Bump = () => {
    return (
        <ComponentTemplate
            name="Bump"
            meta={meta.Bump}
            icon="chord"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={BumpDefaultProps}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveBump
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={serie =>
                            logAction({
                                type: 'click',
                                label: `[serie] ${serie.id}`,
                                color: serie.color,
                                data: serie,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Bump
