import { commonDefaultProps as defaults } from '@nivo/dendogram'
import {
    motionProperties,
    defsProperties,
    groupProperties,
    themeProperty,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    ordinalColors,
    isInteractive,
    commonAccessibilityProps,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'The hierarchical data object.',
        type: 'object',
        required: true,
    },
    {
        key: 'identity',
        group: 'Base',
        flavors: allFlavors,
        help: 'The key or function to use to retrieve nodes identity.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.identity,
    },
    {
        key: 'layout',
        help: 'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        flavors: allFlavors,
        type: 'top-to-bottom | right-to-left | bottom-to-top | left-to-right | radial',
        required: false,
        defaultValue: defaults.layout,
        group: 'Base',
        control: {
            type: 'choices',
            choices: ['top-to-bottom', 'right-to-left', 'bottom-to-top', 'left-to-right'].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(allFlavors),
    // ordinalColors({
    //     flavors: allFlavors,
    //     defaultValue: defaults.colors,
    // }),
    isInteractive({
        flavors: ['svg'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'onMouseEnter',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onMouseEnter handler.',
        required: false,
    },
    {
        key: 'onMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onMouseMove handler.',
        required: false,
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onMouseLeave handler.',
        required: false,
    },
    {
        key: 'onClick',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onClick handler.',
        required: false,
    },
    {
        key: 'nodeTooltip',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onClick handler.',
        required: false,
    },
    {
        key: 'nodeComponent',
        type: 'NodeComponent',
        group: 'Customization',
        help: 'Override the default node component.',
        flavors: ['svg', 'html'],
    },
    {
        key: 'layers',
        type: `('nodes' | CustomSvgLayer | CustomHtmlLayer | CustomCanvasLayer)[]`,
        group: 'Customization',
        help: 'Define layers, please use the appropriate variant for custom layers.',
        defaultValue: defaults.layers,
        flavors: ['svg', 'html', 'canvas'],
    },
    ...commonAccessibilityProps(allFlavors),
    ...motionProperties(['svg', 'html', 'canvas'], defaults),
]

export const groups = groupProperties(props)
