/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveWaffleHtml, WaffleDefaultProps } from '@nivo/waffle'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle/meta.yml'
import { groups } from '../../data/components/waffle/props'
import mapper from '../../data/components/waffle/mapper'

const generateData = () => [
    {
        id: 'men',
        label: 'men',
        value: Math.random() * 33,
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: Math.random() * 33,
        color: '#ba72ff',
    },
    {
        id: 'children',
        label: 'children',
        value: Math.random() * 33,
        color: '#a1cfff',
    },
]

const initialProperties = {
    total: 100,

    rows: 18,
    columns: 14,
    fillDirection: 'bottom',
    padding: 1,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    cellComponent: 'default',
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: { scheme: 'set2' },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        gamma: [['darker', 0.3]],
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
}

const WaffleHtml = () => {
    return (
        <ComponentTemplate
            name="WaffleHtml"
            meta={meta.WaffleHtml}
            icon="waffle"
            flavors={meta.flavors}
            currentFlavor="html"
            properties={groups}
            propertiesMapper={mapper}
            initialProperties={initialProperties}
            defaultProperties={WaffleDefaultProps}
            codePropertiesMapper={properties => ({
                ...properties,
                cellComponent: properties.cellComponent ? 'CustomCell(props) => (…)' : undefined,
                tooltip: properties.tooltip ? 'CustomTooltip(props) => (…)' : undefined,
            })}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveWaffleHtml
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            let label
                            if (node.data.value !== undefined) {
                                label = `${node.data.label}: ${node.data.value} (position: ${node.position})`
                            } else {
                                label = `empty at position: ${node.position}`
                            }
                            logAction({
                                type: 'click',
                                label: `[cell] ${label}`,
                                color: node.color,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default WaffleHtml
