import { ChartProperty } from '../types'

export interface ObjectControlConfig {
    type: 'object'
    props: ChartProperty<any>[]
    isOpenedByDefault?: boolean
}
