import React, { memo, useCallback, MouseEvent } from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'
import media from '../../../theming/mediaQueries'
import { ChartNavData } from '../../../types'

export const ComponentsGridItem = memo(({ name, id, flavors }: ChartNavData) => {
    const theme = useTheme()

    const handleVariantClick = useCallback((event: MouseEvent) => {
        event.stopPropagation()
    }, [])

    return (
        <Container>
            <Icon className={`sprite-icons-${id}-${theme.id}-colored`} />
            <Header>
                <Name>{name}</Name>
                <Flavors>
                    <Flavor to={`/${id}/`}>SVG</Flavor>
                    {flavors.html && (
                        <Flavor onClick={handleVariantClick} to={`/${id}/html/`}>
                            HTML
                        </Flavor>
                    )}
                    {flavors.canvas && (
                        <Flavor onClick={handleVariantClick} to={`/${id}/canvas/`}>
                            Canvas
                        </Flavor>
                    )}
                    {flavors.api && (
                        <Flavor onClick={handleVariantClick} to={`/${id}/api/`}>
                            API
                        </Flavor>
                    )}
                </Flavors>
            </Header>
        </Container>
    )
})

const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBackground};
    border-radius: 2px;
    padding: 12px;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.cardBackground};
    box-shadow: ${({ theme }) => theme.cardShadow};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &:focus,
    &:hover {
        box-shadow: none;
        border-color: ${({ theme }) => theme.colors.accent};
        outline: 0;
    }

    ${media.mobile`
        & {
            border-width: 0;
            border-top-width: 1px;
            border-color: ${({ theme }) => theme.colors.borderLight};
            box-shadow: none;
        }
    
        &:focus,
        &:hover {
            background-color: ${({ theme }) => theme.colors.background};
            border-color: ${({ theme }) => theme.colors.borderLight};
        }
    
        &:first-child {
            border-top-width: 0;
        }    
    `}
`

const Header = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`

const Name = styled.span`
    font-size: 15px;
    font-weight: 600;
`

const Icon = styled.span`
    margin-right: 15px;
    display: block;
    width: 52px;
    height: 52px;
`

const Flavors = styled.div`
    font-size: 0.8rem;
    line-height: 0.8rem;
    margin-top: 4px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const Flavor = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    font-size: 0.75rem;
    line-height: 1em;
    font-weight: 700;
    padding: 3px 4px;
    margin-right: 3px;
    margin-bottom: 3px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    color: #ffffff;

    &:hover {
        background-color: ${({ theme }) => theme.colors.cardBackground};
        color: ${({ theme }) => theme.colors.accent};
    }
`
