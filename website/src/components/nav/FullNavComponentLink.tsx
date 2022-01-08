import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'gatsby'
import media from '../../theming/mediaQueries'
import { ChartNavData } from '../../types'

export const FullNavComponentLink = ({ name, id, flavors }: ChartNavData) => {
    const theme = useTheme()

    return (
        <Container>
            <IconContainer>
                <Icon className={`sprite-icons-${id}-${theme.id}-colored`} />
            </IconContainer>
            <Content>
                <Name>{name}</Name>
                <Flavors>
                    <Flavor to={`/${id}/`}>SVG</Flavor>
                    {flavors.html && <Flavor to={`/${id}/html/`}>HTML</Flavor>}
                    {flavors.canvas && <Flavor to={`/${id}/canvas/`}>Canvas</Flavor>}
                    {flavors.api && <Flavor to={`/${id}/api/`}>API</Flavor>}
                </Flavors>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: calc(33.3% - 16px);
    margin-right: 24px;
    margin-bottom: 13px;
    font-size: 0.9rem;
    display: flex;
    align-items: flex-start;
    overflow: hidden;

    ${media.desktopLarge`
        &:nth-child(3n+1) {
            margin-right: 0;
        }
    `}

    ${media.desktop`
        &:nth-child(3n+1) {
            margin-right: 0;
        }
    `}
    
    ${media.tablet`
        & {
            width: calc(50% - 12px);
            margin-right: 24px;
        }
        
        &:nth-child(2n+1) {
            margin-right: 0;
        }
    `}

    ${media.mobile`
        & {
            width: calc(50% - 9px);
            margin-right: 18px;
        }
        
        &:nth-child(2n+1) {
            margin-right: 0;
        }
    `}
`

const Content = styled.div`
    margin-left: 6px;
    flex: 1;
`

const IconContainer = styled.span`
    width: 42px;
    height: 42px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
`

const Icon = styled.span`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
    transform: scale(0.74);
    transform-origin: top left;
`

const Name = styled.h4`
    color: ${({ theme }) => theme.colors.text};
    line-height: 1em;
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    margin: 0 0 6px;
    padding: 0;
`

const Flavors = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
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

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.cardBackground};
        color: ${({ theme }) => theme.colors.accent};
    }
`
