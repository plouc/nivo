/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ChordDefaultProps as defaults } from '@nivo/chord'
import {
    themeProperty,
    motionProperties,
    groupProperties,
    getLegendsProps,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'keys',
        group: 'Base',
        help: 'Keys used to identify each cell in the matrix.',
        description: `
            Keys used to identify each cell in the matrix,
            for example given this matrix:
            \`\`\`
            [ [123, 37,  99 ],
              [75,  103, 82 ],
              [37,  65,  109] ]
            \`\`\`
            and those keys:
            \`\`\`
            ['John', 'Jane', 'Raoul']
            \`\`\`
            it will result in the following mapping:
            \`\`\`
            [ [null,    'John', 'Jane',  'Raoul']
              ['John',   123,    37,      99    ],
              ['Jane',   75,     103,     82    ],
              ['Raoul',  37,     65,      109   ] ]
            \`\`\`
        `,
        required: true,
        type: 'string[]',
    },
    {
        key: 'matrix',
        group: 'Base',
        help: 'The matrix used to compute the chord diagram.',
        description: `
            The matrix used to compute the chord diagram,
            it must be a square matrix, meaning each row length
            must equal the row count.
        `,
        required: true,
        type: 'Array<number[]>',
    },
    {
        key: 'valueFormat',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: `Optional value formatter.`,
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveChord/>\`.
            Also note that width does not include labels,
            so you should add enough margin to display them.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        enableControlForFlavors: ['api'],
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveChord/>\`.
            Also note that width does not include labels,
            so you should add enough margin to display them.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'pixelRatio',
        flavors: ['canvas'],
        help: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        defaultValue: 'Depends on device',
        type: `number`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    {
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'padAngle',
        help: 'Padding angle.',
        required: false,
        defaultValue: defaults.padAngle,
        type: 'number',
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.01,
        },
    },
    {
        key: 'innerRadiusRatio',
        help: 'Inner radius ratio.',
        required: false,
        defaultValue: defaults.innerRadiusRatio,
        type: 'number',
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.01,
        },
    },
    {
        key: 'innerRadiusOffset',
        help: 'Inner radius offset (minus innerRadiusRatio).',
        required: false,
        defaultValue: defaults.innerRadiusOffset,
        type: 'number',
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.01,
        },
    },
    themeProperty,
    {
        key: 'colors',
        help: 'Defines how to compute arc/ribbon color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'arcOpacity',
        help: 'Arcs opacity.',
        required: false,
        defaultValue: defaults.arcOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'arcBorderWidth',
        help: 'Arcs border width.',
        required: false,
        defaultValue: defaults.arcBorderWidth,
        type: 'number',
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'arcBorderColor',
        help: 'Arcs border color.',
        required: false,
        defaultValue: defaults.arcBorderColor,
        type: 'string | object | Function',
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'ribbonOpacity',
        help: 'Ribbons opacity.',
        required: false,
        defaultValue: defaults.ribbonOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'ribbonBorderWidth',
        help: 'Ribbons border width.',
        required: false,
        defaultValue: defaults.ribbonBorderWidth,
        type: 'number',
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'ribbonBorderColor',
        help: 'Ribbons border color.',
        required: false,
        defaultValue: defaults.ribbonBorderColor,
        type: 'string | object | Function',
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'enableLabel',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabel,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
        help:
            'Defines how to get label text, can be a string (used to access current arc data property) or a function which will receive the actual arc data.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.label,
        controlType: 'choices',
        group: 'Labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id} [\${d.value}]\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'labelOffset',
        help: 'Label offset from arc.',
        required: false,
        defaultValue: defaults.labelOffset,
        type: 'number',
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: -80,
            max: 80,
        },
    },
    {
        key: 'labelRotation',
        help: 'Label rotation.',
        required: false,
        defaultValue: defaults.labelRotation,
        type: 'number',
        controlType: 'angle',
        group: 'Labels',
        controlOptions: {
            min: -180,
            max: 180,
            step: 5,
        },
    },
    {
        key: 'labelTextColor',
        description: `
            How to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        help: 'Method to compute label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.labelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.
            
            The layer function which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`Chord\` component.

            When using the canvas implementation, the function
            will receive the canvas 2d context as first argument
            and the chart's context and computed data as second.

            Please make sure to use \`context.save()\` and
            \`context.restore()\` if you make some global
            modifications to the 2d context inside this function
            to avoid side effects.
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: defaults.layers,
    },
    {
        key: 'isInteractive',
        flavors: ['svg', 'canvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'arcHoverOpacity',
        flavors: ['svg', 'canvas'],
        help: 'Arc opacity when hover (0~1).',
        required: false,
        defaultValue: defaults.arcHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    {
        key: 'arcHoverOthersOpacity',
        flavors: ['svg', 'canvas'],
        help: 'Arc opacity when not hover (0~1).',
        required: false,
        defaultValue: defaults.arcHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    {
        key: 'ribbonHoverOpacity',
        flavors: ['svg', 'canvas'],
        help: 'Ribbon opacity when hover (0~1).',
        required: false,
        defaultValue: defaults.ribbonHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    {
        key: 'ribbonHoverOthersOpacity',
        flavors: ['svg', 'canvas'],
        help: 'Ribbon opacity when not hover (0~1).',
        required: false,
        defaultValue: defaults.ribbonHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    {
        key: 'onArcMouseEnter',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onMouseEnter handler for arcs.',
        type: '(arc, event) => void',
        required: false,
    },
    {
        key: 'onArcMouseMove',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onMouseMove handler for arcs.',
        type: '(arc, event) => void',
        required: false,
    },
    {
        key: 'onArcMouseLeave',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onMouseLeave handler for arcs.',
        type: '(arc, event) => void',
        required: false,
    },
    {
        key: 'onArcClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onClick handler for arcs.',
        type: '(arc, event) => void',
        required: false,
    },
    {
        key: 'arcTooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom arc tooltip component.',
        description: `
            A function allowing complete arc tooltip customisation,
            it must return a valid HTML
            element and will receive the arcs's data.
        `,
    },
    {
        key: 'onRibbonMouseEnter',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onMouseEnter handler for ribbons.',
        type: '(ribbon, event) => void',
        required: false,
    },
    {
        key: 'onRibbonMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onMouseMove handler for ribbons.',
        type: '(ribbon, event) => void',
        required: false,
    },
    {
        key: 'onRibbonMouseLeave',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onMouseLeave handler for ribbons.',
        type: '(ribbon, event) => void',
        required: false,
    },
    {
        key: 'onRibbonClick',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onClick handler for ribbons.',
        type: '(ribbon, event) => void',
        required: false,
    },
    {
        key: 'ribbonTooltip',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom ribbon tooltip component.',
        description: `
            A function allowing complete ribbon tooltip customisation,
            it must return a valid HTML
            element and will receive the ribbon's data.
        `,
    },
    {
        key: 'legends',
        flavors: ['svg', 'canvas'],
        type: 'object[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(['svg', 'canvas']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            defaults: {
                dataFrom: 'keys',
                anchor: 'top-left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
