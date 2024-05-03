import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { ComputedLink, LinkComponent, LinkMouseEventHandler, LinkTooltip } from './types'

interface LinksProps<Datum extends object> {
    links: ComputedLink<Datum>[]
    linkComponent: LinkComponent<Datum>
    isInteractive: boolean
    onMouseEnter?: LinkMouseEventHandler<Datum>
    onMouseMove?: LinkMouseEventHandler<Datum>
    onMouseLeave?: LinkMouseEventHandler<Datum>
    onClick?: LinkMouseEventHandler<Datum>
    tooltip?: LinkTooltip<Datum>
}

const regularTransition = <Datum extends object>(link: ComputedLink<Datum>) => ({
    sourceX: link.source.x,
    sourceY: link.source.y,
    targetX: link.target.x,
    targetY: link.target.y,
})
const leaveTransition = <Datum extends object>(link: ComputedLink<Datum>) => ({
    sourceX: link.source.x,
    sourceY: link.source.y,
    targetX: link.target.x,
    targetY: link.target.y,
})

export const Links = <Datum extends object>({
    links,
    linkComponent,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}: LinksProps<Datum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        ComputedLink<Datum>,
        {
            sourceX: number
            sourceY: number
            targetX: number
            targetY: number
        }
    >(links, {
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
