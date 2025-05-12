import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { DefaultLink, DefaultNode, SankeySvgProps } from './types'
import { Sankey } from './Sankey'

export type ResponsiveSankeyProps<
    N extends DefaultNode = DefaultNode,
    L extends DefaultLink = DefaultLink,
> = Omit<SankeySvgProps<N, L>, 'width' | 'height'>

export const InnerResponsiveSankey = <
    N extends DefaultNode = DefaultNode,
    L extends DefaultLink = DefaultLink,
>(
    props: ResponsiveSankeyProps<N, L>,
    ref: Ref<SVGSVGElement>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Sankey<N, L> width={width} height={height} {...props} ref={ref} />}
    </ResponsiveWrapper>
)

export const ResponsiveSankey = forwardRef<SVGSVGElement, ResponsiveSankeyProps>(
    InnerResponsiveSankey
) as <N extends DefaultNode = DefaultNode, L extends DefaultLink = DefaultLink>(
    props: ResponsiveSankeyProps<N, L> & {
        ref?: Ref<SVGSVGElement>
    }
) => ReactElement
