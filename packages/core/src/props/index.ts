/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as PropTypes from 'prop-types'

/*
declare module '@nivo/core' {
    export type GetColor<T> = (datum: T) => string
    export type Colors = string[] | string
    export interface ColorProps<T> {
        colors?: Colors
        colorBy?: string | GetColor<T>
    }

    export interface Dimensions {
        height: number
        width: number
    }

    export type Box = Partial<{
        bottom: number
        left: number
        right: number
        top: number
    }>

    export type MotionProps = Partial<{
        animate: boolean
        motionDamping: number
        motionStiffness: number
    }>

    export type SvgFillMatcher<T> = (datum: T) => boolean
    export interface SvgDefsAndFill<T> {
        defs?: Array<{
            id: string
            [key: string]: any
        }>
        fill?: Array<{ id: string; match: object | SvgFillMatcher<T> | '*' }>
    }

    export interface CartesianMarkerProps {
        axis: 'x' | 'y'
        value: string | number | Date
        legend?: string
        lineStyle?: Partial<CSSProperties>
        textStyle?: Partial<CSSProperties>
    }

    export function radiansToDegrees(rad: number): number
}
*/

export const scalePropType = PropTypes.shape({
    type: PropTypes.string.isRequired,
    domain: PropTypes.array.isRequired,
    range: PropTypes.array.isRequired,
})

export const marginPropType = PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
}).isRequired

export const motionPropTypes = {
    animate: PropTypes.bool.isRequired,
    motionStiffness: PropTypes.number.isRequired,
    motionDamping: PropTypes.number.isRequired,
}

export const blendModePropType = PropTypes.oneOf([
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
])

export * from './colors'
export * from './curve'
export * from './defs'
export * from './stack'
export * from './treeMap'
