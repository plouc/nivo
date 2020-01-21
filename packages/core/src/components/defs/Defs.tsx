/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { gradientTypes, LinearGradientSpec } from './gradients'
import { patternTypes, PatternDotsSpec, PatternLinesSpec, PatternSquaresSpec } from './patterns'

export const defsMapping = {
    ...gradientTypes,
    ...patternTypes,
}

export type DefGradientSpec = LinearGradientSpec
const gradientKeys = Object.keys(gradientTypes)
export const isGradientDefSpec = (def: DefSpec): def is DefGradientSpec =>
    gradientKeys.includes(def.type)

export type DefPatternSpec = PatternDotsSpec | PatternLinesSpec | PatternSquaresSpec
const patternKeys = Object.keys(patternTypes)
export const isPatternDefSpec = (def: DefSpec): def is DefPatternSpec =>
    patternKeys.includes(def.type)

export type DefSpec = DefGradientSpec | DefPatternSpec

interface DefsProps {
    defs?: DefSpec[]
}

export const Defs = ({ defs: definitions }: DefsProps) => {
    if (!definitions || definitions.length < 1) {
        return null
    }

    return (
        <defs>
            {definitions.map(({ type, ...def }) => {
                if (defsMapping[type]) {
                    return React.createElement(defsMapping[type] as any, { key: def.id, ...def })
                }

                return null
            })}
        </defs>
    )
}
