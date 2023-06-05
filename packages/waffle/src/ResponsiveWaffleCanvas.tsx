import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { CanvasProps, Datum } from './types'
import { WaffleCanvas } from './WaffleCanvas'

export const ResponsiveWaffleCanvas = <D extends Datum>(
    props: Omit<CanvasProps<D>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <WaffleCanvas<D> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
