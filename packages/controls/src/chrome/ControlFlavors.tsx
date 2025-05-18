import { memo } from 'react'
import styled from 'styled-components'
import { ChartFlavor } from '../types'

interface PropertyFlavorsProps {
    flavors: ChartFlavor[]
    supportedFlavors: ChartFlavor[]
}

export const ControlFlavors = memo(({ flavors, supportedFlavors }: PropertyFlavorsProps) => (
    <Container>
        <Label>support</Label>
        {flavors.map(flavor => (
            <Flavor key={flavor} isSupported={supportedFlavors.includes(flavor)}>
                {flavor}
            </Flavor>
        ))}
    </Container>
))

const Container = styled.div`
    margin-top: 9px;
    display: inline-flex;
    align-items: center;
    border-radius: 2px;
`

const Label = styled.span`
    font-size: 12px;
    font-weight: 600;
    margin-right: 9px;
`

const Flavor = styled.span<{ isSupported: boolean }>`
    font-size: 11px;
    line-height: 1em;
    font-weight: ${({ isSupported }) => (isSupported ? 600 : 400)};
    padding: 3px 8px 5px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-right-width: 0;
    text-decoration: ${({ isSupported }) => (isSupported ? 'normal' : 'line-through')};
    color: ${({ isSupported, theme }) =>
        isSupported ? theme.colors.text : theme.colors.textLight};

    &:last-child {
        border-right-width: 1px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }
`
