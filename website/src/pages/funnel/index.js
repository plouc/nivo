/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveFunnel, FunnelDefaultProps } from '@nivo/funnel'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/funnel/meta.yml'
import { groups } from '../../data/components/funnel/props'
import { generateLightDataSet } from '../../data/components/funnel/generator'

const initialProperties = {
    margin: {
        top: 20,
        right: 120,
        bottom: 20,
        left: 120,
    },

    direction: FunnelDefaultProps.direction,
    interpolation: FunnelDefaultProps.interpolation,
    shapeContinuity: FunnelDefaultProps.shapeContinuity,
    spacing: FunnelDefaultProps.spacing,

    colors: { scheme: 'spectral' },
    fillOpacity: FunnelDefaultProps.fillOpacity,

    borderWidth: 20,
    borderColor: FunnelDefaultProps.borderColor,
    borderOpacity: FunnelDefaultProps.borderOpacity,

    enableBeforeSeparators: FunnelDefaultProps.enableBeforeSeparators,
    beforeSeparatorsLength: 100,
    beforeSeparatorsOffset: 16,
    enableAfterSeparators: FunnelDefaultProps.enableAfterSeparators,
    afterSeparatorsLength: 100,
    afterSeparatorsOffset: 16,

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
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
            generateData={generateLightDataSet}
        >
            {(properties, data, theme, logAction) => (
                <ResponsiveFunnel
                    data={data}
                    {...properties}
                    theme={theme}
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
