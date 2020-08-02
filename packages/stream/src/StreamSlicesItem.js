/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { TableTooltip, Chip } from '@nivo/tooltip'
import { useTooltip } from '@nivo/tooltip'

const StreamSlicesItem = ({ slice, height, getTooltipLabel, getTooltipValue }) => {
    const [isHover, setIsHover] = useState(false)
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const rows = useMemo(
        () =>
            slice.stack.map(p => [
                <Chip key={p.id} color={p.color} />,
                getTooltipLabel(p),
                getTooltipValue(p.value),
            ]),
        [slice, getTooltipLabel, getTooltipValue]
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

StreamSlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    getTooltipLabel: PropTypes.func.isRequired,
    getTooltipValue: PropTypes.func.isRequired,
}

export default memo(StreamSlicesItem)
