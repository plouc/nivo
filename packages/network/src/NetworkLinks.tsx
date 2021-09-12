import { createElement, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { NetworkLink } from './NetworkLink'
import { ComputedLink, NetworkInputNode } from './types'

interface NetworkLinksProps<N extends NetworkInputNode> {
    links: ComputedLink<N>[]
    linkThickness: (link: ComputedLink<N>) => number
    linkColor: (link: ComputedLink<N>) => string
}

const getEnterTransition = <N extends NetworkInputNode>(
    linkColor: NetworkLinksProps<N>['linkColor']
) => (link: ComputedLink<N>) => ({
    x1: link.source.x,
    y1: link.source.y,
    x2: link.source.x,
    y2: link.source.y,
    color: linkColor(link),
    opacity: 0,
})

const getRegularTransition = <N extends NetworkInputNode>(
    linkColor: NetworkLinksProps<N>['linkColor']
) => (link: ComputedLink<N>) => ({
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    color: linkColor(link),
    opacity: 1,
})

const getExitTransition = <N extends NetworkInputNode>(
    linkColor: NetworkLinksProps<N>['linkColor']
) => (link: ComputedLink<N>) => ({
    x1: link.source.x,
    y1: link.source.y,
    x2: link.source.x,
    y2: link.source.y,
    color: linkColor(link),
    opacity: 0,
})

export const NetworkLinks = <N extends NetworkInputNode>({
    links,
    linkThickness,
    linkColor,
}: NetworkLinksProps<N>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const [enterTransition, regularTransition, exitTransition] = useMemo(
        () => [
            getEnterTransition<N>(linkColor),
            getRegularTransition<N>(linkColor),
            getExitTransition<N>(linkColor),
        ],
        [linkColor]
    )

    const transition = useTransition<
        ComputedLink<N>,
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
        leave: exitTransition,
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
