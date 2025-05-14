import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { ChordCanvas } from './ChordCanvas'
import { ChordCanvasProps } from './types'

export const ResponsiveChordCanvas = forwardRef(
    (
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<ChordCanvasProps>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <ChordCanvas {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
)
