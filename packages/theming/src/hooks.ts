import { useMemo } from 'react'
import { extendDefaultTheme } from './extend'
import { defaultTheme } from './defaults'
import { PartialTheme } from './types'

export const usePartialTheme = (partialTheme: PartialTheme) => {
    return useMemo(() => extendDefaultTheme(defaultTheme, partialTheme), [partialTheme])
}
