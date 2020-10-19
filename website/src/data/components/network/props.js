/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { NetworkDefaultProps } from '@nivo/network'
import { motionProperties, groupProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            Not required if using responsive component.
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
            Not required if using responsive component.
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
        group: 'Base',
        type: 'object',
        help: 'Chart margin.',
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'linkDistance',
        group: 'Simulation',
        type: 'number | string | (link: Link) => number',
        help: `Control links' distance.`,
        description: `
            If you set a **number**, this value will be used for all links.

            If you use a **string**, this will be used to pick the distance
            from the corresponding link property, thus, this property
            should exist on each link.

            If you use a **function**, it will receive a link and must return
            the desired distance.
        `,
    },
    {
        key: 'repulsivity',
        group: 'Simulation',
        type: 'number',
        help: 'Control how nodes repel each other.',
        description: `
            This value will also affect the strength
            of \`distanceMin\` and \`distanceMax\`.
        `,
        controlType: 'range',
        controlOptions: {
            min: 1,
            max: 100,
        },
        defaultValue: NetworkDefaultProps.repulsivity,
    },
    {
        key: 'distanceMin',
        group: 'Simulation',
        type: 'number',
        help: 'Sets the minimum distance between nodes for the many-body force.',
        defaultValue: NetworkDefaultProps.distanceMin,
    },
    {
        key: 'distanceMax',
        group: 'Simulation',
        help: 'Sets the maximum distance between nodes for the many-body force.',
        defaultValue: NetworkDefaultProps.distanceMax,
    },
    {
        key: 'iterations',
        group: 'Simulation',
        help: 'Adjust the simulation quality.',
        description: `
            Increasing this number will result in a **more accurate simulation**,
            however it will also involve more computing.
        `,
        type: 'number',
        defaultValue: NetworkDefaultProps.iterations,
        controlType: 'range',
        controlOptions: {
            min: 60,
            max: 260,
        },
    },
    {
        key: 'nodeColor',
        group: 'Nodes',
        type: 'string | (node: Node) => string',
        help: `Control nodes' color.`,
    },
    {
        key: 'nodeBorderWidth',
        group: 'Nodes',
        type: 'number | (node: Node) => number',
        help: `Control nodes' border width.`,
        defaultValue: NetworkDefaultProps.nodeBorderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'nodeBorderColor',
        group: 'Nodes',
        type: 'string | object | (link: Link) => string',
        help: `Control nodes' border color.`,
        defaultValue: NetworkDefaultProps.nodeBorderColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'linkThickness',
        enableControlForFlavors: ['canvas'],
        group: 'Links',
        type: 'number | (link: Link) => number',
        help: `Control links' thickness.`,
        defaultValue: NetworkDefaultProps.linkThickness,
        controlType: 'lineWidth',
    },
    {
        key: 'linkColor',
        group: 'Links',
        type: 'string | (link: Link) => string',
        help: `Control links' color.`,
        defaultValue: NetworkDefaultProps.linkColor,
        controlType: 'inheritedColor',
        controlOptions: {
            inheritableProperties: ['source.color', 'target.color'],
        },
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
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        required: false,
        defaultValue: NetworkDefaultProps.layers,
    },
    ...motionProperties(['svg'], NetworkDefaultProps),
]

export const groups = groupProperties(props)
