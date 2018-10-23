import React, { Component } from 'react'
import PropTypes from 'prop-types'

const StartIcon = ({ size, isSelected }) => (
    <svg width={size} height={size}>
        <line
            stroke="#f88d81"
            strokeWidth={2}
            x1={11}
            x2={size}
            y1={size / 2}
            y2={size / 2}
            opacity={isSelected ? 1 : 0.6}
        />
        <circle r={3} fill="#e25d47" cx={8} cy={size / 2} opacity={isSelected ? 1 : 0.6} />
        <rect
            x={0.5}
            y={0.5}
            width={size - 1}
            height={size - 1}
            fill="none"
            stroke={isSelected ? '#bbb' : '#ddd'}
            strokeWidth={1}
            rx={0}
            ry={0}
        />
    </svg>
)

const MiddleIcon = ({ size, isSelected }) => (
    <svg width={size} height={size}>
        <line
            stroke="#f88d81"
            strokeWidth={2}
            x1={0}
            x2={size / 2 - 3}
            y1={size / 2}
            y2={size / 2}
            opacity={isSelected ? 1 : 0.6}
        />
        <line
            stroke="#f88d81"
            strokeWidth={2}
            x1={size / 2 + 3}
            x2={size}
            y1={size / 2}
            y2={size / 2}
            opacity={isSelected ? 1 : 0.6}
        />
        <circle r={3} fill="#e25d47" cx={size / 2} cy={size / 2} opacity={isSelected ? 1 : 0.6} />
        <rect
            x={0.5}
            y={0.5}
            width={size - 1}
            height={size - 1}
            fill="none"
            stroke={isSelected ? '#bbb' : '#ddd'}
            strokeWidth={1}
            rx={0}
            ry={0}
        />
    </svg>
)

const EndIcon = ({ size, isSelected }) => (
    <svg width={size} height={size}>
        <line
            stroke="#f88d81"
            strokeWidth={2}
            x1={0}
            x2={size - 11}
            y1={size / 2}
            y2={size / 2}
            opacity={isSelected ? 1 : 0.6}
        />
        <circle r={3} fill="#e25d47" cx={size - 8} cy={size / 2} opacity={isSelected ? 1 : 0.6} />
        <rect
            x={0.5}
            y={0.5}
            width={size - 1}
            height={size - 1}
            fill="none"
            stroke={isSelected ? '#bbb' : '#ddd'}
            strokeWidth={1}
            rx={0}
            ry={0}
        />
    </svg>
)

const BarHorizontal = ({ size, isSelected }) => (
    <svg width={size} height={size}>
        <rect
            fill="#e25d47"
            width={size * 0.7}
            height={4}
            x={size * 0.15}
            y={size / 2 - 9}
            opacity={isSelected ? 1 : 0.6}
        />
        <rect
            fill="#e25d47"
            width={size * 0.7}
            height={4}
            x={size * 0.15}
            y={size / 2 - 2}
            opacity={isSelected ? 1 : 0.6}
        />
        <rect
            fill="#e25d47"
            width={size * 0.7}
            height={4}
            x={size * 0.15}
            y={size / 2 + 5}
            opacity={isSelected ? 1 : 0.6}
        />
        <rect
            x={0.5}
            y={0.5}
            width={size - 1}
            height={size - 1}
            fill="none"
            stroke={isSelected ? '#bbb' : '#ddd'}
            strokeWidth={1}
            rx={0}
            ry={0}
        />
    </svg>
)

const BarVertical = ({ size, isSelected }) => (
    <svg width={size} height={size}>
        <rect
            fill="#e25d47"
            width={4}
            height={size * 0.7}
            x={size / 2 - 9}
            y={size * 0.15}
            opacity={isSelected ? 1 : 0.6}
        />
        <rect
            fill="#e25d47"
            width={4}
            height={size * 0.7}
            x={size / 2 - 2}
            y={size * 0.15}
            opacity={isSelected ? 1 : 0.6}
        />
        <rect
            fill="#e25d47"
            width={4}
            height={size * 0.7}
            x={size / 2 + 5}
            y={size * 0.15}
            opacity={isSelected ? 1 : 0.6}
        />
        <rect
            x={0.5}
            y={0.5}
            width={size - 1}
            height={size - 1}
            fill="none"
            stroke={isSelected ? '#bbb' : '#ddd'}
            strokeWidth={1}
            rx={0}
            ry={0}
        />
    </svg>
)

const icons = {
    start: StartIcon,
    middle: MiddleIcon,
    end: EndIcon,
    'bar-horizontal': BarHorizontal,
    'bar-vertical': BarVertical,
}

export default class RadioIcon extends Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        isSelected: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        size: 28,
    }

    render() {
        const { size, isSelected } = this.props
        const icon = icons[this.props.icon]

        if (!icon) <span>none</span>

        return icon({ size, isSelected })
    }
}
