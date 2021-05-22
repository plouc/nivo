import { createContext } from 'react'

export type Flavor = 'svg'| 'canvas' | 'html'
type Context = [key: number, flavor: Flavor]

export const ChartContext = createContext<Context | undefined>(undefined)
