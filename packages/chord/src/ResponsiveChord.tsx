import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { Chord } from './Chord'
import { ChordSvgProps } from './types'

export const ResponsiveChord = forwardRef(
    (
        { defaultWidth, defaultHeight, ...props }: ResponsiveProps<ChordSvgProps>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper defaultWidth={defaultWidth} defaultHeight={defaultHeight}>
            {({ width, height }) => <Chord {...props} width={width} height={height} ref={ref} />}
        </ResponsiveWrapper>
    )
)
