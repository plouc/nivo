/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import media from '../../../theming/mediaQueries'
import { useTheme } from '../../../theming/context'

const Container = styled(Link)`
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    border-radius: 2px;
    padding: 12px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.cardBackground};
    box-shadow: ${({ theme }) => theme.cardShadow};
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:focus,
    &:hover {
        color: ${({ theme }) => theme.colors.accent};
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

const Tags = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textLight};
    line-height: 1em;
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
`

const Tag = styled.span`
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 6px;
    border-left: 1px solid ${({ theme }) => theme.colors.accent};
    padding-left: 7px;

    &:first-child {
        padding-left: 0;
        border-left: none;
    }
`

const ComponentsGridItem = memo(({ path, name, icon, tags }) => {
    const theme = useTheme()

    return (
        <Container to={path}>
            <Icon className={`sprite-icons-${icon}-${theme.id}-colored`} />
            <Header>
                <Name>{name}</Name>
                {tags.length > 0 && (
                    <Tags>
                        {tags.map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </Tags>
                )}
            </Header>
        </Container>
    )
})

export default ComponentsGridItem
