import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Margin, MarginControlProps } from '../types'
import {
    ControlContainer,
    Label,
    Slider,
    YGapSpacer,
    ControlHeader,
    TextInput,
    XGapSpacer,
} from '../ui'

type Side = keyof Margin

export const MarginControl = ({
    id,
    label,
    icon,
    min = 0,
    max = 200,
    value,
    onChange: _onChange,
    context = { path: [] },
}: MarginControlProps) => {
    const [side, setSide] = useState<Side>('top')
    const onChange = useCallback(
        (sideValue: number) => {
            _onChange?.({
                ...value,
                [side]: sideValue,
            })
        },
        [value, side, _onChange]
    )

    return (
        <ControlContainer id={id} isSingleRow={false}>
            <ControlHeader>
                <LabelContainer>
                    <Label id={id} label={label} icon={icon} context={context} />
                    <YGapSpacer />
                    <InlineValues>
                        <InlineValue $isActive={side === 'top'} onClick={() => setSide('top')}>
                            {value.top}
                        </InlineValue>
                        <InlineValue $isActive={side === 'right'} onClick={() => setSide('right')}>
                            {value.right}
                        </InlineValue>
                        <InlineValue
                            $isActive={side === 'bottom'}
                            onClick={() => setSide('bottom')}
                        >
                            {value.bottom}
                        </InlineValue>
                        <InlineValue $isActive={side === 'left'} onClick={() => setSide('left')}>
                            {value.left}
                        </InlineValue>
                    </InlineValues>
                </LabelContainer>
                <XGapSpacer />
                <Illustration side={side} setSide={setSide} />
            </ControlHeader>
            <YGapSpacer />
            <div>
                <ControlHeader>
                    <Label id={`${id}.${side}`} label={side} context={{ path: [] }} />
                    <TextInput<number>
                        id={`${id}.${side}`}
                        value={value[side]}
                        isNumber={true}
                        unit="px"
                        onChange={onChange}
                    />
                </ControlHeader>
                <YGapSpacer />
                <Slider
                    id={`${id}.${side}`}
                    min={min}
                    max={max}
                    value={value[side]}
                    onChange={onChange}
                />
            </div>
        </ControlContainer>
    )
}

const Illustration = ({ side, setSide }: { side: Side; setSide: (side: Side) => void }) => {
    return (
        <IllustrationContainer>
            <svg viewBox="0 0 42 42">
                <g transform="translate(1, 1)">
                    <Rect width={40} height={40} />
                    <SideGroup $isActive={side === 'top'}>
                        <Shape width={40} height={12} />
                        <HoverIndicator x2={40} />
                        <Path
                            d={`
                                M 0,0
                                L 20,20
                                L 40,0
                            `}
                            onClick={() => setSide('top')}
                        />
                    </SideGroup>
                    <SideGroup $isActive={side === 'right'}>
                        <Shape x={28} width={12} height={40} />
                        <HoverIndicator x1={40} x2={40} y2={40} />
                        <Path
                            d={`
                                M 40,0
                                L 20,20
                                L 40,40
                            `}
                            onClick={() => setSide('right')}
                        />
                    </SideGroup>
                    <SideGroup $isActive={side === 'bottom'}>
                        <Shape y={28} width={40} height={12} />
                        <HoverIndicator y1={40} x2={40} y2={40} />
                        <Path
                            d={`
                                M 0,40
                                L 20,20
                                L 40,40
                            `}
                            onClick={() => setSide('bottom')}
                        />
                    </SideGroup>
                    <SideGroup $isActive={side === 'left'}>
                        <Shape width={12} height={40} />
                        <HoverIndicator y2={40} />
                        <Path
                            d={`
                                M 0,0
                                L 20,20
                                L 0,40
                            `}
                            onClick={() => setSide('left')}
                        />
                    </SideGroup>
                </g>
            </svg>
        </IllustrationContainer>
    )
}

const LabelContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const InlineValues = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: ${({ theme }) => theme.spacing.controlGapX}px;
`

const InlineValue = styled.span<{
    $isActive: boolean
}>`
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    background-color: ${({ theme }) => theme.colors.inputBackground};
    padding: 3px 4px;
    line-height: 1em;
    border-radius: ${({ theme }) => theme.borderRadius.input}px;
    color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text : theme.colors.textLight)};
    font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
`

const IllustrationContainer = styled.div`
    width: 46px;
`

const Rect = styled.rect`
    fill: none;
    stroke: ${({ theme }) => theme.colors.border};
`

const Path = styled.path`
    fill: rgba(255, 0, 0, 0);
`

const Shape = styled.rect`
    pointer-events: none;
    fill: ${({ theme }) => theme.colors.accent}33;
`

const HoverIndicator = styled.line`
    pointer-events: none;
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 2;
    stroke-linecap: round;
`

const SideGroup = styled.g<{
    $isActive: boolean
}>`
    cursor: pointer;

    ${Shape} {
        visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
    }

    & ${HoverIndicator} {
        stroke-width: ${({ $isActive }) => ($isActive ? 1 : 0)};
    }

    &:hover ${HoverIndicator} {
        stroke-width: 2;
    }
`
