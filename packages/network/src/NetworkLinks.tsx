import { createElement, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { ComputedLink, NetworkInputNode, NetworkLinkComponent } from './types'

interface NetworkLinksProps<N extends NetworkInputNode> {
    links: ComputedLink<N>[]
    linkComponent: NetworkLinkComponent<N>
}

const getEnterTransition = <N extends NetworkInputNode>() => (link: ComputedLink<N>) => ({
    x1: link.source.x,
    y1: link.source.y,
    x2: link.source.x,
    y2: link.source.y,
    color: link.color,
    opacity: 0,
})

const getRegularTransition = <N extends NetworkInputNode>() => (link: ComputedLink<N>) => ({
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    color: link.color,
    opacity: 1,
})

const getExitTransition = <N extends NetworkInputNode>() => (link: ComputedLink<N>) => ({
    x1: link.source.x,
    y1: link.source.y,
    x2: link.source.x,
    y2: link.source.y,
    color: link.color,
    opacity: 0,
})

export const NetworkLinks = <N extends NetworkInputNode>({
    links,
    linkComponent,
}: NetworkLinksProps<N>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const [enterTransition, regularTransition, exitTransition] = useMemo(
        () => [getEnterTransition<N>(), getRegularTransition<N>(), getExitTransition<N>()],
        []
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
                return createElement(linkComponent, {
                    key: link.id,
                    link,
                    animated: transitionProps,
                })
            })}
        </>
    )
}
