import { ResponsiveWrapper } from '@nivo/core'
import { StreamDatum, StreamSvgProps } from './types'
import { Stream } from './Stream'

export const ResponsiveStream = <RawDatum extends StreamDatum>(
    props: Omit<StreamSvgProps<RawDatum>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Stream<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
