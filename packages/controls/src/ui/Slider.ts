import styled from 'styled-components'

export const Slider = styled.input`
    height: 18px;
    -webkit-appearance: none;
    margin: 0;
    width: 100%;
    background: none;

    &:focus {
        outline: none;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 18px;
        cursor: pointer;
        box-shadow: none;
        background: ${({ theme }) => theme.colors.accent}33;
        border-radius: 2px;
        border: none;
    }
    &::-moz-range-track {
        width: 100%;
        height: 18px;
        cursor: pointer;
        box-shadow: none;
        background: ${({ theme }) => theme.colors.accent}33;
        border-radius: 2px;
        border: none;
    }
    &:hover::-webkit-slider-runnable-track,
    &:focus::-webkit-slider-runnable-track {
        background: ${({ theme }) => theme.colors.accent}55;
    }
    &:hover::-moz-range-track,
    &:focus::-moz-range-track {
        background: ${({ theme }) => theme.colors.accent}55;
    }

    &::-webkit-slider-thumb {
        border-radius: 2px;
        width: 18px;
        height: 18px;
        background: ${({ theme }) => theme.colors.accent};
        border: none;
        cursor: pointer;
        -webkit-appearance: none;
    }
    &::-moz-range-thumb {
        border-radius: 2px;
        width: 18px;
        height: 18px;
        background: ${({ theme }) => theme.colors.accent};
        border: none;
        cursor: pointer;
    }
    &:focus::-webkit-slider-thumb,
    &:focus::-moz-range-thumb {
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}55;
    }
`
