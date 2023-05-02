import { createElement, useCallback, MouseEvent } from 'react'
import { animated } from '@react-spring/web'
import { useTooltip } from '@nivo/tooltip'
import { Datum, HtmlCellComponentProps, isDataCell } from './types'

export const WaffleCellHtml = <RawDatum extends Datum>({
    cell,
    animatedProps,
    borderWidth,
    tooltip,
    testIdPrefix,
}: HtmlCellComponentProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            if (isDataCell(cell)) {
                showTooltipFromEvent(createElement(tooltip, { cell }), event, 'top')
            }
        },
        [cell, showTooltipFromEvent]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            if (isDataCell(cell)) {
                showTooltipFromEvent(createElement(tooltip, { cell }), event, 'top')
            }
        },
        [cell, showTooltipFromEvent]
    )

    const handleMouseLeave = useCallback(
        (_event: MouseEvent<HTMLDivElement>) => {
            if (isDataCell(cell)) {
                hideTooltip()
            }
        },
        [cell, hideTooltip]
    )

    return (
        <animated.div
            style={{
                position: 'absolute',
                top: animatedProps.y,
                left: animatedProps.x,
                width: animatedProps.size,
                height: animatedProps.size,
                background: animatedProps.fill,
                // opacity,
                boxSizing: 'content-box',
                borderStyle: 'solid',
                borderWidth: `${borderWidth}px`,
                // borderColor,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-test-id={testIdPrefix ? `${testIdPrefix}${cell.key}` : undefined}
        />
    )
}
