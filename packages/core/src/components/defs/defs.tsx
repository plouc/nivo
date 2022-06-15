/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createElement, memo } from 'react'
import { DefSpec, DefsProps } from './types'
import {
    PatternSpec,
    DotPatternSpec,
    LinePatternSpec,
    dotPatternTypes,
    linePatternTypes,
} from './patterns'
import { GradientSpec, gradientTypes } from './gradients'

export const defsMapping = {
    ...gradientTypes,
    ...dotPatternTypes,
    ...linePatternTypes,
}

export const isDefSpec = (def: DefSpec | null | undefined): def is DefSpec => {
    if (!def) return false
    return true
}

export const isGradientSpec = (def: DefSpec | null | undefined): def is GradientSpec => {
    if (!def) return false
    return def.type in gradientTypes
}

export const isPatternSpec = (def: DefSpec | null | undefined): def is PatternSpec => {
    if (!def) return false
    return def.type in dotPatternTypes || def.type in linePatternTypes
}

export const isDotPatternSpec = (def: DefSpec | null | undefined): def is DotPatternSpec => {
    if (!def) return false
    return def.type in dotPatternTypes
}

export const isLinePatternSpec = (def: DefSpec | null | undefined): def is LinePatternSpec => {
    if (!def) return false
    return def.type in linePatternTypes
}

export const Defs = memo(({ defs: definitions }: DefsProps) => {
    if (!definitions || definitions.length < 1) return null

    return (
        <defs aria-hidden={true}>
            {definitions.map(def => {
                if (isDotPatternSpec(def))
                    return createElement(dotPatternTypes[def.type], { key: def.id, ...def })
                if (isLinePatternSpec(def))
                    return createElement(linePatternTypes[def.type], { key: def.id, ...def })
                if (isGradientSpec(def))
                    return createElement(gradientTypes[def.type], { key: def.id, ...def })
                return null
            })}
        </defs>
    )
})
