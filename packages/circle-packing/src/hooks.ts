import { usePropertyAccessor } from '@nivo/core'
import { DatumWithChildren, CirclePackSvgProps } from './types'

export const useCirclePack = <RawDatum extends DatumWithChildren<RawDatum>>({
    data,
    id,
    value,
}: {
    data: RawDatum
    id: CirclePackSvgProps<RawDatum>['id']
    value: CirclePackSvgProps<RawDatum>['value']
}) => {
    const getId = usePropertyAccessor<RawDatum, string | number>(id)
    const getValue = usePropertyAccessor<RawDatum, number>(value)

    console.log({
        data,
        getId,
        getValue,
    })
}
