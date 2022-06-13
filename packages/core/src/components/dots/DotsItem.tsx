import { createElement, memo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useTheme } from '../../theming'
import { useMotionConfig } from '../../motion'
import { DotsItemSymbol } from './DotsItemSymbol'
import { DotsItemProps } from './types'

export const DotsItem = memo(
    <Datum extends Record<string, unknown>>({
        x,
        y,
        symbol = DotsItemSymbol,
        size,
        color,
        borderWidth,
        borderColor,
        label,
        labelTextAnchor = 'middle',
        labelYOffset = -12,
    }: DotsItemProps<Datum>) => {
        const theme = useTheme()

        const { animate, config: springConfig } = useMotionConfig()
        const animatedProps = useSpring({
            transform: 'translate(' + x + ',' + y + ')',
            config: springConfig,
            immediate: !animate,
        })

        return (
            <animated.g transform={animatedProps.transform} style={{ pointerEvents: 'none' }}>
                {createElement(symbol, {
                    size,
                    color,
                    borderWidth,
                    borderColor,
                })}
                {label && (
                    <text textAnchor={labelTextAnchor} y={labelYOffset} style={theme.dots.text}>
                        {label}
                    </text>
                )}
            </animated.g>
        )
    }
)
