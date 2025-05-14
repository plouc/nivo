import { animated } from '@react-spring/web'
import { useTheme } from '@nivo/theming'
import { LabelProps } from './types'
import { interpolatePosition, interpolateSize } from './CircleHtml'

export const LabelHtml = <Datum,>({ node, label, style }: LabelProps<Datum>) => {
    const theme = useTheme()
    const size = interpolateSize(style.radius)

    return (
        <animated.div
            key={node.id}
            style={{
                ...theme.labels.text,
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: interpolatePosition(style.y, style.radius),
                left: interpolatePosition(style.x, style.radius),
                width: size,
                height: size,
                color: style.textColor,
                opacity: style.opacity,
                pointerEvents: 'none',
            }}
        >
            {label}
        </animated.div>
    )
}
