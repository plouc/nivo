// @ts-ignore
import { GeoMapDefaultProps, ChoroplethDefaultProps } from '@nivo/geo'
import { getLegendsProps, groupProperties } from '../../../lib/componentProperties'
import { props as geoProps } from '../geo/props'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    ...geoProps,
    {
        key: 'label',
        group: 'Base',
        type: 'string | Function',
        required: false,
        flavors: ['svg', 'canvas'],
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
        flavors: ['svg', 'canvas'],
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
        flavors: ['svg', 'canvas'],
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
        flavors: ['svg', 'canvas'],
        group: 'Base',
    },
    {
        key: 'colors',
        group: 'Style',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        flavors: ['svg', 'canvas'],
        defaultValue: 'nivo',
        control: { type: 'quantizeColors' },
    },
    {
        key: 'unknownColor',
        group: 'Style',
        help: 'Defines the color to use for features without value.',
        type: 'string',
        required: false,
        flavors: ['svg', 'canvas'],
        defaultValue: 'nivo',
        control: { type: 'colorPicker' },
    },
    {
        key: 'layers',
        group: 'Customization',
        type: `Array<'graticule' | 'features' | Function>`,
        required: false,
        flavors: ['svg', 'canvas'],
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
        flavors: ['svg', 'canvas'],
        help: 'Custom tooltip component.',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the node's data.
        `,
    },
    {
        key: 'custom tooltip example',
        group: 'Interactivity',
        excludeFromDoc: true,
        required: false,
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        flavors: ['svg', 'canvas'],
        control: { type: 'switch' },
    },
    {
        key: 'legends',
        type: '{Array<object>}',
        help: `Optional chart's legends.`,
        group: 'Legends',
        flavors: ['svg', 'canvas'],
        required: false,
        control: {
            type: 'array',
            props: getLegendsProps(['svg', 'canvas']),
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
                onClick: (data: any) => {
                    console.log(JSON.stringify(data, null, '    '))
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
