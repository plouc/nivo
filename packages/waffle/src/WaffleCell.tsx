import { animated } from '@react-spring/web'
import { Datum, CellComponentProps } from './types'

export const WaffleCell = <RawDatum extends Datum>({
    cell,
    animatedProps,
    borderWidth,
    testIdPrefix,
}: CellComponentProps<Datum>) => {
    return (
        <animated.rect
            x={animatedProps.x}
            y={animatedProps.y}
            width={animatedProps.size}
            height={animatedProps.size}
            // //opacity={cell.opacity}
            // width={cellSize}
            // height={cellSize}
            fill={animatedProps.fill}
            // stroke={getBorderColor(cell)}
            strokeWidth={borderWidth}
            data-test-id={testIdPrefix ? `${testIdPrefix}${cell.key}` : undefined}
        />
    )
}
