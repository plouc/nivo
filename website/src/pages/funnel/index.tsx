import React from 'react'
import merge from 'lodash/merge'
import { ResponsiveFunnel, svgDefaultProps } from '@nivo/funnel'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
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

    direction: svgDefaultProps.direction,
    interpolation: svgDefaultProps.interpolation,
    shapeBlending: svgDefaultProps.shapeBlending,
    spacing: svgDefaultProps.spacing,
    valueFormat: { format: '>-.4s', enabled: true },

    colors: { scheme: 'spectral' },
    fillOpacity: svgDefaultProps.fillOpacity,

    borderWidth: 20,
    borderColor: svgDefaultProps.borderColor,
    borderOpacity: svgDefaultProps.borderOpacity,

    enableLabel: svgDefaultProps.enableLabel,
    labelColor: { from: 'color', modifiers: [['darker', 3]] },

    enableBeforeSeparators: svgDefaultProps.enableBeforeSeparators,
    beforeSeparatorLength: 100,
    beforeSeparatorOffset: 20,
    enableAfterSeparators: svgDefaultProps.enableAfterSeparators,
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
            defaultProperties={svgDefaultProps}
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
