import { useTheme } from '@nivo/core'
import { AnimationConfig, animated, useTransition } from '@react-spring/web'
import { BarCommonProps, BarDatum } from './types'
import { svgDefaultProps } from './props'
import { BarTotalsData } from './compute/totals'

interface Props<RawDatum extends BarDatum> {
    data: BarTotalsData[]
    springConfig: Partial<AnimationConfig>
    animate: boolean
    layout?: BarCommonProps<RawDatum>['layout']
}

export const BarTotals = <RawDatum extends BarDatum>({
    data,
    springConfig,
    animate,
    layout = svgDefaultProps.layout,
}: Props<RawDatum>) => {
    const theme = useTheme()
    const totalsTransition = useTransition<
        BarTotalsData,
        {
            x: number
            y: number
            labelOpacity: number
        }
    >(data, {
        keys: barTotal => barTotal.key,
        from: barTotal => ({
            x: layout === 'vertical' ? barTotal.x : barTotal.animationOffset,
            y: layout === 'vertical' ? barTotal.animationOffset : barTotal.y,
            labelOpacity: 0,
        }),
        enter: barTotal => ({
            x: barTotal.x,
            y: barTotal.y,
            labelOpacity: 1,
        }),
        update: barTotal => ({
            x: barTotal.x,
            y: barTotal.y,
            labelOpacity: 1,
        }),
        leave: barTotal => ({
            x: layout === 'vertical' ? barTotal.x : barTotal.animationOffset,
            y: layout === 'vertical' ? barTotal.animationOffset : barTotal.y,
            labelOpacity: 0,
        }),
        config: springConfig,
        immediate: !animate,
        initial: animate ? undefined : null,
    })

    return totalsTransition((style, barTotal) => (
        <animated.text
            key={barTotal.key}
            x={style.x}
            y={style.y}
            fillOpacity={style.labelOpacity}
            style={{
                ...theme.labels.text,
                pointerEvents: 'none',
            }}
            fontWeight="bold"
            fontSize={theme.labels.text.fontSize}
            fontFamily={theme.labels.text.fontFamily}
            textAnchor={layout === 'vertical' ? 'middle' : 'start'}
            alignmentBaseline={layout === 'vertical' ? 'alphabetic' : 'middle'}
        >
            {barTotal.formattedValue}
        </animated.text>
    ))
}
