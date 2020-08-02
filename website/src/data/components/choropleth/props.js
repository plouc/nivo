/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { GeoMapDefaultProps, ChoroplethDefaultProps } from '@nivo/geo'
import { themeProperty, getLegendsProps, groupProperties } from '../../../lib/componentProperties'
import { props as geoProps } from '../geo/props'

const props = [
    ...geoProps,
    {
        key: 'label',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: 'Label accessor.',
        description: `
            Accessor to label, if a string is provided,
            the value will be retrieved using it as
            a key, if it's a function, it's its responsibility
            to return the label.
        `,
        defaultValue: ChoroplethDefaultProps.label,
    },
    {
        key: 'value',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: 'Value accessor.',
        description: `
            Accessor to data value, if a string is provided,
            the value will be retrieved using
            it as a key, if it's a function, it's its responsibility
            to return the value.
        `,
        defaultValue: ChoroplethDefaultProps.value,
    },
    {
        key: 'valueFormat',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: 'Value formatter.',
        description: `
            Optional formatting of values, if provided, it will
            be used for labels/tooltips. You can either pass
            a function which will receive the node's data
            and must return the formatted value, or a string
            which will be used as a directive for
            [d3-format](https://github.com/d3/d3-format).
        `,
        defaultValue: ChoroplethDefaultProps.value,
    },
    {
        key: 'domain',
        help: 'Defines uppper and lower bounds of color shading',
        description: `
            The Domain prop is a required two element array that
            defines the minimum and maximum values for the color shading
            of the Choropleth. The minimum and maximum provided should
            roughly match, or be slightly outside of the minimum and
            maximum values in your data.
        `,
        type: 'number[]',
        required: true,
        group: 'Base',
    },
    {
        key: 'colors',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: 'nivo',
        controlType: 'quantizeColors',
        group: 'Style',
    },
    {
        key: 'unknownColor',
        help: 'Defines the color to use for features without value.',
        type: 'string',
        required: false,
        defaultValue: 'nivo',
        controlType: 'colorPicker',
        group: 'Style',
    },
    {
        key: 'layers',
        group: 'Customization',
        type: `Array<'graticule' | 'features' | Function>`,
        required: false,
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`graticule\`, \`features\`.

            You can also use this to insert extra layers
            to the chart, this extra layer must be
            a function which will receive the chart
            computed data and must return a valid SVG
            element for the SVG implementation or receive
            a Canvas 2d context for the canvas
            one. Custom layers will also receive the
            computed data/projection.
        `,
        defaultValue: GeoMapDefaultProps.layers,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component.',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the node's data.
        `,
    },
    {
        key: 'custom tooltip example',
        excludeFromDoc: true,
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'legends',
        type: '{Array<object>}',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            defaults: {
                anchor: 'center',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                            itemBackground: '#f7fafb',
                        },
                    },
                ],
            },
        },
    },
]

export const groups = groupProperties(props)
