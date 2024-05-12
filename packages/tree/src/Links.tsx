import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { TooltipAnchor } from '@nivo/tooltip'
import {
    ComputedLink,
    LinkComponent,
    LinkMouseEventHandler,
    LinkTooltip,
    LinkAnimatedProps,
    LinkGenerator,
    ComputedNode,
    NodesMap,
} from './types'
import { getFirstRemainingAncestorOrSelf, getPreviousCollapsedAncestorOrSelf } from './hooks'

interface LinksProps<Datum> {
    links: ComputedLink<Datum>[]
    nodeByUid: NodesMap<Datum>
    linkComponent: LinkComponent<Datum>
    linkGenerator: LinkGenerator
    isInteractive: boolean
    onMouseEnter?: LinkMouseEventHandler<Datum>
    onMouseMove?: LinkMouseEventHandler<Datum>
    onMouseLeave?: LinkMouseEventHandler<Datum>
    onClick?: LinkMouseEventHandler<Datum>
    tooltip?: LinkTooltip<Datum>
    tooltipAnchor: TooltipAnchor
}

const enterTransition =
    <Datum,>(previousCollapsedNodes: NodesMap<Datum>) =>
    (link: ComputedLink<Datum>) => {
        const source = link.source
        const target = link.target
        // const source = getPreviousCollapsedAncestorOrSelf<Datum>(
        //     link.source,
        //     previousCollapsedNodeUids,
        //     nodeByUid
        // )
        // const target = getPreviousCollapsedAncestorOrSelf<Datum>(
        //     link.target,
        //     previousCollapsedNodeUids,
        //     nodeByUid
        // )

        return {
            sourceX: source.x,
            sourceY: source.y,
            targetX: target.x,
            targetY: target.y,
            thickness: link.thickness,
            color: link.color,
        }
    }

const regularTransition = <Datum,>(link: ComputedLink<Datum>): LinkAnimatedProps => ({
    sourceX: link.source.x,
    sourceY: link.source.y,
    targetX: link.target.x,
    targetY: link.target.y,
    thickness: link.thickness,
    color: link.color,
})

const leaveTransition =
    <Datum,>(nodeByUid: NodesMap<Datum>) =>
    (link: ComputedLink<Datum>): LinkAnimatedProps => {
        let source: ComputedNode<Datum> | undefined = nodeByUid[link.source.uid]
        if (!source) {
            source = getFirstRemainingAncestorOrSelf(link.source, nodeByUid)
        }

        let target: ComputedNode<Datum> | undefined = nodeByUid[link.target.uid]
        if (!target) {
            target = getFirstRemainingAncestorOrSelf(link.target, nodeByUid)
        }

        return {
            sourceX: source.x,
            sourceY: source.y,
            targetX: target.x,
            targetY: target.y,
            thickness: link.thickness,
            color: link.color,
        }
    }

export const Links = <Datum,>({
    links,
    nodeByUid,
    linkComponent,
    linkGenerator,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    tooltipAnchor,
}: LinksProps<Datum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<ComputedLink<Datum>, LinkAnimatedProps>(links, {
        keys: link => link.id,
        initial: regularTransition,
        // from: enterTransition(previousCollapsedNodes.current),
        enter: regularTransition,
        update: regularTransition,
        leave: leaveTransition(nodeByUid),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((animatedProps, link) => {
                return createElement(linkComponent, {
                    link,
                    linkGenerator,
                    animatedProps,
                    isInteractive,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                    onClick,
                    tooltip,
                    tooltipAnchor,
                })
            })}
        </>
    )
}
