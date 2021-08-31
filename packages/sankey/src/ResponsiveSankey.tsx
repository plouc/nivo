import { ResponsiveWrapper } from '@nivo/core'
import { DefaultLink, DefaultNode, SankeySvgProps } from './types'
import { Sankey } from './Sankey'

export const ResponsiveSankey = <
    N extends DefaultNode = DefaultNode,
    L extends DefaultLink = DefaultLink
>(
    props: Omit<SankeySvgProps<N, L>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Sankey<N, L> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
