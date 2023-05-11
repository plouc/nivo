import { ChartPropertiesGroup, ChartProperty } from '../../../types'

// expands all object properties by default if true,
// this can be useful for debugging.
const OPEN_ALL_BY_DEFAULTS = false

const fontSizeProp: ChartProperty = {
    key: 'fontSize',
    group: 'Theme',
    type: 'number',
    help: 'If unspecified, use the root `text.fontSize` value',
    control: {
        type: 'range',
        min: 6,
        max: 36,
    },
}

const textColorProp: ChartProperty = {
    key: 'fill',
    group: 'Theme',
    type: 'string',
    help: 'If unspecified, use the root `text.fill` value',
    control: { type: 'colorPicker' },
}

const textOutlineWidthProp: ChartProperty = {
    key: 'outlineWidth',
    group: 'Theme',
    type: 'number',
    help: 'If unspecified, use the root `text.outlineWidth` value',
    control: {
        type: 'range',
        min: 0,
        max: 6,
    },
}

const textOutlineColorProp: ChartProperty = {
    key: 'outlineColor',
    group: 'Theme',
    type: 'string',
    help: 'If unspecified, use the root `text.outlineColor` value',
    control: { type: 'colorPicker' },
}

const textProp: ChartProperty = {
    key: 'text',
    group: 'Theme',
    type: 'object',
    control: {
        type: 'object',
        isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
        props: [fontSizeProp, textColorProp, textOutlineWidthProp, textOutlineColorProp],
    },
}

const baseProps: ChartPropertiesGroup = {
    name: 'Base',
    properties: [
        {
            group: 'Theme',
            key: 'background',
            name: 'background',
            type: 'string',
            help: 'main background color.',
            control: { type: 'colorPicker' },
        },
        {
            key: 'text',
            name: 'text',
            group: 'Theme',
            type: 'object',
            help: 'Default text style.',
            control: {
                type: 'object',
                isOpenedByDefault: true,
                props: [
                    {
                        ...fontSizeProp,
                        help: 'Main font size, used as a default value when unspecified in nested properties.',
                    },
                    {
                        ...textColorProp,
                        help: 'Main text color, used as a default value when unspecified in nested properties.',
                    },
                    {
                        ...textOutlineWidthProp,
                        help: 'Main text outline width, used as a default value when unspecified in nested properties.',
                    },
                    {
                        ...textOutlineColorProp,
                        help: 'Main text outline color, used as a default value when unspecified in nested properties.',
                    },
                ],
            },
        },
    ],
}

const axesAndGridProps: ChartPropertiesGroup = {
    name: 'Axes & Grid',
    properties: [
        {
            group: 'Theme',
            key: 'axis',
            name: 'axis',
            type: 'object',
            control: {
                type: 'object',
                isOpenedByDefault: true,
                props: [
                    {
                        key: 'ticks',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [
                                {
                                    key: 'line',
                                    type: 'object',
                                    control: {
                                        type: 'object',
                                        isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                                        props: [
                                            {
                                                key: 'strokeWidth',
                                                type: 'number',
                                                control: { type: 'lineWidth' },
                                            },
                                            {
                                                key: 'stroke',
                                                type: 'string',
                                                control: { type: 'colorPicker' },
                                            },
                                        ],
                                    },
                                },
                                textProp,
                            ],
                        },
                    },
                    {
                        key: 'domain',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [
                                {
                                    key: 'line',
                                    type: 'object',
                                    control: {
                                        type: 'object',
                                        isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                                        props: [
                                            {
                                                key: 'strokeWidth',
                                                type: 'number',
                                                control: { type: 'lineWidth' },
                                            },
                                            {
                                                key: 'stroke',
                                                type: 'string',
                                                control: { type: 'colorPicker' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        key: 'legend',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [textProp],
                        },
                    },
                ],
            },
        },
        {
            group: 'Theme',
            key: 'grid',
            name: 'grid',
            type: 'object',
            control: {
                type: 'object',
                isOpenedByDefault: true,
                props: [
                    {
                        key: 'line',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [
                                {
                                    key: 'stroke',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'strokeWidth',
                                    type: 'number',
                                    control: { type: 'lineWidth' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
}

const legendsProps: ChartPropertiesGroup = {
    name: 'Legends',
    properties: [
        {
            group: 'Theme',
            key: 'legends',
            name: 'legends',
            type: 'object',
            control: {
                type: 'object',
                isOpenedByDefault: true,
                props: [
                    {
                        key: 'title',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [textProp],
                        },
                    },
                    textProp,
                    {
                        key: 'ticks',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [],
                        },
                    },
                ],
            },
        },
    ],
}

const annotationsProps: ChartPropertiesGroup = {
    name: 'Annotations',
    properties: [
        {
            group: 'Theme',
            key: 'annotations',
            name: 'annotations',
            type: 'object',
            control: {
                type: 'object',
                isOpenedByDefault: true,
                props: [
                    {
                        key: 'text',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [
                                fontSizeProp,
                                {
                                    key: 'outlineWidth',
                                    type: 'number',
                                    control: { type: 'lineWidth' },
                                },
                                {
                                    key: 'outlineColor',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'outlineOpacity',
                                    type: 'number',
                                    control: { type: 'opacity' },
                                },
                            ],
                        },
                    },
                    {
                        key: 'link',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [
                                {
                                    key: 'stroke',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'strokeWidth',
                                    type: 'number',
                                    control: { type: 'lineWidth' },
                                },
                                {
                                    key: 'outlineWidth',
                                    type: 'number',
                                    control: { type: 'lineWidth' },
                                },
                                {
                                    key: 'outlineColor',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'outlineOpacity',
                                    type: 'number',
                                    control: { type: 'opacity' },
                                },
                            ],
                        },
                    },
                    {
                        key: 'outline',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [
                                {
                                    key: 'stroke',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'strokeWidth',
                                    type: 'number',
                                    control: { type: 'lineWidth' },
                                },
                                {
                                    key: 'outlineWidth',
                                    type: 'number',
                                    control: { type: 'lineWidth' },
                                },
                                {
                                    key: 'outlineColor',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'outlineOpacity',
                                    type: 'number',
                                    control: { type: 'opacity' },
                                },
                            ],
                        },
                    },
                    {
                        key: 'symbol',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [
                                {
                                    key: 'fill',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'outlineWidth',
                                    type: 'number',
                                    control: { type: 'lineWidth' },
                                },
                                {
                                    key: 'outlineColor',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'outlineOpacity',
                                    type: 'number',
                                    control: { type: 'opacity' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
}

const tooltipProps: ChartPropertiesGroup = {
    name: 'Tooltip',
    properties: [
        {
            group: 'Theme',
            key: 'tooltip',
            name: 'tooltip',
            type: 'object',
            control: {
                type: 'object',
                isOpenedByDefault: true,
                props: [
                    {
                        key: 'container',
                        type: 'object',
                        control: {
                            type: 'object',
                            isOpenedByDefault: OPEN_ALL_BY_DEFAULTS,
                            props: [
                                {
                                    key: 'background',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                {
                                    key: 'color',
                                    type: 'string',
                                    control: { type: 'colorPicker' },
                                },
                                fontSizeProp,
                            ],
                        },
                    },
                ],
            },
        },
    ],
}

export const themeProps: ChartPropertiesGroup[] = [
    baseProps,
    axesAndGridProps,
    legendsProps,
    annotationsProps,
    tooltipProps,
]
