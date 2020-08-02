/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import get from 'lodash.get'
import isPlainObject from 'lodash.isplainobject'
import { scaleOrdinal } from 'd3-scale'
import {
    colorSchemes,
    isCategoricalColorScheme,
    isSequentialColorScheme,
    isDivergingColorScheme,
} from './schemes'

/**
 * Compute an ordinal color scale
 */
export const getOrdinalColorScale = (instruction, identity) => {
    // user defined function
    if (typeof instruction === 'function') return instruction

    // compute accessor to the datum identity
    const getIdentity = typeof identity === 'function' ? identity : d => get(d, identity)

    // user defined color array
    if (Array.isArray(instruction)) {
        const scale = scaleOrdinal(instruction)
        const generator = d => scale(getIdentity(d))
        generator.scale = scale

        return generator
    }

    if (isPlainObject(instruction)) {
        // use color from current datum
        if (instruction.datum !== undefined) {
            return datum => get(datum, instruction.datum)
        }

        // ordinal scale from predefined scheme
        if (instruction.scheme !== undefined) {
            // categorical color scheme
            if (isCategoricalColorScheme(instruction.scheme)) {
                const scale = scaleOrdinal(colorSchemes[instruction.scheme])
                const generator = d => scale(getIdentity(d))
                generator.scale = scale

                return generator
            }

            // Diverging color schemes support a size k ranging from 3 to 11
            if (isDivergingColorScheme(instruction.scheme)) {
                if (
                    instruction.size !== undefined &&
                    (instruction.size < 3 || instruction.size > 11)
                ) {
                    throw new Error(
                        `Invalid size '${instruction.size}' for diverging color scheme '${instruction.scheme}', must be between 3~11`
                    )
                }

                const scale = scaleOrdinal(colorSchemes[instruction.scheme][instruction.size || 11])
                const generator = d => scale(getIdentity(d))
                generator.scale = scale

                return generator
            }

            // Sequential, single-hue color schemes support a size k ranging from 3 to 9.
            // Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
            if (isSequentialColorScheme(instruction.scheme)) {
                if (
                    instruction.size !== undefined &&
                    (instruction.size < 3 || instruction.size > 9)
                ) {
                    throw new Error(
                        `Invalid size '${instruction.size}' for sequential color scheme '${instruction.scheme}', must be between 3~9`
                    )
                }

                const scale = scaleOrdinal(colorSchemes[instruction.scheme][instruction.size || 9])
                const generator = d => scale(getIdentity(d))
                generator.scale = scale

                return generator
            }
        }

        throw new Error(
            `Invalid colors, when using an object, you should either pass a 'datum' or a 'scheme' property`
        )
    }

    return () => instruction
}

export const useOrdinalColorScale = (instruction, identity) =>
    useMemo(() => getOrdinalColorScale(instruction, identity), [instruction, identity])
