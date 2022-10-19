import React, { memo, useRef, PropsWithChildren, CSSProperties } from 'react'
import { useSpring, animated } from 'react-spring'
import {
    useTheme,
    useMotionConfig,
    // @ts-ignore
    useMeasure,
} from '@bitbloom/nivo-core'
import { TooltipStateContextDataVisible } from './context'

const TOOLTIP_OFFSET = 14

const tooltipStyle = {
    pointerEvents: 'none' as CSSProperties['pointerEvents'],
    position: 'absolute' as CSSProperties['position'],
    zIndex: 10,
    top: 0,
    left: 0,
}

const translate = (x: number, y: number) => `translate(${x}px, ${y}px)`

interface TooltipWrapperProps {
    position: TooltipStateContextDataVisible['position']
    anchor: TooltipStateContextDataVisible['anchor']
    outer: TooltipStateContextDataVisible['outer']
}

export const TooltipWrapper = memo<PropsWithChildren<TooltipWrapperProps>>(
    ({ position, anchor, children, outer }) => {
        const theme = useTheme()
        const { animate, config: springConfig } = useMotionConfig()
        const [measureRef, bounds] = useMeasure()
        const previousPosition = useRef<[number, number] | false>(false)

        let to = undefined
        let immediate = false
        const hasDimension = bounds.width > 0 && bounds.height > 0

        let x = Math.round(position[0])
        let y = Math.round(position[1])

        if (hasDimension) {
            if (anchor === 'top') {
                x -= bounds.width / 2
                y -= bounds.height + TOOLTIP_OFFSET
            } else if (anchor === 'right') {
                x += TOOLTIP_OFFSET
                y -= bounds.height / 2
            } else if (anchor === 'bottom') {
                x -= bounds.width / 2
                y += TOOLTIP_OFFSET
            } else if (anchor === 'left') {
                x -= bounds.width + TOOLTIP_OFFSET
                y -= bounds.height / 2
            } else if (anchor === 'center') {
                x -= bounds.width / 2
                y -= bounds.height / 2
            }

            // when scrolled, outer.left becomes negative by the scroll offset, so this is the minimum value visible
            const x0 = -outer.left;
            const y0 = -outer.top;

            // not sure why but have to adjust by twice scrollbar width
            const outerWidth = outer.width + 32;

            if (outer.width > 0 && x > outerWidth - bounds.width + x0){
                x = outerWidth - bounds.width + x0
            }

            if (outer.height > 0 && y > outer.height - bounds.height){
                y = outer.height - bounds.height
            }

            x = Math.max(x, x0)
            y = Math.max(y, y0)

            to = {
                transform: translate(x, y),
            }

            if (!previousPosition.current) {
                immediate = true
            }

            previousPosition.current = [x, y]
        }

        const animatedProps = useSpring<{
            transform: string
        }>({
            to,
            config: springConfig,
            immediate: !animate || immediate,
        })

        const style = {
            ...tooltipStyle,
            ...theme.tooltip,
            transform: animatedProps.transform ?? translate(x, y),
        }

        return (
            <animated.div ref={measureRef} style={style}>
                {children}
            </animated.div>
        )
    }
)

TooltipWrapper.displayName = 'TooltipWrapper'
