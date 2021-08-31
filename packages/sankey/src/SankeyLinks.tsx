import { sankeyLinkHorizontal, sankeyLinkVertical } from './links'
import {
    DefaultLink,
    DefaultNode,
    SankeyCommonProps,
    SankeyLinkDatum,
    SankeyNodeDatum,
} from './types'
import { SankeyLinksItem } from './SankeyLinksItem'
import { useMemo } from 'react'

interface SankeyLinksProps<N extends DefaultNode, L extends DefaultLink> {
    layout: SankeyCommonProps<N, L>['layout']
    links: SankeyLinkDatum<N, L>[]
    linkOpacity: SankeyCommonProps<N, L>['linkOpacity']
    linkHoverOpacity: SankeyCommonProps<N, L>['linkHoverOpacity']
    linkHoverOthersOpacity: SankeyCommonProps<N, L>['linkHoverOthersOpacity']
    linkContract: SankeyCommonProps<N, L>['linkContract']
    linkBlendMode: SankeyCommonProps<N, L>['linkBlendMode']
    enableLinkGradient: SankeyCommonProps<N, L>['enableLinkGradient']
    tooltip: SankeyCommonProps<N, L>['linkTooltip']
    setCurrentLink: (link: SankeyLinkDatum<N, L> | null) => void
    currentLink: SankeyLinkDatum<N, L> | null
    currentNode: SankeyNodeDatum<N, L> | null
    isCurrentLink: (link: SankeyLinkDatum<N, L>) => boolean
    isInteractive: SankeyCommonProps<N, L>['isInteractive']
    onClick?: SankeyCommonProps<N, L>['onClick']
}

export const SankeyLinks = <N extends DefaultNode, L extends DefaultLink>({
    links,
    layout,
    linkOpacity,
    linkHoverOpacity,
    linkHoverOthersOpacity,
    linkContract,
    linkBlendMode,
    enableLinkGradient,
    setCurrentLink,
    currentLink,
    currentNode,
    isCurrentLink,
    isInteractive,
    onClick,
    tooltip,
}: SankeyLinksProps<N, L>) => {
    const getOpacity = (link: SankeyLinkDatum<N, L>) => {
        if (!currentNode && !currentLink) return linkOpacity
        if (isCurrentLink(link)) return linkHoverOpacity
        return linkHoverOthersOpacity
    }

    const getLinkPath = useMemo(
        () => (layout === 'horizontal' ? sankeyLinkHorizontal() : sankeyLinkVertical()),
        [layout]
    )

    return (
        <>
            {links.map(link => (
                <SankeyLinksItem<N, L>
                    key={`${link.source.id}.${link.target.id}`}
                    link={link}
                    layout={layout}
                    path={getLinkPath(link, linkContract)}
                    color={link.color}
                    opacity={getOpacity(link)}
                    blendMode={linkBlendMode}
                    enableGradient={enableLinkGradient}
                    setCurrent={setCurrentLink}
                    isInteractive={isInteractive}
                    onClick={onClick}
                    tooltip={tooltip}
                />
            ))}
        </>
    )
}
