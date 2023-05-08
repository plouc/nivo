import { ResponsiveWrapper } from '@nivo/core'
import { ParallelCoordinatesProps, BaseDatum } from '../types'
import { ParallelCoordinates } from './ParallelCoordinates'

export const ResponsiveParallelCoordinates = <D extends BaseDatum>(
    props: Omit<ParallelCoordinatesProps<D>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <ParallelCoordinates<D> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
