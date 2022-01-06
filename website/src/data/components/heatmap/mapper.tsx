import React from 'react'
import { settingsMapper, mapAxis, mapFormat } from '../../../lib/settings'

const CustomCell = ({
    value,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    textColor,
}) => (
    <g transform={`translate(${x}, ${y})`}>
        <path
            transform={`rotate(${value < 50 ? 180 : 0})`}
            fill={color}
            fillOpacity={opacity}
            strokeWidth={borderWidth}
            stroke={borderColor}
            d={`
                M0 -${Math.round(height / 2)}
                L${Math.round(width / 2)} ${Math.round(height / 2)}
                L-${Math.round(width / 2)} ${Math.round(height / 2)}
                L0 -${Math.round(height / 2)}
            `}
        />
        <text
            alignmentBaseline="central"
            textAnchor="middle"
            style={{ fill: textColor }}
            dy={value < 50 ? -6 : 6}
        >
            {value}
        </text>
    </g>
)

export default settingsMapper(
    {
        valueFormat: mapFormat,
        cellShape: (value: string) => {
            if (value === `Custom(props) => (…)`) return CustomCell
            return value
        },
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
        legends: (legends: any[]) => {
            return legends.map(legend => ({
                ...legend,
                tickFormat: mapFormat(legend.tickFormat),
            }))
        },
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)
