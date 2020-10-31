/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { get, isPlainObject } from 'lodash'
import { scaleOrdinal } from 'd3-scale'
import {
    colorSchemes,
    isCategoricalColorScheme,
    isSequentialColorScheme,
    isDivergingColorScheme,
    ColorSchemeId,
} from './schemes'

/**
 * Static color.
 */
export type OrdinalColorScalePlain = string

/**
 * User defined function, receiving the current datum.
 */
export type OrdinalColorScaleFunction<Datum> = (d: Datum) => string

/**
 * Pre-defined color scheme.
 */
export interface OrdinalColorScaleScheme {
    scheme: ColorSchemeId
    // size is useful for diverging & sequential colors,
    // as they are array of array, whereas categorical colors
    // are simple arrays, if the size isn't specified,
    // the bigger array will be selected, this means the 11th
    // for diverging colors and 9th for sequential ones.
    size?: number
}

const isOrdinalColorScaleScheme = (
    instruction: OrdinalColorScale<any>
): instruction is OrdinalColorScaleScheme => {
    return (instruction as OrdinalColorScaleScheme).scheme !== undefined
}

/**
 * User defined colors.
 */
export type OrdinalColorScaleCustomColors = string[]

/**
 * Get color from datum.
 */
export interface OrdinalColorScaleDatumColor {
    datum: string
}

const isOrdinalColorScaleDatumColor = <Datum>(
    instruction: OrdinalColorScale<Datum>
): instruction is OrdinalColorScaleDatumColor => {
    return (instruction as OrdinalColorScaleDatumColor).datum !== undefined
}

export type OrdinalColorScale<Datum> =
    | OrdinalColorScalePlain
    | OrdinalColorScaleFunction<Datum>
    | OrdinalColorScaleScheme
    | OrdinalColorScaleCustomColors
    | OrdinalColorScaleDatumColor

export type DatumIdentityAccessor<Datum> = (datum: Datum) => string | number

export type OrdinalColorScaleGenerator<Datum> = (d: Datum) => string

/**
 * Compute an ordinal color scale
 */
export const getOrdinalColorScale = <Datum = any>(
    instruction: OrdinalColorScale<Datum>,
    identity?: string | DatumIdentityAccessor<Datum>
): OrdinalColorScaleGenerator<Datum> => {
    // user defined function
    if (typeof instruction === 'function') {
        return instruction
    }

    // compute accessor to the datum identity
    const getIdentity =
        typeof identity === 'function' ? identity : (d: Datum) => get(d, identity as string)

    // user defined color array
    if (Array.isArray(instruction)) {
        const scale = scaleOrdinal(instruction)
        const generator: any = (d: Datum) => scale(getIdentity(d))
        generator.scale = scale

        return generator as OrdinalColorScaleGenerator<Datum>
    }

    if (isPlainObject(instruction)) {
        // use color from current datum
        if (isOrdinalColorScaleDatumColor<Datum>(instruction)) {
            return (d: Datum) => get(d, instruction.datum)
        }

        // ordinal scale from predefined scheme
        if (isOrdinalColorScaleScheme(instruction)) {
            // categorical color scheme
            if (isCategoricalColorScheme(instruction.scheme)) {
                const scale = scaleOrdinal(colorSchemes[instruction.scheme])
                const generator: any = (d: Datum) => scale(getIdentity(d))
                generator.scale = scale

                return generator as OrdinalColorScaleGenerator<Datum>
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
                const generator: any = (d: Datum) => scale(getIdentity(d))
                generator.scale = scale

                return generator as OrdinalColorScaleGenerator<Datum>
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
                const generator: any = (d: Datum) => scale(getIdentity(d))
                generator.scale = scale

                return generator as OrdinalColorScaleGenerator<Datum>
            }
        }

        throw new Error(
            `Invalid colors, when using an object, you should either pass a 'datum' or a 'scheme' property`
        )
    }

    return () => instruction as string
}

export const useOrdinalColorScale = <Datum = any>(
    instruction: OrdinalColorScale<Datum>,
    identity: string | DatumIdentityAccessor<Datum>
) => {
    return useMemo(() => {
        return getOrdinalColorScale<Datum>(instruction, identity)
    }, [instruction, identity])
}
