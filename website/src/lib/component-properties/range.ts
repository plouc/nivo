import { Flavor, RangeProperty } from '../../types'
import { RangeControlAttrs } from '../../types'

export const numberWithRangeProp = ({
    key,
    group,
    required,
    help,
    flavors,
    min,
    max,
    step,
    unit,
}: {
    key: string
    group: string
    required: boolean
    help: string
    flavors: Flavor[]
    min: number
    max: number
    step?: number
    unit?: RangeControlAttrs['controlOptions']['unit']
}): RangeProperty => ({
    key,
    group,
    type: 'number',
    required,
    help,
    flavors,
    controlType: 'range',
    controlOptions: {
        min,
        max,
        step,
        unit,
    },
})
