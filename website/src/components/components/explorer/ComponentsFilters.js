/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import media from '../../../theming/mediaQueries'

const filters = ['SVG', 'HTML', 'Canvas', 'HTTP API']

const ComponentsFilters = memo(({ filter: currentFilter, onChange }) => {
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
                    isActive={currentFilter && filter.toLowerCase() === currentFilter.toLowerCase()}
                    onClick={() => {
                        onChange(filter)
                    }}
                >
                    {filter}
                </Item>
            ))}
        </Container>
    )
})

ComponentsFilters.displayName = 'ComponentsFilters'
ComponentsFilters.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default ComponentsFilters

const Container = styled.div`
    display: flex;
    border: 2px solid ${({ theme }) => theme.colors.accent};
    height: 42px;
    border-radius: 2px;
    overflow: hidden;
    font-size: 13px;
    font-weight: 700;
`

const Item = styled.span`
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
