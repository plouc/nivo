import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { NetworkLink } from './NetworkLink'
import { ComputedLink } from './types'

interface NetworkLinksProps {
    links: ComputedLink[]
    linkThickness: (link: ComputedLink) => number
    linkColor: (link: ComputedLink) => string
}

export const NetworkLinks = ({ links, linkThickness, linkColor }: NetworkLinksProps) => {
    const { animate, config: springConfig } = useMotionConfig()

    console.log('immediate', !animate)

    const transition = useTransition<
        ComputedLink,
        {
            x1: number
            y1: number
            x2: number
            y2: number
            color: string
            opacity: number
        }
    >(links, {
        keys: link => link.id,
        from: link => ({
            x1: link.source.x,
            y1: link.source.y,
            x2: link.target.x,
            y2: link.target.y,
            color: linkColor(link),
            opacity: 0,
        }),
        enter: link => ({
            x1: link.source.x,
            y1: link.source.y,
            x2: link.target.x,
            y2: link.target.y,
            color: linkColor(link),
            opacity: 1,
        }),
        update: link => ({
            x1: link.source.x,
            y1: link.source.y,
            x2: link.target.x,
            y2: link.target.y,
            color: linkColor(link),
            opacity: 1,
        }),
        leave: link => ({
            x1: link.source.x,
            y1: link.source.y,
            x2: link.source.x,
            y2: link.source.y,
            color: linkColor(link),
            opacity: 0,
        }),
        expires: true,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((transitionProps, link) => {
                return createElement(NetworkLink, {
                    key: link.id,
                    link,
                    thickness: linkThickness(link),
                    animated: transitionProps,
                })
            })}
        </>
    )
}
