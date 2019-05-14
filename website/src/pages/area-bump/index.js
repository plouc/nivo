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
import random from 'lodash/random'
import { ResponsiveAreaBump, AreaBumpDefaultProps } from '@nivo/bump'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/area-bump/meta.yml'
import { groups } from '../../data/components/area-bump/props'

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
    borderWidth: AreaBumpDefaultProps.borderWidth,
    activeBorderWidth: AreaBumpDefaultProps.activeBorderWidth,
    inactiveBorderWidth: AreaBumpDefaultProps.inactiveBorderWidth,
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

    isInteractive: true,

    animate: AreaBumpDefaultProps.animate,
    motionStiffness: AreaBumpDefaultProps.motionStiffness,
    motionDamping: AreaBumpDefaultProps.motionDamping,
}

const Bump = () => {
    return (
        <ComponentTemplate
            name="AreaBump"
            meta={meta.AreaBump}
            icon="bump"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={AreaBumpDefaultProps}
            initialProperties={initialProperties}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return <ResponsiveAreaBump data={data} {...properties} theme={theme} />
            }}
        </ComponentTemplate>
    )
}

export default Bump
