import { gradientTypes } from './gradients'
import { patternTypes } from './patterns'

export const defsTypes = [...Object.keys(gradientTypes), ...Object.keys(patternTypes)]
console.log('defsTypes: ' + defsTypes)

export type DefType = {
    id: string
    type: typeof defsTypes[number]
}

export interface DefsProps {
    defs: DefType[]
}
