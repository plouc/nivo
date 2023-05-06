import { animated } from '@react-spring/web'
import { Datum, CellComponentProps } from './types'

export const WaffleCellHtml = <D extends Datum>({
    cell,
    animatedProps,
    borderWidth,
    testIdPrefix,
}: CellComponentProps<D>) => {
    return (
        <animated.div
            style={{
                position: 'absolute',
                top: animatedProps.y,
                left: animatedProps.x,
                width: animatedProps.size,
                height: animatedProps.size,
                background: animatedProps.fill,
                opacity: animatedProps.opacity,
                boxSizing: 'content-box',
                borderStyle: 'solid',
                borderWidth: `${borderWidth}px`,
                // borderColor,
            }}
            data-test-id={testIdPrefix ? `${testIdPrefix}${cell.key}` : undefined}
        />
    )
}
