/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import merge from 'lodash/merge'
import { ResponsiveFunnel, FunnelDefaultProps } from '@nivo/funnel'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/funnel/meta.yml'
import mapper from '../../data/components/funnel/mapper'
import { groups } from '../../data/components/funnel/props'
import { generateLightDataSet } from '../../data/components/funnel/generator'

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },

    direction: FunnelDefaultProps.direction,
    interpolation: FunnelDefaultProps.interpolation,
    shapeBlending: FunnelDefaultProps.shapeBlending,
    spacing: FunnelDefaultProps.spacing,
    valueFormat: { format: '>-.4s', enabled: true },

    colors: { scheme: 'spectral' },
    fillOpacity: FunnelDefaultProps.fillOpacity,

    borderWidth: 20,
    borderColor: FunnelDefaultProps.borderColor,
    borderOpacity: FunnelDefaultProps.borderOpacity,

    enableLabel: FunnelDefaultProps.enableLabel,
    labelColor: { from: 'color', modifiers: [['darker', 3]] },

    enableBeforeSeparators: FunnelDefaultProps.enableBeforeSeparators,
    beforeSeparatorLength: 100,
    beforeSeparatorOffset: 20,
    enableAfterSeparators: FunnelDefaultProps.enableAfterSeparators,
    afterSeparatorLength: 100,
    afterSeparatorOffset: 20,

    isInteractive: true,
    currentPartSizeExtension: 10,
    currentBorderWidth: 40,

    animate: true,
    motionConfig: 'wobbly',
}

const Funnel = () => {
    return (
        <ComponentTemplate
            name="Funnel"
            meta={meta.Funnel}
            icon="funnel"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={FunnelDefaultProps}
            propertiesMapper={mapper}
            generateData={generateLightDataSet}
        >
            {(properties, data, theme, logAction) => (
                <ResponsiveFunnel
                    data={data}
                    {...properties}
                    theme={merge({}, theme, {
                        labels: {
                            text: {
                                fontSize: 14,
                            },
                        },
                    })}
                    onClick={part => {
                        logAction({
                            type: 'click',
                            label: `[part] id: ${part.data.id}, value: ${part.data.value}`,
                            color: part.color,
                            data: part.data,
                        })
                    }}
                />
            )}
        </ComponentTemplate>
    )
}

export default Funnel
