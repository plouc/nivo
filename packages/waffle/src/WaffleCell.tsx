import { animated } from '@react-spring/web'
import { Datum, CellComponentProps } from './types'

export const WaffleCell = <D extends Datum>({
    cell,
    animatedProps,
    borderRadius,
    borderWidth,
    testIdPrefix,
}: CellComponentProps<D>) => {
    return (
        <animated.rect
            x={animatedProps.x}
            y={animatedProps.y}
            width={animatedProps.size}
            height={animatedProps.size}
            rx={borderRadius}
            ry={borderRadius}
            opacity={animatedProps.opacity}
            fill={animatedProps.fill}
            // stroke={getBorderColor(cell)}
            strokeWidth={borderWidth}
            data-test-id={testIdPrefix ? `${testIdPrefix}.cell_${cell.key}` : undefined}
        />
    )
}
