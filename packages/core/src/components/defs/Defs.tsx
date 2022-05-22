/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createElement, memo } from 'react'
import { DefsProps } from './types'
import { patternTypes } from './patterns'
import { gradientTypes } from './gradients'

export const defsMapping = {
    ...gradientTypes,
    ...patternTypes,
}

export const Defs = memo(({ defs: definitions }: DefsProps) => {
    if (!definitions || definitions.length < 1) return null

    return (
        <defs aria-hidden={true}>
            {definitions.map(({ type, ...def }) => {
                if (defsMapping[type])
                    return createElement(defsMapping[type], { key: def.id, ...def })
                return null
            })}
        </defs>
    )
})
