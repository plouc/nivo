import { useMemo, memo } from 'react'
import * as React from 'react'
import { animated } from '@react-spring/web'
import { useTheme } from '@nivo/theming'
import { Text } from '@nivo/text'
import { ScaleValue } from '@nivo/scales'
import { AxisTickProps } from '../types'

const AxisTick = <Value extends ScaleValue>({
    value: _value,
    format,
    lineX,
    lineY,
    onClick,
    textBaseline,
    textAnchor,
    animatedProps,
}: AxisTickProps<Value>) => {
    const theme = useTheme()
    const lineStyle = theme.axis.ticks.line
    const value = format?.(_value) ?? _value

    const props = useMemo(() => {
        const style = { opacity: animatedProps.opacity }

        if (!onClick) {
            return { style }
        }

        return {
            style: { ...style, cursor: 'pointer' },
            onClick: (event: React.MouseEvent<SVGGElement, MouseEvent>) => onClick(event, value),
        }
    }, [animatedProps.opacity, onClick, value])

    return (
        <animated.g transform={animatedProps.transform} {...props}>
            <line x1={0} x2={lineX} y1={0} y2={lineY} style={lineStyle} />
            <Text
                dominantBaseline={textBaseline}
                textAnchor={textAnchor}
                transform={animatedProps.textTransform}
                style={theme.axis.ticks.text}
            >
                {`${value}`}
            </Text>
        </animated.g>
    )
}

const memoizedAxisTick = memo(AxisTick) as typeof AxisTick

export { memoizedAxisTick as AxisTick }
