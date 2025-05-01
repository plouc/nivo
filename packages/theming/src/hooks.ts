import { useMemo } from 'react'
import { extendDefaultTheme, extendAxisTheme } from './extend'
import { defaultTheme } from './defaults'
import { PartialTheme, Theme } from './types'

export const usePartialTheme = (partialTheme: PartialTheme) => {
    return useMemo(() => extendDefaultTheme(defaultTheme, partialTheme), [partialTheme])
}

export const useExtendedAxisTheme = (axisTheme: Theme['axis'], overrides: PartialTheme['axis']) => {
    return useMemo(() => extendAxisTheme(axisTheme, overrides), [axisTheme, overrides])
}
