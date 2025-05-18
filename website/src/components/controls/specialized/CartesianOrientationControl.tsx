import React from 'react'
import styled from 'styled-components'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { Control, Select } from '../ui'
import { CartesianOrientationControlConfig, ControlContext } from '../types'

const BOX_WIDTH = 70
const BOX_HEIGHT = 70
const BOX_PADDING = 1.5
const DEFAULT_ARROW_LENGTH = 16
const ACTIVE_ARROW_LENGTH = 35
const ARROW_HEAD_WIDTH = 14
const ARROW_HEAD_HEIGHT = 7

export type Orientation = 'top' | 'right' | 'bottom' | 'left'
export type OrientationOption = {
    label: string
    value: Orientation
}

interface CartesianOrientationControlProps {
    id: string
    property: ChartPropertyWithControl<CartesianOrientationControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: string
    onChange: (value: string) => void
    context?: ControlContext
}

const DEFAULT_MAPPING: CartesianOrientationControlConfig['mapping'] = {
    top: { label: 'top', value: 'top' },
    right: { label: 'right', value: 'right' },
    bottom: { label: 'bottom', value: 'bottom' },
    left: { label: 'left', value: 'left' },
}

export const CartesianOrientationControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    context,
}: CartesianOrientationControlProps) => {
    const mapping = property.control.mapping ?? DEFAULT_MAPPING
    const invertedMapping: Record<string, Orientation> = {
        [mapping.top.value]: 'top',
        [mapping.right.value]: 'right',
        [mapping.bottom.value]: 'bottom',
        [mapping.left.value]: 'left',
    }
    const options: OrientationOption[] = [
        { label: mapping.top.label, value: 'top' },
        { label: mapping.right.label, value: 'right' },
        { label: mapping.bottom.label, value: 'bottom' },
        { label: mapping.left.label, value: 'left' },
    ]

    const orientation = invertedMapping[value]

    const handleChange = (orientation: Orientation) => {
        onChange(mapping[orientation].value)
    }

    const handleSelectChange = (option: OrientationOption | null) => {
        if (!option) return
        handleChange(option.value)
    }

    return (
        <Control
            id={id}
            property={property}
            flavors={flavors}
            currentFlavor={currentFlavor}
            context={context}
        >
            <Row>
                <svg width={BOX_WIDTH + BOX_PADDING * 2} height={BOX_HEIGHT + BOX_PADDING * 2}>
                    <g transform={`translate(${BOX_PADDING},${BOX_PADDING})`}>
                        <Rect width={BOX_WIDTH} height={BOX_HEIGHT} rx={2} />
                        <OrientationArea
                            orientation="top"
                            isActive={orientation === 'top'}
                            onChange={handleChange}
                        />
                        <OrientationArea
                            orientation="right"
                            isActive={orientation === 'right'}
                            onChange={handleChange}
                        />
                        <OrientationArea
                            orientation="bottom"
                            isActive={orientation === 'bottom'}
                            onChange={handleChange}
                        />
                        <OrientationArea
                            orientation="left"
                            isActive={orientation === 'left'}
                            onChange={handleChange}
                        />
                    </g>
                </svg>
                <Select<OrientationOption>
                    options={options}
                    value={options.find(option => option.value === orientation)}
                    isClearable={false}
                    onChange={handleSelectChange}
                />
            </Row>
        </Control>
    )
}

const Row = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
        margin-right: 10px;
    }

    > div {
        flex: 1;
        max-width: 260px;
    }
`

const Rect = styled.rect`
    fill: none;
    stroke: ${({ theme }) => theme.colors.border};
    stroke-width: 1px;
`

const OrientationArea = ({
    orientation,
    isActive,
    onChange,
}: {
    orientation: Orientation
    isActive: boolean
    onChange: (value: Orientation) => void
}) => {
    const [isHover, setIsHover] = React.useState(false)
    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }

    const arrowLength = isActive ? ACTIVE_ARROW_LENGTH : DEFAULT_ARROW_LENGTH

    let trianglePath: string
    let arrowPosition: [number, number]
    let arrowRotation: number = 0

    if (orientation === 'top') {
        trianglePath = `
            M 0 ${BOX_HEIGHT}
            L ${BOX_WIDTH} ${BOX_HEIGHT}
            L ${BOX_WIDTH / 2} ${BOX_HEIGHT / 2}
            Z
        `
        arrowPosition = [BOX_WIDTH / 2, BOX_HEIGHT]
        arrowRotation = -90
    } else if (orientation === 'right') {
        trianglePath = `
            M 0 0
            L ${BOX_WIDTH / 2} ${BOX_HEIGHT / 2}
            L 0 ${BOX_HEIGHT}
            Z
        `
        arrowPosition = [0, BOX_HEIGHT / 2]
    } else if (orientation === 'bottom') {
        trianglePath = `
            M 0 0
            L ${BOX_WIDTH} 0
            L ${BOX_WIDTH / 2} ${BOX_HEIGHT / 2}
            Z
        `
        arrowPosition = [BOX_WIDTH / 2, 0]
        arrowRotation = 90
    } else {
        trianglePath = `
            M ${BOX_WIDTH} 0
            L ${BOX_WIDTH} ${BOX_HEIGHT}
            L ${BOX_WIDTH / 2} ${BOX_HEIGHT / 2}
            Z
        `
        arrowPosition = [BOX_WIDTH, BOX_HEIGHT / 2]
        arrowRotation = 180
    }

    return (
        <>
            <OrientationAreaTriangle
                d={trianglePath}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                    onChange(orientation)
                }}
            />
            <g
                transform={`translate(${arrowPosition[0]},${arrowPosition[1]}) rotate(${arrowRotation})`}
                style={{ pointerEvents: 'none' }}
            >
                <OrientationArrow
                    isActive={isActive}
                    isHover={isHover}
                    d={`
                        M 0 0
                        L ${arrowLength} 0
                        M ${arrowLength - ARROW_HEAD_HEIGHT} -${ARROW_HEAD_WIDTH / 2}
                        L ${arrowLength} 0
                        L ${arrowLength - ARROW_HEAD_HEIGHT} ${ARROW_HEAD_WIDTH / 2}
                    `}
                />
            </g>
        </>
    )
}

const OrientationAreaTriangle = styled.path`
    fill-opacity: 0;
    fill: ${({ theme }) => theme.colors.textLight};
    cursor: pointer;
`

const OrientationArrow = styled.path<{ isActive: boolean; isHover: boolean }>`
    pointer-events: none;
    fill: none;
    stroke: ${({ theme, isActive, isHover }) => {
        if (isActive || isHover) return theme.colors.accent
        return theme.colors.border
    }};
    stroke-width: ${({ isActive, isHover }) => {
        if (isActive) return 3
        if (isHover) return 2
        return 1
    }}px;
    stroke-linecap: round;
    opacity: 0.66;
`
