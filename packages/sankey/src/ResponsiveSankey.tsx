import { ResponsiveWrapper } from '@nivo/core'
import { SankeyId, SankeySvgProps } from './types'
import { Sankey } from './Sankey'

export const ResponsiveSankey = <Id extends SankeyId = string>(
    props: Omit<SankeySvgProps<Id>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Sankey<Id> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
