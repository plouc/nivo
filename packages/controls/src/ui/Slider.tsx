import styled, { css } from 'styled-components'
import { generateInputId } from '../helpers'
import { useCallback, ChangeEvent } from 'react'

interface SliderProps {
    id: string
    min: number
    max: number
    step?: number
    value: number
    onChange?: (value: number) => void
}

export const Slider = ({ id, min, max, step, value, onChange: _onChange }: SliderProps) => {
    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            _onChange?.(Number(event.target.value))
        },
        [_onChange]
    )

    return (
        <Input
            id={generateInputId(id, 'range')}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
        />
    )
}

const trackStyle = css`
    position: absolute;
    top: 7px;
    left: 0;
    margin: 0;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    cursor: pointer;
    box-shadow: none;
    background: ${({ theme }) => theme.colors.border};
    border: none;
    transition: all 200ms;
`

const activeTrackStyle = css`
    height: 18px;
    top: 0;
`

const thumbStyle = css`
    border-radius: 2px;
    margin-top: -7px;
    width: 18px;
    height: 18px;
    background: ${({ theme }) => theme.colors.accent};
    border: none;
    cursor: pointer;
    transition: all 200ms;
`

const activeThumbStyle = css`
    margin-top: 0;
`

export const Input = styled.input`
    height: 18px;
    -webkit-appearance: none;
    margin: 0;
    width: 100%;
    background: none;
    position: relative;

    &:focus {
        outline: none;
    }

    &::-webkit-slider-runnable-track {
        ${trackStyle}
    }
    &:focus::-webkit-slider-runnable-track {
        ${activeTrackStyle}
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        ${thumbStyle}
    }
    &:focus::-webkit-slider-thumb {
        ${activeThumbStyle}
    }

    &::-moz-range-track {
        ${trackStyle}
    }
    &::-moz-range-progress {
        ${trackStyle}
    }
    &:focus::-moz-range-track {
        ${activeTrackStyle}
    }
    &::-moz-range-thumb {
        ${thumbStyle}
    }
    &:focus::-moz-range-thumb {
        ${activeThumbStyle}
    }
`
