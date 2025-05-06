import { animated } from '@react-spring/web'
import { useTheme, sanitizeHtmlTextStyle } from '@nivo/theming'
import { DatumWithRectAndColor } from '../types'
import { RectLabelProps } from './types'

export const RectLabelHtml = <Datum extends DatumWithRectAndColor>({
    label,
    color,
    style,
    testId,
}: RectLabelProps<Datum>) => {
    const theme = useTheme()

    return (
        <animated.span
            style={{
                ...sanitizeHtmlTextStyle(theme.labels.text),
                position: 'absolute',
                top: style.y,
                left: style.x,
                opacity: style.progress,
                pointerEvents: 'none',
                color,
            }}
            data-testid={testId}
        >
            {label}
        </animated.span>
    )
}
