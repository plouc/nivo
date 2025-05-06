import { CSSProperties } from 'react'
import { animated } from '@react-spring/web'
import { useTheme, svgStyleAttributesMapping } from '@nivo/theming'
import { Text } from '@nivo/text'
import { DatumWithRectAndColor } from '../types'
import { RectLabelProps } from './types'

const staticStyle: CSSProperties = {
    pointerEvents: 'none',
}

export const RectLabelSvg = <Datum extends DatumWithRectAndColor>({
    label,
    color,
    style,
    testId,
}: RectLabelProps<Datum>) => {
    const theme = useTheme()

    return (
        <animated.g transform={style.transform} opacity={style.progress} style={staticStyle}>
            <Text
                textAnchor={svgStyleAttributesMapping.textAlign[style.align]}
                dominantBaseline={svgStyleAttributesMapping.textBaseline[style.baseline]}
                style={{
                    ...theme.labels.text,
                    fill: color,
                    opacity: style.progress,
                }}
                data-testid={testId}
            >
                {label}
            </Text>
        </animated.g>
    )
}
