import { useCallback, useMemo, useState } from 'react'
import { TableTooltip, Chip } from '@nivo/tooltip'
import { useTooltip } from '@nivo/tooltip'
import { StreamSliceData } from './types'

interface StreamSlicesItemProps {
    slice: StreamSliceData
    height: number
}

export const StreamSlicesItem = ({ slice, height }: StreamSlicesItemProps) => {
    const [isHover, setIsHover] = useState(false)
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const rows = useMemo(
        () =>
            slice.stack.map(p => [
                <Chip key={p.layerId} color={p.color} />,
                p.layerLabel,
                p.formattedValue,
            ]),
        [slice]
    )

    const handleMouseHover = useCallback(
        event => {
            setIsHover(true)
            showTooltipFromEvent(<TableTooltip rows={rows} />, event, 'left')
        },
        [setIsHover, showTooltipFromEvent, rows]
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
