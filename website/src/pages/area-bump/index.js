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
import random from 'lodash/random'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { ResponsiveAreaBump, AreaBumpDefaultProps } from '@nivo/bump'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/area-bump/meta.yml'
import { groups } from '../../data/components/area-bump/props'
import mapper from '../../data/components/area-bump/mapper'

const serieIds = ['JavaScript', 'ReasonML', 'TypeScript', 'Elm', 'CoffeeScript']
const generateData = () => {
    const years = range(2000, 2006)

    const series = serieIds.map(id => ({
        id,
        data: years.map(year => ({
            x: year,
            y: random(10, 30),
        })),
    }))

    return series
}

const initialProperties = {
    margin: {
        top: 40,
        right: 100,
        bottom: 40,
        left: 100,
    },

    align: AreaBumpDefaultProps.align,
    interpolation: AreaBumpDefaultProps.interpolation,
    spacing: 8,
    xPadding: AreaBumpDefaultProps.xPadding,

    colors: { scheme: 'nivo' },
    blendMode: 'multiply',
    fillOpacity: AreaBumpDefaultProps.fillOpacity,
    activeFillOpacity: AreaBumpDefaultProps.activeFillOpacity,
    inactiveFillOpacity: AreaBumpDefaultProps.inactiveFillOpacity,
    defs: [
        patternDotsDef('dots', {
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
        }),
        patternLinesDef('lines', {
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
        }),
    ],
    fill: [
        { match: { id: 'CoffeeScript' }, id: 'dots' },
        { match: { id: 'TypeScript' }, id: 'lines' },
    ],
    borderWidth: AreaBumpDefaultProps.borderWidth,
    activeBorderWidth: AreaBumpDefaultProps.activeBorderWidth,
    inactiveBorderWidth: AreaBumpDefaultProps.inactiveBorderWidth,
    borderColor: AreaBumpDefaultProps.borderColor,
    borderOpacity: AreaBumpDefaultProps.borderOpacity,
    activeBorderOpacity: AreaBumpDefaultProps.activeBorderOpacity,
    inactiveBorderOpacity: AreaBumpDefaultProps.inactiveBorderOpacity,

    startLabel: 'id',
    startLabelPadding: AreaBumpDefaultProps.startLabelPadding,
    startLabelTextColor: AreaBumpDefaultProps.startLabelTextColor,
    endLabel: 'id',
    endLabelPadding: AreaBumpDefaultProps.endLabelPadding,
    endLabelTextColor: AreaBumpDefaultProps.endLabelTextColor,

    enableGridX: AreaBumpDefaultProps.enableGridX,
    axisTop: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
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

    isInteractive: true,

    animate: AreaBumpDefaultProps.animate,
    motionConfig: AreaBumpDefaultProps.motionConfig,
}

const Bump = () => {
    return (
        <ComponentTemplate
            name="AreaBump"
            meta={meta.AreaBump}
            icon="area-bump"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={AreaBumpDefaultProps}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveAreaBump
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
