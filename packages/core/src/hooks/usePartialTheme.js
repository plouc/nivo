/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { defaultTheme, extendDefaultTheme } from '../theming'

export const usePartialTheme = partialTheme =>
    useMemo(() => extendDefaultTheme(defaultTheme, partialTheme), [partialTheme])
