import { createElement, memo } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from '@react-spring/web'
import { useTheme } from '../../theming'
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
                <text textAnchor={labelTextAnchor} y={labelYOffset} style={theme.dots.text}>
                    {label}
                </text>
            )}
        </animated.g>
    )
}

DotsItem.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    datum: PropTypes.object.isRequired,

    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    symbol: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelTextAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
    labelYOffset: PropTypes.number.isRequired,
}

export default memo(DotsItem)
