import { to } from '@react-spring/web'
import { useTheme, svgStyleAttributesMapping } from '@nivo/theming'
import { Text } from '@nivo/text'
import { NodeWithRectAndColor } from '../types'
import { RectLabelProps } from './types'

export const RectLabelSvg = <Node extends NodeWithRectAndColor>({
    label,
    color,
    style,
    testId,
}: RectLabelProps<Node>) => {
    const theme = useTheme()

    return (
        <Text
            textAnchor={svgStyleAttributesMapping.textAlign[style.align]}
            dominantBaseline={svgStyleAttributesMapping.textBaseline[style.baseline]}
            transform={to(
                [style.x, style.y, style.rotation],
                (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`
            )}
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
