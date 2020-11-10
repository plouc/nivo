import { useMemo } from 'react'
import { get, isPlainObject } from 'lodash'
import { scaleOrdinal } from 'd3-scale'
import {
    ColorSchemeId,
    colorSchemes,
    isCategoricalColorScheme,
    isSequentialColorScheme,
    isDivergingColorScheme,
} from './schemes'

/**
 * Static color.
 */
export type OrdinalColorScaleConfigStaticColor = string

/**
 * User defined function, receiving the current datum.
 */
export type OrdinalColorScaleConfigCustomFunction<Datum> = (d: Datum) => string

/**
 * Pre-defined color scheme.
 */
export interface OrdinalColorScaleConfigScheme {
    scheme: ColorSchemeId
    // size is useful for diverging & sequential colors,
    // as they are array of array, whereas categorical colors
    // are simple arrays, if the size isn't specified,
    // the bigger array will be selected, this means the 11th
    // for diverging colors and 9th for sequential ones.
    size?: number
}

/**
 * User defined colors.
 */
export type OrdinalColorScaleConfigCustomColors = string[]

/**
 * Get color from datum.
 */
export interface OrdinalColorScaleConfigDatumProperty {
    // path to the color property
    datum: string
}

export type OrdinalColorScaleConfig<Datum = any> =
    | OrdinalColorScaleConfigStaticColor
    | OrdinalColorScaleConfigCustomFunction<Datum>
    | OrdinalColorScaleConfigScheme
    | OrdinalColorScaleConfigCustomColors
    | OrdinalColorScaleConfigDatumProperty

const isOrdinalColorScaleConfigScheme = <Datum>(
    config: OrdinalColorScaleConfig<Datum>
): config is OrdinalColorScaleConfigScheme => {
    return (config as OrdinalColorScaleConfigScheme).scheme !== undefined
}

const isOrdinalColorScaleConfigDatumProperty = <Datum>(
    config: OrdinalColorScaleConfig<Datum>
): config is OrdinalColorScaleConfigDatumProperty => {
    return (config as OrdinalColorScaleConfigDatumProperty).datum !== undefined
}

export type DatumIdentityAccessor<Datum> = (datum: Datum) => string | number

export type OrdinalColorScale<Datum> = (d: Datum) => string

/**
 * Compute an ordinal color scale
 */
export const getOrdinalColorScale = <Datum = any>(
    config: OrdinalColorScaleConfig<Datum>,
    identity?: string | DatumIdentityAccessor<Datum>
): OrdinalColorScale<Datum> => {
    // user defined function
    if (typeof config === 'function') {
        return config
    }

    // compute accessor to the datum identity
    const getIdentity =
        typeof identity === 'function' ? identity : (datum: Datum) => get(datum, identity as string)

    // user defined color array
    if (Array.isArray(config)) {
        const scale = scaleOrdinal(config)
        const generator = (datum: Datum) => scale(getIdentity(datum))
        generator.scale = scale

        return generator as OrdinalColorScale<Datum>
    }

    if (isPlainObject(config)) {
        // use color from current datum
        if (isOrdinalColorScaleConfigDatumProperty(config)) {
            return (datum: Datum) => get(datum, config.datum)
        }

        // ordinal scale from predefined scheme
        if (isOrdinalColorScaleConfigScheme(config)) {
            // categorical color scheme
            if (isCategoricalColorScheme(config.scheme)) {
                const scale = scaleOrdinal(colorSchemes[config.scheme])
                const generator = (datum: Datum) => scale(getIdentity(datum))
                generator.scale = scale

                return generator as OrdinalColorScale<Datum>
            }

            // Diverging color schemes support a size k ranging from 3 to 11
            if (isDivergingColorScheme(config.scheme)) {
                if (config.size !== undefined && (config.size < 3 || config.size > 11)) {
                    throw new Error(
                        `Invalid size '${config.size}' for diverging color scheme '${config.scheme}', must be between 3~11`
                    )
                }

                const scale = scaleOrdinal(colorSchemes[config.scheme][config.size || 11])
                const generator = (d: Datum) => scale(getIdentity(d))
                generator.scale = scale

                return generator as OrdinalColorScale<Datum>
            }

            // Sequential, single-hue color schemes support a size k ranging from 3 to 9.
            // Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
            if (isSequentialColorScheme(config.scheme)) {
                if (config.size !== undefined && (config.size < 3 || config.size > 9)) {
                    throw new Error(
                        `Invalid size '${config.size}' for sequential color scheme '${config.scheme}', must be between 3~9`
                    )
                }

                const scale = scaleOrdinal(colorSchemes[config.scheme][config.size || 9])
                const generator = (d: Datum) => scale(getIdentity(d))
                generator.scale = scale

                return generator as OrdinalColorScale<Datum>
            }
        }

        throw new Error(
            `Invalid colors, when using an object, you should either pass a 'datum' or a 'scheme' property`
        )
    }

    // static color
    return () => config as string
}

export const useOrdinalColorScale = <Datum = any>(
    config: OrdinalColorScaleConfig<Datum>,
    identity: string | DatumIdentityAccessor<Datum>
) => useMemo(() => getOrdinalColorScale<Datum>(config, identity), [config, identity])
