import { ResponsiveWrapper } from '@nivo/core'
import { ParallelCoordinatesProps, BaseDatum, DatumGroupKeys } from '../types'
import { ParallelCoordinates } from './ParallelCoordinates'

export const ResponsiveParallelCoordinates = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined = undefined
>(
    props: Omit<ParallelCoordinatesProps<Datum, GroupBy>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <ParallelCoordinates<Datum, GroupBy> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
