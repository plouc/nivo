import { createContext } from 'react'

type Context = [key: number, hasCanvas: boolean]

export const ChartContext = createContext<Context | undefined>(undefined)