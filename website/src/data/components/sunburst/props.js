/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { SunburstDefaultProps as defaults } from '@nivo/sunburst'
import { getPropertiesGroupsControls } from '../../../lib/componentProperties'

const props = [
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: `
            not required if using
            \`<ResponsiveSunburst/>\`.
        `,
        help: 'Chart width.',
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
        description: `
            not required if using
            \`<ResponsiveSunburst/>\`.
        `,
        help: 'Chart height.',
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
        key: 'margin',
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'identity',
        group: 'Base',
        help: 'Id accessor.',
        description: `
            define identity accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            identity (string).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.identity,
    },
    {
        key: 'value',
        group: 'Base',
        help: 'Value accessor',
        description: `
            define value accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            value (number).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.value,
    },
    {
        key: 'colors',
        help: 'Defines how to compute node color.',
        required: false,
        defaultValue: 'nivo',
        controlType: 'colors',
        type: 'string | Function | string[]',
        group: 'Base',
    },
    {
        key: 'colorBy',
        help: `
            Property to use to determine primary node color.
            If a function is provided, it will receive current
            node data and must return a color
        `,
        type: 'string | Function',
        required: false,
        defaultValue: 'id',
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: [
                {
                    label: 'id',
                    value: 'id',
                },
                {
                    label: 'd => d.color',
                    value: 'd => d.color',
                },
            ],
        },
    },
    {
        key: 'childColor',
        help: 'Defines how to compute child nodes color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.childColor,
        controlType: 'color',
        group: 'Base',
    },
    {
        key: 'borderWidth',
        help: 'Node border width.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Base',
    },
    {
        key: 'cornerRadius',
        help: 'Round node shape.',
        type: 'number',
        required: false,
        defaultValue: defaults.cornerRadius,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'isInteractive',
        scopes: ['Sunburst'],
        help: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
]

export const groupsByScope = {
    Sunburst: getPropertiesGroupsControls(props, 'Sunburst'),
    api: getPropertiesGroupsControls(props, 'api'),
}
