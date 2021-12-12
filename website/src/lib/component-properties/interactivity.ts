import { booleanProp } from './boolean'
import { Flavor } from '../../types'

export const isInteractiveProp = (flavors: Flavor[], defaultValue?: boolean) =>
    booleanProp({
        key: 'isInteractive',
        group: 'Interactivity',
        required: false,
        help: 'Enable/disable interactivity.',
        flavors,
        defaultValue,
    })
