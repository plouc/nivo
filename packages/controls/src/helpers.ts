import { InputType } from './types'

export const generateInputId = (id: string, type: InputType) => `${id}.${type}`
