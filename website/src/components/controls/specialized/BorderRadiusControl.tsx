import React, { ChangeEvent } from 'react'
import isNumber from 'lodash/isNumber.js'
import styled from 'styled-components'
import { BorderRadius, BorderRadiusObject } from '@nivo/theming'
import { RoundedRect } from '@nivo/rects'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { BorderRadiusControlConfig, ControlContext } from '../types'
import { Control, Radio, TextInput } from '../ui'

const RECT_WIDTH = 42
const RECT_HEIGHT = 42
const BORDER_WIDTH = 1.5

type Mode = 'uniform' | 'horizontal' | 'vertical' | 'corners'

const MODES = ['uniform', 'horizontal', 'vertical', 'corners']
const MODE_OPTIONS = MODES.map(mode => ({
    value: mode,
    label: mode,
}))

const guessMode = (value: BorderRadius): Mode => {
    if (isNumber(value)) return 'uniform'

    const { top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight } =
        value as BorderRadiusObject

    if (top !== undefined || bottom !== undefined) {
        return 'vertical'
    }

    if (left !== undefined || right !== undefined) {
        return 'horizontal'
    }

    if (
        topLeft !== undefined ||
        topRight !== undefined ||
        bottomLeft !== undefined ||
        bottomRight !== undefined
    ) {
        return 'corners'
    }

    return 'uniform'
}

// Helper function to get value from object with fallbacks.
const getValueWithFallbacks = (obj: BorderRadiusObject, keys: (keyof BorderRadiusObject)[]) => {
    for (const key of keys) {
        if (obj[key] !== undefined) return obj[key] as number
    }
    return 0
}

interface BorderRadiusControlProps {
    id: string
    property: ChartPropertyWithControl<BorderRadiusControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: BorderRadius
    onChange: (value: BorderRadius) => void
    context?: ControlContext
}

export const BorderRadiusControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    context,
}: BorderRadiusControlProps) => {
    const mode = guessMode(value)

    const handleModeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.value as Mode
        if (newMode === mode) return

        // Convert from current mode to new mode
        if (mode === 'uniform') {
            const uniformValue = value as number
            switch (newMode) {
                case 'horizontal':
                    onChange({ left: uniformValue, right: uniformValue })
                    break
                case 'vertical':
                    onChange({ top: uniformValue, bottom: uniformValue })
                    break
                case 'corners':
                    onChange({
                        topLeft: uniformValue,
                        topRight: uniformValue,
                        bottomLeft: uniformValue,
                        bottomRight: uniformValue,
                    })
                    break
            }
        } else {
            const valueObj = value as BorderRadiusObject

            if (newMode === 'uniform') {
                // For uniform, just pick the first available value
                const keys =
                    mode === 'horizontal'
                        ? ['left', 'right']
                        : mode === 'vertical'
                          ? ['top', 'bottom']
                          : ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
                onChange(getValueWithFallbacks(valueObj, keys as (keyof BorderRadiusObject)[]))
            } else if (newMode === 'horizontal') {
                const leftValue =
                    mode === 'vertical'
                        ? getValueWithFallbacks(valueObj, ['top', 'bottom'])
                        : getValueWithFallbacks(valueObj, [
                              'topLeft',
                              'bottomLeft',
                              'topRight',
                              'bottomRight',
                          ])

                const rightValue =
                    mode === 'vertical'
                        ? leftValue
                        : getValueWithFallbacks(valueObj, [
                              'topRight',
                              'bottomRight',
                              'topLeft',
                              'bottomLeft',
                          ])

                onChange({ left: leftValue, right: rightValue })
            } else if (newMode === 'vertical') {
                const topValue =
                    mode === 'horizontal'
                        ? getValueWithFallbacks(valueObj, ['left', 'right'])
                        : getValueWithFallbacks(valueObj, [
                              'topLeft',
                              'topRight',
                              'bottomLeft',
                              'bottomRight',
                          ])

                const bottomValue =
                    mode === 'horizontal'
                        ? topValue
                        : getValueWithFallbacks(valueObj, [
                              'bottomLeft',
                              'bottomRight',
                              'topLeft',
                              'topRight',
                          ])

                onChange({ top: topValue, bottom: bottomValue })
            } else if (newMode === 'corners') {
                if (mode === 'horizontal') {
                    const leftValue = getValueWithFallbacks(valueObj, ['left', 'right'])
                    const rightValue = getValueWithFallbacks(valueObj, ['right', 'left'])
                    onChange({
                        topLeft: leftValue,
                        bottomLeft: leftValue,
                        topRight: rightValue,
                        bottomRight: rightValue,
                    })
                } else {
                    // vertical
                    const topValue = getValueWithFallbacks(valueObj, ['top', 'bottom'])
                    const bottomValue = getValueWithFallbacks(valueObj, ['bottom', 'top'])
                    onChange({
                        topLeft: topValue,
                        topRight: topValue,
                        bottomLeft: bottomValue,
                        bottomRight: bottomValue,
                    })
                }
            }
        }
    }

    const handeValueChange =
        (key: keyof BorderRadiusObject | 'uniform') => (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = Number(event.target.value)
            if (key === 'uniform') {
                onChange(newValue)
            } else {
                onChange({
                    ...(value as BorderRadiusObject),
                    [key]: newValue,
                })
            }
        }

    return (
        <Control
            id={id}
            property={property}
            flavors={flavors}
            currentFlavor={currentFlavor}
            context={context}
        >
            <Container>
                <Grid>
                    <div>
                        <Radio
                            value={mode}
                            columns={MODE_OPTIONS.length}
                            options={MODE_OPTIONS}
                            onChange={handleModeChange}
                        />
                    </div>
                    {mode === 'uniform' && (
                        <BorderRadiusValue
                            propId={id}
                            borderRadiusKey="uniform"
                            value={value as number}
                            onChange={handeValueChange('uniform')}
                        />
                    )}
                    {mode === 'horizontal' && (
                        <>
                            <BorderRadiusValue
                                propId={id}
                                borderRadiusKey="left"
                                value={(value as BorderRadiusObject).left}
                                onChange={handeValueChange('left')}
                            />
                            <BorderRadiusValue
                                propId={id}
                                borderRadiusKey="right"
                                value={(value as BorderRadiusObject).right}
                                onChange={handeValueChange('right')}
                            />
                        </>
                    )}
                    {mode === 'vertical' && (
                        <>
                            <BorderRadiusValue
                                propId={id}
                                borderRadiusKey="top"
                                value={(value as BorderRadiusObject).top}
                                onChange={handeValueChange('top')}
                            />
                            <BorderRadiusValue
                                propId={id}
                                borderRadiusKey="bottom"
                                value={(value as BorderRadiusObject).bottom}
                                onChange={handeValueChange('bottom')}
                            />
                        </>
                    )}
                    {mode === 'corners' && (
                        <>
                            <BorderRadiusValue
                                propId={id}
                                borderRadiusKey="topLeft"
                                value={(value as BorderRadiusObject).topLeft}
                                onChange={handeValueChange('topLeft')}
                            />
                            <BorderRadiusValue
                                propId={id}
                                borderRadiusKey="topRight"
                                value={(value as BorderRadiusObject).topRight}
                                onChange={handeValueChange('topRight')}
                            />
                            <BorderRadiusValue
                                propId={id}
                                borderRadiusKey="bottomLeft"
                                value={(value as BorderRadiusObject).bottomLeft}
                                onChange={handeValueChange('bottomLeft')}
                            />
                            <BorderRadiusValue
                                propId={id}
                                borderRadiusKey="bottomRight"
                                value={(value as BorderRadiusObject).bottomRight}
                                onChange={handeValueChange('bottomRight')}
                            />
                        </>
                    )}
                </Grid>
                <svg width={RECT_WIDTH + BORDER_WIDTH} height={RECT_HEIGHT + BORDER_WIDTH}>
                    <g transform={`translate(${BORDER_WIDTH / 2},${BORDER_WIDTH / 2})`}>
                        <PreviewRect width={RECT_WIDTH} height={RECT_HEIGHT} r={value} />
                    </g>
                </svg>
            </Container>
        </Control>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
`

const PreviewRect = styled(RoundedRect)`
    fill: ${({ theme }) => theme.colors.background};
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: ${BORDER_WIDTH}px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 8px;
    row-gap: 5px;
    margin-bottom: 5px;
    width: 340px;
    margin-right: 16px;

    & > div:first-child {
        grid-column-start: 1;
        grid-column-end: 3;
        display: flex;

        & > div {
            max-width: unset;
            width: 100%;
        }
    }
`

const BorderRadiusValue = ({
    propId,
    value,
    borderRadiusKey,
    onChange,
}: {
    propId: string
    value?: number
    borderRadiusKey: keyof BorderRadiusObject | 'uniform'
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) => {
    const id = `${propId}-${borderRadiusKey}`
    return (
        <ValueContainer>
            <label htmlFor={id}>{borderRadiusKey}</label>
            <TextInput
                id={id}
                type="number"
                unit="px"
                value={value ?? 0}
                onChange={onChange}
                isNumber={true}
                min={0}
                max={100}
            />
        </ValueContainer>
    )
}

const ValueContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
        flex: 1;
        text-align: right;
        margin-right: 9px;
        overflow: hidden;
    }

    & > div {
        width: 70px;
    }
`
