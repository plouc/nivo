import { AxisProps } from './types'

export const defaultAxisProps: Pick<
    Required<AxisProps>,
    'tickSize' | 'tickPadding' | 'tickRotation' | 'legendPosition' | 'legendOffset'
> = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legendPosition: 'middle',
    legendOffset: 0,
}
