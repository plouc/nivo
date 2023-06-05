import { createElement, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@bitbloom/nivo-core'
import { ComputedLink, InputLink, InputNode, LinkComponent, NetworkSvgProps } from './types'

interface NetworkLinksProps<Node extends InputNode, Link extends InputLink> {
    links: ComputedLink<Node, Link>[]
    linkComponent: LinkComponent<Node, Link>
    blendMode: NonNullable<NetworkSvgProps<Node, Link>['linkBlendMode']>
}

const getEnterTransition =
    <Node extends InputNode, Link extends InputLink>() =>
    (link: ComputedLink<Node, Link>) => ({
        x1: link.source.x,
        y1: link.source.y,
        x2: link.source.x,
        y2: link.source.y,
        color: link.color,
        opacity: 0,
    })

const getRegularTransition =
    <Node extends InputNode, Link extends InputLink>() =>
    (link: ComputedLink<Node, Link>) => ({
        x1: link.source.x,
        y1: link.source.y,
        x2: link.target.x,
        y2: link.target.y,
        color: link.color,
        opacity: 1,
    })

export const NetworkLinks = <Node extends InputNode, Link extends InputLink>({
    links,
    linkComponent,
    blendMode,
}: NetworkLinksProps<Node, Link>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const [enterTransition, regularTransition] = useMemo(
        () => [getEnterTransition<Node, Link>(), getRegularTransition<Node, Link>()],
        []
    )

    const transition = useTransition<
        ComputedLink<Node, Link>,
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
        initial: regularTransition,
        from: enterTransition,
        enter: regularTransition,
        update: regularTransition,
        expires: true,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((transitionProps, link) => {
                return createElement(linkComponent, {
                    key: link.id,
                    link,
                    animated: transitionProps,
                    blendMode,
                })
            })}
        </>
    )
}
