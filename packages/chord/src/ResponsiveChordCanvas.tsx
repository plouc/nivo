import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { ChordCanvas } from './ChordCanvas'
import { ChordCanvasProps } from './types'

export const ResponsiveChordCanvas = forwardRef(
    (
        { defaultWidth, defaultHeight, ...props }: ResponsiveProps<ChordCanvasProps>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper defaultWidth={defaultWidth} defaultHeight={defaultHeight}>
            {({ width, height }) => (
                <ChordCanvas {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
)
