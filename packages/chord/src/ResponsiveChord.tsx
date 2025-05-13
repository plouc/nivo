import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { Chord } from './Chord'
import { ChordSvgProps } from './types'

export const ResponsiveChord = forwardRef(
    (props: ResponsiveProps<ChordSvgProps>, ref: Ref<SVGSVGElement>) => (
        <ResponsiveWrapper>
            {({ width, height }) => <Chord {...props} width={width} height={height} ref={ref} />}
        </ResponsiveWrapper>
    )
)
