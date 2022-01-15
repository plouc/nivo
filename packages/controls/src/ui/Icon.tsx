import { ReactNode, createElement } from 'react'
import {
    FiBook,
    FiCheck,
    FiTag,
    FiCrosshair,
    FiType,
    FiSliders,
    FiHash,
    FiImage,
} from 'react-icons/fi'
import styled from 'styled-components'

export const iconByType = {
    book: FiBook,
    check: FiCheck,
    tag: FiTag,
    crosshair: FiCrosshair,
    type: FiType,
    sliders: FiSliders,
    hash: FiHash,
    image: FiImage,
}

export type IconType = keyof typeof iconByType

interface IconProps {
    type: IconType | ReactNode
}

export const Icon = ({ type }: IconProps) => {
    if (typeof type === 'string' && type in iconByType) {
        return <Container>{createElement(iconByType[type as IconType])}</Container>
    }

    return <>{type}</>
}

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-right: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
`
