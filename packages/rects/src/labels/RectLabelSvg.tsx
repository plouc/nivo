import { useTheme, svgStyleAttributesMapping } from '@nivo/theming'
import { Text } from '@nivo/text'
import { DatumWithRectAndColor } from '../types'
import { RectLabelProps } from './types'

export const RectLabelSvg = <Datum extends DatumWithRectAndColor>({
    label,
    color,
    style,
    testId,
}: RectLabelProps<Datum>) => {
    const theme = useTheme()

    return (
        <Text
            transform={style.transform}
            textAnchor={svgStyleAttributesMapping.textAlign[style.align]}
            dominantBaseline={svgStyleAttributesMapping.textBaseline[style.baseline]}
            style={{
                ...theme.labels.text,
                fill: color,
                opacity: style.progress,
                pointerEvents: 'none',
            }}
            data-testid={testId}
        >
            {label}
        </Text>
    )
}
