import { ChartProperty } from '../../../types'
import { ScaleConfigAttr } from './types'

export const SCALES_CONFIG_ATTRS: Record<string, Omit<ScaleConfigAttr, 'defaultValue'>> = {
    min: {
        key: 'min',
        type: `number | 'auto'`,
        description: `Minimum value, if \`auto\`, it's inferred from the data.`,
    },
    max: {
        key: 'max',
        type: `number | 'auto'`,
        description: `Maximum value, if \`auto\`, it's inferred from the data.`,
    },
    nice: {
        key: 'nice',
        type: `boolean`,
        description: `Expands the values to “round” human-friendly values.`,
    },
    round: {
        key: 'round',
        type: `boolean`,
        description: `Round the output values to the nearest integer (e.g. x/y position).`,
    },
    reverse: {
        key: 'reverse',
        type: `boolean`,
        description: `Reverse the scale output range (e.g. x/y position).`,
    },
    clamp: {
        key: 'clamp',
        type: `boolean`,
        description: `For any input outside the domain, clamp the output to the nearest endpoint.`,
    },
}

export const SCALES_CONFIG_PROPS: Record<string, ChartProperty> = {
    min: {
        group: 'scale',
        name: SCALES_CONFIG_ATTRS.min.key,
        key: SCALES_CONFIG_ATTRS.min.key,
        type: SCALES_CONFIG_ATTRS.min.type,
        help: SCALES_CONFIG_ATTRS.min.description,
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 0,
            min: -1000,
            max: -1,
        },
    },
    max: {
        group: 'scale',
        name: SCALES_CONFIG_ATTRS.max.key,
        key: SCALES_CONFIG_ATTRS.max.key,
        type: SCALES_CONFIG_ATTRS.max.type,
        help: SCALES_CONFIG_ATTRS.max.description,
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 0,
            min: 1,
            max: 1000,
        },
    },
    nice: {
        group: 'scale',
        name: SCALES_CONFIG_ATTRS.nice.key,
        key: SCALES_CONFIG_ATTRS.nice.key,
        help: SCALES_CONFIG_ATTRS.nice.description,
        type: SCALES_CONFIG_ATTRS.nice.type,
        control: {
            type: 'switch',
        },
    },
    round: {
        group: 'scale',
        name: SCALES_CONFIG_ATTRS.round.key,
        key: SCALES_CONFIG_ATTRS.round.key,
        help: SCALES_CONFIG_ATTRS.round.description,
        type: SCALES_CONFIG_ATTRS.round.type,
        control: {
            type: 'switch',
        },
    },
    reverse: {
        group: 'scale',
        name: SCALES_CONFIG_ATTRS.reverse.key,
        key: SCALES_CONFIG_ATTRS.reverse.key,
        help: SCALES_CONFIG_ATTRS.reverse.description,
        type: SCALES_CONFIG_ATTRS.reverse.type,
        control: {
            type: 'switch',
        },
    },
    clamp: {
        group: 'scale',
        name: SCALES_CONFIG_ATTRS.clamp.key,
        key: SCALES_CONFIG_ATTRS.clamp.key,
        help: SCALES_CONFIG_ATTRS.clamp.description,
        type: SCALES_CONFIG_ATTRS.clamp.type,
        control: {
            type: 'switch',
        },
    },
}
