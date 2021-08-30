import { sankeyLinkHorizontal, sankeyLinkVertical } from './links'
import { SankeyCommonProps, SankeyId, SankeyLinkDatum, SankeyNodeDatum } from './types'
import { SankeyLinksItem } from './SankeyLinksItem'
import { useMemo } from 'react'

interface SankeyLinksProps<Id extends SankeyId> {
    layout: SankeyCommonProps<Id>['layout']
    links: SankeyLinkDatum<Id>[]
    linkOpacity: SankeyCommonProps<Id>['linkOpacity']
    linkHoverOpacity: SankeyCommonProps<Id>['linkHoverOpacity']
    linkHoverOthersOpacity: SankeyCommonProps<Id>['linkHoverOthersOpacity']
    linkContract: SankeyCommonProps<Id>['linkContract']
    linkBlendMode: SankeyCommonProps<Id>['linkBlendMode']
    enableLinkGradient: SankeyCommonProps<Id>['enableLinkGradient']
    tooltip: SankeyCommonProps<Id>['linkTooltip']
    setCurrentLink: (link: SankeyLinkDatum<Id> | null) => void
    currentLink: SankeyLinkDatum<Id> | null
    currentNode: SankeyNodeDatum<Id> | null
    isCurrentLink: (link: SankeyLinkDatum<Id>) => boolean
    isInteractive: SankeyCommonProps<Id>['isInteractive']
    onClick?: SankeyCommonProps<Id>['onClick']
}

export const SankeyLinks = <Id extends SankeyId>({
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
}: SankeyLinksProps<Id>) => {
    const getOpacity = (link: SankeyLinkDatum<Id>) => {
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
                <SankeyLinksItem<Id>
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
