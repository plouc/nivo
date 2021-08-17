import { createElement, useCallback, useState } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { StreamCommonProps, StreamDatum, StreamSliceData } from './types'

interface StreamSlicesItemProps<RawDatum extends StreamDatum> {
    slice: StreamSliceData
    height: number
    tooltip: StreamCommonProps<RawDatum>['stackTooltip']
}

export const StreamSlicesItem = <RawDatum extends StreamDatum>({
    slice,
    height,
    tooltip,
}: StreamSlicesItemProps<RawDatum>) => {
    const [isHover, setIsHover] = useState(false)
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        event => {
            setIsHover(true)
            showTooltipFromEvent(createElement(tooltip, { slice }), event, 'left')
        },
        [setIsHover, showTooltipFromEvent, tooltip, slice]
    )

    const handleMouseLeave = useCallback(() => {
        setIsHover(false)
        hideTooltip()
    }, [setIsHover, hideTooltip])

    return (
        <g transform={`translate(${slice.x}, 0)`}>
            {isHover && (
                <line
                    x1={0}
                    x2={0}
                    y1={0}
                    y2={height}
                    stroke="#000"
                    strokeOpacity={0.35}
                    strokeWidth={1}
                />
            )}
            <rect
                x={-20}
                width={40}
                height={height}
                fill="#000"
                fillOpacity={0}
                onMouseEnter={handleMouseHover}
                onMouseMove={handleMouseHover}
                onMouseLeave={handleMouseLeave}
            />
        </g>
    )
}
