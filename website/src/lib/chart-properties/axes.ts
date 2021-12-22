import upperFirst from 'lodash/upperFirst'
import { ChartProperty, Flavor } from '../../types'

const positions = [
    {
        position: 'top',
        orientations: ['top', 'bottom'],
    },
    {
        position: 'right',
        orientations: ['left', 'right'],
    },
    {
        position: 'bottom',
        orientations: ['top', 'bottom'],
    },
    {
        position: 'left',
        orientations: ['left', 'right'],
    },
]

export const axes = ({
    flavors,
    exclude = [],
}: {
    flavors: Flavor[]
    exclude?: string[]
}): ChartProperty[] =>
    positions
        .filter(axis => !exclude.includes(axis.position))
        .reduce((properties: any[], { position }) => {
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
                                type: 'number',
                                control: {
                                    type: 'range',
                                    unit: 'px',
                                    min: -60,
                                    max: 60,
                                },
                            },
                        ],
                    },
                },
            ]
        }, [])
