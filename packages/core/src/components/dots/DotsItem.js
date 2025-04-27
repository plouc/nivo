import { createElement, memo, useCallback } from 'react'
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
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaHidden,
    ariaDisabled,
    isFocusable = false,
    tabIndex = 0,
    onFocus,
    onBlur,
    testId,
}) => {
    const theme = useTheme()

    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        transform: `translate(${x}, ${y})`,
        config: springConfig,
        immediate: !animate,
    })

    const handleFocus = useCallback(
        event => {
            onFocus?.(datum, event)
        },
        [onFocus, datum]
    )

    const handleBlur = useCallback(
        event => {
            onBlur?.(datum, event)
        },
        [onBlur, datum]
    )

    return (
        <animated.g
            transform={animatedProps.transform}
            style={{ pointerEvents: 'none' }}
            focusable={isFocusable}
            tabIndex={isFocusable ? tabIndex : undefined}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-disabled={ariaDisabled}
            aria-hidden={ariaHidden}
            onFocus={isFocusable && onFocus ? handleFocus : undefined}
            onBlur={isFocusable && onBlur ? handleBlur : undefined}
            data-testid={testId}
        >
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
