import React, { memo } from 'react'
import styled from 'styled-components'
import media from '../../../theming/mediaQueries'

const filters = ['SVG', 'HTML', 'Canvas', 'API'] as const

interface ComponentsFiltersProps {
    filter: string | null
    onChange: (filter: string | null) => void
}

export const ComponentsFilters = memo(
    ({ filter: currentFilter, onChange }: ComponentsFiltersProps) => {
        return (
            <Container>
                <Item
                    isActive={currentFilter === null}
                    onClick={() => {
                        onChange(null)
                    }}
                >
                    All
                </Item>
                {filters.map(filter => (
                    <Item
                        key={filter}
                        isActive={
                            currentFilter !== null &&
                            filter.toLowerCase() === currentFilter.toLowerCase()
                        }
                        onClick={() => {
                            onChange(filter)
                        }}
                    >
                        {filter}
                    </Item>
                ))}
            </Container>
        )
    }
)

const Container = styled.div`
    display: flex;
    border: 2px solid ${({ theme }) => theme.colors.accent};
    height: 42px;
    border-radius: 2px;
    overflow: hidden;
    font-size: 13px;
    font-weight: 700;
`

const Item = styled.span<{
    isActive: boolean
}>`
    line-height: 38px;
    background: ${({ isActive, theme }) =>
        isActive ? theme.colors.accent : theme.colors.cardBackground};
    color: ${({ isActive, theme }) =>
        isActive ? theme.colors.cardBackground : theme.colors.accent};
    flex: 1;
    text-align: center;
    cursor: pointer;
    border-left: 1px solid ${({ theme }) => theme.colors.accent};
    padding: 0 26px;

    &:first-child {
        border-left-width: 0;
    }

    ${media.tablet`
        & {
            padding: 0 12px;
        }
    `}

    ${media.mobile`
        & {
            padding: 0 12px;
        }
    `}
`
