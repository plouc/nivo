import { animated } from '@react-spring/web'
import { useTheme } from '@nivo/theming'
import { LabelProps } from './types'

export const LabelSvg = <Datum,>({ node, label, style }: LabelProps<Datum>) => {
    const theme = useTheme()

    return (
        <animated.text
            key={node.id}
            x={style.x}
            y={style.y}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                ...theme.labels.text,
                fill: style.textColor,
                opacity: style.opacity,
                pointerEvents: 'none',
            }}
        >
            {label}
        </animated.text>
    )
}
