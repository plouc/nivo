import { NetworkDefaultProps } from '@nivo/network'
import { motionProperties, groupProperties } from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'width',
        group: 'Base',
        help: 'Chart width.',
        description: `
            Not required if using responsive component.
        `,
        type: 'number',
        required: true,
        flavors: ['svg', 'canvas'],
        enableControlForFlavors: ['api'],
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        group: 'Base',
        help: 'Chart height.',
        description: `
            Not required if using responsive component.
        `,
        type: 'number',
        required: true,
        flavors: ['svg', 'canvas'],
        enableControlForFlavors: ['api'],
        controlType: 'range',
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
        required: false,
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
        required: false,
        help: 'Chart margin.',
        flavors: ['svg', 'canvas'],
        controlType: 'margin',
    },
    {
        key: 'linkDistance',
        group: 'Simulation',
        type: 'number | string | (link: Link) => number',
        required: false,
        help: `Control links' distance.`,
        flavors: ['svg', 'canvas'],
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
        required: false,
        help: 'Control how nodes repel each other.',
        description: `
            This value will also affect the strength
            of \`distanceMin\` and \`distanceMax\`.
        `,
        flavors: ['svg', 'canvas'],
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
        required: false,
        help: 'Sets the minimum distance between nodes for the many-body force.',
        flavors: ['svg', 'canvas'],
        defaultValue: NetworkDefaultProps.distanceMin,
    },
    {
        key: 'distanceMax',
        group: 'Simulation',
        type: 'number',
        required: false,
        help: 'Sets the maximum disteance between nodes for the many-body force.',
        flavors: ['svg', 'canvas'],
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
        required: false,
        defaultValue: NetworkDefaultProps.iterations,
        flavors: ['svg', 'canvas'],
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
        required: false,
        help: `Control nodes' color.`,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'nodeBorderWidth',
        group: 'Nodes',
        type: 'number | (node: Node) => number',
        required: false,
        help: `Control nodes' border width.`,
        defaultValue: NetworkDefaultProps.nodeBorderWidth,
        flavors: ['svg', 'canvas'],
        controlType: 'lineWidth',
    },
    {
        key: 'nodeBorderColor',
        group: 'Nodes',
        type: 'string | object | (link: Link) => string',
        required: false,
        help: `Control nodes' border color.`,
        defaultValue: NetworkDefaultProps.nodeBorderColor,
        flavors: ['svg', 'canvas'],
        controlType: 'inheritedColor',
    },
    {
        key: 'linkThickness',
        enableControlForFlavors: ['canvas'],
        group: 'Links',
        type: 'number | (link: Link) => number',
        required: false,
        help: `Control links' thickness.`,
        flavors: ['svg', 'canvas'],
        defaultValue: NetworkDefaultProps.linkThickness,
        controlType: 'lineWidth',
    },
    {
        key: 'linkColor',
        group: 'Links',
        type: 'string | (link: Link) => string',
        required: false,
        help: `Control links' color.`,
        defaultValue: NetworkDefaultProps.linkColor,
        flavors: ['svg', 'canvas'],
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
        flavors: ['svg', 'canvas'],
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the node's data.
        `,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        help: 'onClick handler.',
        type: '(node, event) => void',
        required: false,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'layers',
        type: `('links' | 'nodes')[] | FunctionComponent<LayerProps>`,
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        required: false,
        defaultValue: NetworkDefaultProps.layers,
        flavors: ['svg', 'canvas'],
    },
    ...motionProperties(['svg'], NetworkDefaultProps),
]

export const groups = groupProperties(props)
