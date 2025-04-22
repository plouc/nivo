import { createElement, memo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useTheme, sanitizeSvgTextStyle } from '../../theming'
import { useMotionConfig } from '../../motion'
import DotsItemSymbol from './DotsItemSymbol'

const DotsItem = ({
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
}) => {
    const theme = useTheme()

    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        transform: `translate(${x}, ${y})`,
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
                <text
                    textAnchor={labelTextAnchor}
                    y={labelYOffset}
                    style={sanitizeSvgTextStyle(theme.dots.text)}
                >
                    {label}
                </text>
            )}
        </animated.g>
    )
}

export default memo(DotsItem)
