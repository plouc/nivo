/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import dedent from 'dedent-js'
import { SankeyDefaultProps as defaults, sankeyAlignmentPropKeys } from '@nivo/sankey'
import { marginProperties, motionProperties } from '../../../lib/componentProperties'

const alignOptions = []
sankeyAlignmentPropKeys.forEach((align, i) => {
    alignOptions.push(<code key={align}>'{align}'</code>)
    if (i < sankeyAlignmentPropKeys.length - 1) {
        alignOptions.push(<span key={`${align}.comma`}>,&nbsp;</span>)
    }
})

export default [
    {
        key: 'data',
        scopes: '*',
        description: (
            <div>
                Chart data, which must conform to this structure:
                <pre className="code code-block">
                    {dedent`
                        {
                            nodes: Array.<{
                                id: {string|number}
                            }>,
                            links: Array.<{
                                source: {string|number}, // ref to node id
                                target: {string|number}, // ref to node id
                                value: {number}
                            }}>
                        }
                    `}
                </pre>
            </div>
        ),
        type: '{Object}',
        required: true,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveSankey&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart width.',
        type: '{number}',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
            step: 5,
        },
    },
    {
        key: 'height',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveSankey&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart height.',
        type: '{number}',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
            step: 5,
        },
    },
    {
        key: 'layout',
        scopes: ['Sankey'],
        description: `Layout, must be one of: 'horizontal', 'vertical'.`,
        type: '{string}',
        required: false,
        default: defaults.layout,
        controlType: 'radio',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'align',
        scopes: '*',
        description: (
            <span>
                Defines node alignment method. Must be one of: {alignOptions}, Please have a look at
                the{' '}
                <a
                    href="https://github.com/d3/d3-sankey#sankey_nodeAlign"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    official d3 documentation
                </a>{' '}
                for further information.
            </span>
        ),
        help: 'Node alignment method.',
        type: '{string}',
        required: false,
        default: defaults.align,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: sankeyAlignmentPropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'sort',
        scopes: ['Sankey'],
        description: (
            <div>
                Defines node sorting method. Must be one of:
                <ul>
                    <li>
                        <code className="code-string">'auto'</code> order of nodes within each
                        column is determined automatically by the layout.
                    </li>
                    <li>
                        <code className="code-string">'input'</code> order is fixed by the input.
                    </li>
                    <li>
                        <code className="code-string">'ascending'</code> node with lower values on
                        top.
                    </li>
                    <li>
                        <code className="code-string">'descending'</code> node with higher values on
                        top.
                    </li>
                    <li>
                        <code>(nodeA, nodeB) => number</code> user defined function.
                    </li>
                </ul>
                Please have a look at the{' '}
                <a
                    href="https://github.com/d3/d3-sankey#sankey_nodeSort"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    official d3 documentation
                </a>{' '}
                for further information.
            </div>
        ),
        help: 'Node sorting method.',
        type: '{string|Function}',
        required: false,
        default: defaults.sort,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: ['auto', 'input', 'ascending', 'descending'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'colors',
        scopes: '*',
        description: 'Defines how to compute nodes color.',
        type: '{string|Function|Array}',
        required: false,
        default: 'nivo',
        controlType: 'colors',
        controlGroup: 'Base',
    },
    {
        key: 'nodeThickness',
        scopes: ['Sankey'],
        description: 'Node thickness (px).',
        required: false,
        default: defaults.nodeThickness,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 100,
        },
    },
    {
        key: 'nodeOpacity',
        scopes: '*',
        description: 'Node opacity (0~1).',
        required: false,
        default: defaults.nodeOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Nodes',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'nodeHoverOpacity',
        scopes: ['Sankey'],
        description: 'Node opacity on hover (0~1).',
        required: false,
        default: defaults.nodeHoverOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Nodes',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'nodeSpacing',
        scopes: ['Sankey'],
        description: 'Spacing between nodes at an identical level (px).',
        required: false,
        default: defaults.nodeSpacing,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'nodeInnerPadding',
        scopes: ['Sankey'],
        description: 'Node inner padding, distance from link, substracted from nodeThickness (px).',
        required: false,
        default: defaults.nodePaddingX,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'nodeBorderWidth',
        scopes: '*',
        description: 'Node border width (px).',
        required: false,
        default: defaults.nodeBorderWidth,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    {
        key: 'nodeBorderColor',
        scopes: '*',
        description: (
            <span>
                how to compute node border color,{' '}
                <Link to="/guides/colors">see dedicated documentation</Link>.
            </span>
        ),
        help: 'Method to compute node border color.',
        type: '{string|Function}',
        required: false,
        default: defaults.nodeBorderColor,
        controlType: 'color',
        controlGroup: 'Nodes',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'linkOpacity',
        scopes: '*',
        description: 'Link opacity (0~1).',
        required: false,
        default: defaults.linkOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Links',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'linkHoverOpacity',
        scopes: ['Sankey'],
        description: 'Link opacity on hover(0~1).',
        required: false,
        default: defaults.linkHoverOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Links',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'linkContract',
        scopes: '*',
        description: 'Contract link width (px).',
        required: false,
        default: defaults.linkContract,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Links',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'linkBlendMode',
        scopes: ['Sankey'],
        description: (
            <span>
                Defines CSS <code>mix-blend-mode</code> property for links, see{' '}
                <a
                    href="https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    MDN documentation
                </a>
                .
            </span>
        ),
        type: '{string}',
        required: false,
        default: defaults.linkBlendMode,
        controlType: 'choices',
        controlGroup: 'Links',
        controlOptions: {
            choices: [
                'normal',
                'multiply',
                'screen',
                'overlay',
                'darken',
                'lighten',
                'color-dodge',
                'color-burn',
                'hard-light',
                'soft-light',
                'difference',
                'exclusion',
                'hue',
                'saturation',
                'color',
                'luminosity',
            ].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'enableLinkGradient',
        scopes: ['Sankey'],
        description: 'Enable/disable gradient from source/target nodes instead of plain color.',
        type: '{boolean}',
        required: false,
        default: defaults.enableLinkGradient,
        controlType: 'switch',
        controlGroup: 'Links',
    },
    {
        key: 'enableLabels',
        scopes: '*',
        description: 'Enable/disable labels.',
        type: '{boolean}',
        required: false,
        default: defaults.enableLabels,
        controlType: 'switch',
        controlGroup: 'Labels',
    },
    {
        key: 'labelPosition',
        scopes: '*',
        description: 'Label position.',
        type: '{string}',
        required: false,
        default: defaults.labelPosition,
        controlType: 'radio',
        controlGroup: 'Labels',
        controlOptions: {
            choices: ['inside', 'outside'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'labelPadding',
        scopes: '*',
        description: 'Label padding from node (px).',
        required: false,
        default: defaults.labelPadding,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'labelTextColor',
        scopes: '*',
        description: (
            <span>
                how to compute label text color,{' '}
                <Link to="/guides/colors">see dedicated documentation</Link>.
            </span>
        ),
        help: 'Method to compute label text color.',
        type: '{string|Function}',
        required: false,
        default: defaults.labelTextColor,
        controlType: 'color',
        controlGroup: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'labelOrientation',
        scopes: '*',
        description: 'Label orientation.',
        type: '{string}',
        required: false,
        default: defaults.labelOrientation,
        controlType: 'radio',
        controlGroup: 'Labels',
        controlOptions: {
            choices: ['horizontal', 'vertical'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    ...marginProperties,
    {
        key: 'isInteractive',
        scopes: ['Sankey'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    ...motionProperties(['Sankey'], defaults),
]
