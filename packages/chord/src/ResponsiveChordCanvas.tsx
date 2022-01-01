import { ResponsiveWrapper } from '@nivo/core'
import { ChordCanvas } from './ChordCanvas'
import { ChordCanvasProps } from './types'

export const ResponsiveChordCanvas = (props: Omit<ChordCanvasProps, 'width' | 'height'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <ChordCanvas {...props} width={width} height={height} />}
    </ResponsiveWrapper>
)
