import { ResponsiveWrapper } from '@nivo/core'
import { BaseDatum, ParallelCoordinatesCanvasProps } from '../types'
import { ParallelCoordinatesCanvas } from './ParallelCoordinatesCanvas'

export const ResponsiveParallelCoordinatesCanvas = <D extends BaseDatum>(
    props: Omit<ParallelCoordinatesCanvasProps<D>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <ParallelCoordinatesCanvas<D> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
