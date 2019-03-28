/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ChordDefaultProps as defaults } from '@nivo/chord'
import { motionProperties, getPropertiesGroupsControls } from '../../../lib/componentProperties'

const props = [
    {
        key: 'matrix',
        scopes: '*',
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
        key: 'keys',
        scopes: '*',
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
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
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
        scopes: ['api'],
        docScopes: '*',
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
        scopes: ['ChordCanvas'],
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
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'padAngle',
        scopes: '*',
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
        scopes: '*',
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
        scopes: '*',
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
    {
        key: 'colors',
        scopes: '*',
        help: 'Defines how to compute arc/ribbon color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'colors',
        group: 'Style',
    },
    {
        key: 'arcOpacity',
        scopes: '*',
        help: 'Arcs opacity.',
        required: false,
        defaultValue: defaults.arcOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'arcBorderWidth',
        scopes: '*',
        help: 'Arcs border width.',
        required: false,
        defaultValue: defaults.arcBorderWidth,
        type: 'number',
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'arcBorderColor',
        scopes: '*',
        help: 'Arcs border color.',
        required: false,
        defaultValue: defaults.arcBorderColor,
        type: 'string | Function',
        controlType: 'color',
        group: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'ribbonOpacity',
        scopes: '*',
        help: 'Ribbons opacity.',
        required: false,
        defaultValue: defaults.ribbonOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'ribbonBorderWidth',
        scopes: '*',
        help: 'Ribbons border width.',
        required: false,
        defaultValue: defaults.ribbonBorderWidth,
        type: 'number',
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'ribbonBorderColor',
        scopes: '*',
        help: 'Ribbons border color.',
        required: false,
        defaultValue: defaults.ribbonBorderColor,
        type: 'string | Function',
        controlType: 'color',
        group: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'enableLabel',
        scopes: '*',
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
        scopes: '*',
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
        scopes: '*',
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
        scopes: '*',
        help: 'Labels color.',
        description: `
            How to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        help: 'Method to compute label text color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.labelTextColor,
        controlType: 'color',
        group: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'isInteractive',
        scopes: ['Chord', 'ChordCanvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'arcHoverOpacity',
        scopes: ['Chord', 'ChordCanvas'],
        help: 'Arc opacity when hover (0~1).',
        required: false,
        defaultValue: defaults.arcHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    {
        key: 'arcHoverOthersOpacity',
        scopes: ['Chord', 'ChordCanvas'],
        help: 'Arc opacity when not hover (0~1).',
        required: false,
        defaultValue: defaults.arcHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    {
        key: 'ribbonHoverOpacity',
        scopes: ['Chord', 'ChordCanvas'],
        help: 'Ribbon opacity when hover (0~1).',
        required: false,
        defaultValue: defaults.ribbonHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    {
        key: 'ribbonHoverOthersOpacity',
        scopes: ['Chord', 'ChordCanvas'],
        help: 'Ribbon opacity when not hover (0~1).',
        required: false,
        defaultValue: defaults.ribbonHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    ...motionProperties(['Chord'], defaults),
]

export const groupsByScope = {
    Chord: getPropertiesGroupsControls(props, 'Chord'),
    ChordCanvas: getPropertiesGroupsControls(props, 'ChordCanvas'),
    api: getPropertiesGroupsControls(props, 'api'),
}
