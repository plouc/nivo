import { ResponsiveWrapper } from '@nivo/core'
import { BaseDatum, DatumGroupKeys, ParallelCoordinatesCanvasProps } from '../types'
import { ParallelCoordinatesCanvas } from './ParallelCoordinatesCanvas'

export const ResponsiveParallelCoordinatesCanvas = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined = undefined
>(
    props: Omit<ParallelCoordinatesCanvasProps<Datum, GroupBy>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <ParallelCoordinatesCanvas<Datum, GroupBy> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
