import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { ChordCanvas } from './ChordCanvas'
import { ChordCanvasProps } from './types'

export const ResponsiveChordCanvas = forwardRef(
    (props: ResponsiveProps<ChordCanvasProps>, ref: Ref<HTMLCanvasElement>) => (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <ChordCanvas {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
)
