import { animated, to } from '@react-spring/web'
import { LinkComponentProps } from './types'
import { useLinkMouseEventHandlers } from './hooks'

export const Link = <Datum,>({
    link,
    linkGenerator,
    animatedProps,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}: LinkComponentProps<Datum>) => {
    const eventHandlers = useLinkMouseEventHandlers<Datum>(link, {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    })

    return (
        <animated.path
            data-testid={`link.${link.id}`}
            d={to(
                [
                    animatedProps.sourceX,
                    animatedProps.sourceY,
                    animatedProps.targetX,
                    animatedProps.targetY,
                ],
                (sourceX, sourceY, targetX, targetY) => {
                    return linkGenerator({
                        source: [sourceX, sourceY],
                        target: [targetX, targetY],
                    })
                }
            )}
            fill="none"
            strokeWidth={animatedProps.thickness}
            stroke={animatedProps.color}
            {...eventHandlers}
        />
    )
}
