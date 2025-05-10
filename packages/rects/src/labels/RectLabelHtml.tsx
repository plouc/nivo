import { animated } from '@react-spring/web'
import { useTheme, sanitizeHtmlTextStyle, TextAlign, TextBaseline } from '@nivo/theming'
import { NodeWithRectAndColor } from '../types'
import { RectLabelProps } from './types'

const getTranslation = (align: TextAlign, baseline: TextBaseline) => {
    const translateX = align === 'start' ? '0%' : align === 'center' ? '-50%' : '-100%'
    const translateY = baseline === 'top' ? '0%' : baseline === 'center' ? '-50%' : '-100%'

    return `translate(${translateX}, ${translateY})`
}

export const RectLabelHtml = <Node extends NodeWithRectAndColor>({
    label,
    color,
    style,
    testId,
}: RectLabelProps<Node>) => {
    const theme = useTheme()

    return (
        <animated.span
            style={{
                ...sanitizeHtmlTextStyle(theme.labels.text),
                position: 'absolute',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                color,
                left: style.x,
                top: style.y,
                transform: style.rotation.to(
                    rotation =>
                        `rotate(${rotation}deg) ${getTranslation(style.align, style.baseline)}`
                ),
                transformOrigin: '0 0',
                pointerEvents: 'none',
                lineHeight: '1em',
                opacity: style.progress,
            }}
            data-testid={testId}
        >
            {label}
        </animated.span>
    )
}
