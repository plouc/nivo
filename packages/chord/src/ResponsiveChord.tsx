import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { Chord } from './Chord'
import { ChordSvgProps } from './types'

export const ResponsiveChord = (props: Omit<ChordSvgProps, 'width' | 'height'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Chord {...props} width={width} height={height} />}
    </ResponsiveWrapper>
)
