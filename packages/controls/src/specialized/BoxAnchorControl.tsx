import styled from 'styled-components'
import { BoxAnchorControlProps, BoxAnchor } from '../types'
import { ControlContainer, Header } from '../ui'

const boxWidth = 80
const boxHeight = 50
const boxPadding = 10
const outlineRadius = 8

const anchors: [BoxAnchor, number, number][] = [
    ['center', boxWidth / 2, boxHeight / 2],
    ['top-left', 0, 0],
    ['top', boxWidth / 2, 0],
    ['top-right', boxWidth, 0],
    ['right', boxWidth, boxHeight / 2],
    ['bottom-right', boxWidth, boxHeight],
    ['bottom', boxWidth / 2, boxHeight],
    ['bottom-left', 0, boxHeight],
    ['left', 0, boxHeight / 2],
]

export const BoxAnchorControl = ({
    name,
    value,
    onChange,
    context = { path: [] },
}: BoxAnchorControlProps) => {
    return (
        <ControlContainer name={name}>
            <Container>
                <div>
                    <Header name={name} context={context} />
                    <Value>{value}</Value>
                </div>
                <svg width={boxWidth + boxPadding * 2} height={boxHeight + boxPadding * 2}>
                    <g transform={`translate(${boxPadding},${boxPadding})`}>
                        <Rect width={boxWidth} height={boxHeight} />
                        {anchors.map(anchor => {
                            const isSelected = value === anchor[0]

                            return (
                                <g
                                    key={anchor[0]}
                                    transform={`translate(${anchor[1]},${anchor[2]})`}
                                >
                                    <Dot isSelected={isSelected} r={isSelected ? 3 : 2} />
                                    <DotOutline
                                        isSelected={isSelected}
                                        r={outlineRadius}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            onChange?.(anchor[0])
                                        }}
                                    />
                                </g>
                            )
                        })}
                    </g>
                </svg>
            </Container>
        </ControlContainer>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Rect = styled.rect`
    fill: none;
    stroke: ${({ theme }) => theme.colors.textLight};
    stroke-width: 2px;
    stroke-opacity: 0.6;
`

const Dot = styled.circle<{
    isSelected: boolean
}>`
    fill: ${({ isSelected, theme }) => (isSelected ? theme.colors.accent : theme.colors.textLight)};
`

const DotOutline = styled.circle<{
    isSelected: boolean
}>`
    fill: red;
    fill-opacity: 0;
    stroke-width: 2px;
    stroke: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.accent : theme.colors.textLight};
    stroke-opacity: ${({ isSelected }) => (isSelected ? 1 : 0)};

    &:hover {
        stroke-opacity: 1;
    }
`

const Value = styled.span`
    margin-left: 20px;
`
