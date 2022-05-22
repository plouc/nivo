import { createElement, memo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useTheme } from '../../theming'
import { useMotionConfig } from '../../motion'
import { DotsItemSymbol } from './DotsItemSymbol'
import { DotsItemProps } from './types'

export const DotsItem = memo(
    ({
        x,
        y,
        symbol = DotsItemSymbol,
        size,
        datum,
        color,
        borderWidth,
        borderColor,
        label,
        labelTextAnchor = 'middle',
        labelYOffset = -12,
    }: DotsItemProps) => {
        const theme = useTheme()

        const { animate, config: springConfig } = useMotionConfig()
        const animatedProps = useSpring({
            transform: 'translate('+x+','+y+')',
            config: springConfig,
            immediate: !animate,
        })

        return (
            <animated.g transform={animatedProps.transform} style={{ pointerEvents: 'none' }}>
                {createElement(symbol, {
                    size,
                    color,
                    datum,
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
