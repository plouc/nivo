import upperFirst from 'lodash/upperFirst.js'
import { ChartProperty, Flavor } from '../../types'

const DEFAULT_POSITIONS = ['top', 'right', 'bottom', 'left']

export const axes = ({
    flavors,
    positions = DEFAULT_POSITIONS,
    exclude = [],
}: {
    flavors: Flavor[]
    positions?: string[]
    exclude?: string[]
}): ChartProperty[] =>
    positions
        .filter(position => !exclude.includes(position))
        .reduce((properties: any[], position) => {
            const axisKey = upperFirst(position)

            return [
                ...properties,
                {
                    key: `axis${axisKey}`,
                    flavors,
                    help: `${axisKey} axis configuration.`,
                    type: 'object',
                    required: false,
                    group: 'Grid & Axes',
                    control: {
                        type: 'object',
                        props: [
                            {
                                key: `enable`,
                                flavors,
                                help: `enable ${axisKey} axis, it's not an actual prop (demo only).`,
                                control: { type: 'switch' },
                                excludeFromDoc: true,
                            },
                            {
                                key: `tickSize`,
                                flavors,
                                help: `${axisKey} axis tick size.`,
                                type: 'number',
                                control: {
                                    type: 'range',
                                    unit: 'px',
                                    min: 0,
                                    max: 20,
                                },
                            },
                            {
                                key: `tickPadding`,
                                flavors,
                                help: `${axisKey} axis tick padding.`,
                                type: 'number',
                                control: {
                                    type: 'range',
                                    unit: 'px',
                                    min: 0,
                                    max: 20,
                                },
                            },
                            {
                                key: `tickRotation`,
                                flavors,
                                help: `${axisKey} axis tick rotation.`,
                                type: 'number',
                                control: {
                                    type: 'angle',
                                    start: 90,
                                    min: -90,
                                    max: 90,
                                    marker: 'diameter',
                                },
                            },
                            {
                                key: `truncateTickAt`,
                                flavors,
                                help: `${axisKey} prevent the tick from overlapping truncating it`,
                                type: 'number',
                                required: false,
                                control: {
                                    type: 'range',
                                    min: 0,
                                    max: 100,
                                },
                            },
                            {
                                key: `legend`,
                                flavors,
                                help: `${axisKey} axis legend.`,
                                type: 'string',
                                control: { type: 'text' },
                            },
                            {
                                key: `legendOffset`,
                                flavors,
                                help: `${axisKey} axis legend offset from axis.`,
                                type: 'object',
                                control: {
                                    type: 'range',
                                    unit: 'px',
                                    min: -60,
                                    max: 60,
                                },
                            },
                            {
                                key: 'style',
                                flavors,
                                type: `PartialTheme['axis']`,
                                help: `${axisKey} axis style overrides.`,
                                description: `
                                    The theme contains a single style for all axes,
                                    you can use this to override the style of a specific axis.
                                    
                                    Please note that the overrides are applied to the complete
                                    theme object computed internally:
                                    
                                    \`(theme prop <- default theme & inheritance) -> axis <- axis style\`
                                    
                                    You should try to define the style statically, or to memoize it
                                    in case it's dynamic.
                                `,
                            },
                        ],
                    },
                },
            ]
        }, [])
