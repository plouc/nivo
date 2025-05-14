import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { Chord } from './Chord'
import { ChordSvgProps } from './types'

export const ResponsiveChord = forwardRef(
    (
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<ChordSvgProps>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => <Chord {...props} width={width} height={height} ref={ref} />}
        </ResponsiveWrapper>
    )
)
