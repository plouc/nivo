import React from 'react'
import { storiesOf } from '@storybook/react'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import { Bump } from '../src'

const generateData = () => {
    const years = range(2000, 2005)
    const ranks = range(1, 7)

    const series = ranks.map(rank => {
        return {
            id: `Serie ${rank}`,
            data: [],
        }
    })

    years.forEach(year => {
        shuffle(ranks).forEach((rank, i) => {
            series[i].data.push({
                x: year,
                y: rank,
                extra: Math.random(),
            })
        })
    })

    return series
}

const commonProps = {
    width: 900,
    height: 360,
    margin: { top: 40, right: 100, bottom: 40, left: 100 },
    titleOffsetX: -80,
    data: generateData(),
    spacing: 80,
}

const stories = storiesOf('Bump', module)

stories.add('default', () => <Bump {...commonProps} />)

const CustomPoint = ({ x, y, isActive, isInactive, size, color, borderColor, borderWidth }) => {
    return (
        <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
            <rect
                x={size * -0.5 - 4}
                y={size * -0.5 + 4}
                width={size + borderWidth}
                height={size + borderWidth}
                fill="rgba(0, 0, 0, .07)"
            />
            <rect
                x={size * -0.5}
                y={size * -0.5}
                width={size}
                height={size}
                fill={color}
                stroke={borderColor}
                strokeWidth={borderWidth}
            />
            {isActive && (
                <text textAnchor="middle" y={4} fill={borderColor}>
                    A
                </text>
            )}
            {isInactive && (
                <text textAnchor="middle" y={4} fill={borderColor}>
                    I
                </text>
            )}
        </g>
    )
}

stories.add('Custom points', () => (
    <Bump
        {...commonProps}
        pointComponent={CustomPoint}
        pointSize={20}
        activePointSize={24}
        inactivePointSize={16}
        pointBorderWidth={2}
        activePointBorderWidth={4}
        inactivePointBorderWidth={1}
        pointColor="#ffffff"
        pointBorderColor={{ from: 'serie.color' }}
    />
))

stories.add('Missing data', () => <Bump {...commonProps} />)
