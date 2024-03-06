import { useTheme } from '@nivo/core'
import { SpringValue, animated } from '@react-spring/web'
import { BarCommonProps, BarDatum } from './types'
import { svgDefaultProps } from './props'

interface Props<RawDatum extends BarDatum> {
    value: number
    labelOpacity: SpringValue<number>
    x: SpringValue<number>
    y: SpringValue<number>
    layout?: BarCommonProps<RawDatum>['layout']
}

export const BarTotal = <RawDatum extends BarDatum>({
    value,
    labelOpacity,
    x,
    y,
    layout = svgDefaultProps.layout,
}: Props<RawDatum>) => {
    const theme = useTheme()
    return (
        <animated.text
            x={x}
            y={y}
            fillOpacity={labelOpacity}
            style={{
                ...theme.labels.text,
                pointerEvents: 'none',
                fill: theme.text.fill,
            }}
            fontWeight="bold"
            fontSize={theme.labels.text.fontSize}
            fontFamily={theme.labels.text.fontFamily}
            textAnchor={layout === 'vertical' ? 'middle' : 'start'}
            alignmentBaseline="middle"
        >
            {value}
        </animated.text>
    )
}
