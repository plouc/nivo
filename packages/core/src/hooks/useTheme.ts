/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { merge } from 'lodash'
import { defaultTheme, PartialTheme, Theme } from '../theming'

export const useTheme = (partialTheme: PartialTheme = {}) => {
    return React.useMemo(
        (): Theme => {
            // console.log('MERGE THEME')
            return merge({}, defaultTheme, partialTheme)
        },
        [partialTheme]
    )
}
