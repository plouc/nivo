import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import {
    ComputedLink,
    LinkComponent,
    LinkMouseEventHandler,
    LinkTooltip,
    LinkAnimatedProps,
    LinkGenerator,
} from './types'

interface LinksProps<Datum> {
    links: ComputedLink<Datum>[]
    linkComponent: LinkComponent<Datum>
    linkGenerator: LinkGenerator
    isInteractive: boolean
    onMouseEnter?: LinkMouseEventHandler<Datum>
    onMouseMove?: LinkMouseEventHandler<Datum>
    onMouseLeave?: LinkMouseEventHandler<Datum>
    onClick?: LinkMouseEventHandler<Datum>
    tooltip?: LinkTooltip<Datum>
}

const regularTransition = <Datum,>(link: ComputedLink<Datum>): LinkAnimatedProps => ({
    sourceX: link.source.x,
    sourceY: link.source.y,
    targetX: link.target.x,
    targetY: link.target.y,
    thickness: link.thickness,
    color: link.color,
})
const leaveTransition = <Datum,>(link: ComputedLink<Datum>): LinkAnimatedProps => ({
    sourceX: link.source.x,
    sourceY: link.source.y,
    targetX: link.target.x,
    targetY: link.target.y,
    thickness: link.thickness,
    color: link.color,
})

export const Links = <Datum,>({
    links,
    linkComponent,
    linkGenerator,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}: LinksProps<Datum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<ComputedLink<Datum>, LinkAnimatedProps>(links, {
        keys: link => link.id,
        from: regularTransition,
        enter: regularTransition,
        update: regularTransition,
        leave: leaveTransition,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((animatedProps, link) =>
                createElement(linkComponent, {
                    link,
                    linkGenerator,
                    animatedProps,
                    isInteractive,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                    onClick,
                    tooltip,
                })
            )}
        </>
    )
}
