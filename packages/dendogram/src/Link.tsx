import { animated, to } from '@react-spring/web'
import { line as d3Line } from 'd3-shape'
import { LinkComponentProps } from './types'
import { useLinkMouseEventHandlers } from './hooks'

const lineGenerator = d3Line()

export const Link = <Datum extends object>({
    link,
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
            d={to(
                [
                    animatedProps.sourceX,
                    animatedProps.sourceY,
                    animatedProps.targetX,
                    animatedProps.targetY,
                ],
                (sourceX, sourceY, targetX, targetY) => {
                    return lineGenerator([
                        [sourceX, sourceY],
                        [targetX, targetY],
                    ])
                }
            )}
            strokeWidth={link.thickness}
            stroke="red"
            {...eventHandlers}
        />
    )
}
