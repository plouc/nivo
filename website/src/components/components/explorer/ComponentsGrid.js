/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ComponentsGridItem from './ComponentsGridItem'
import * as nav from '../../../data/nav'
import media from '../../../theming/mediaQueries'

const Grid = styled.div`
    display: grid;
    grid-row-gap: 15px;
    margin-bottom: 30px;

    ${media.desktopLarge`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 30px;
        }
    `}

    ${media.desktop`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 20px;
        }
    `}

    ${media.tablet`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 20px;
        }
    `}

    ${media.mobile`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 0;
            box-shadow: ${({ theme }) => theme.cardShadow};
        }
    `}
`

const Empty = styled.div`
    margin-top: 120px;
    text-align: center;
`

const EmptyIcon = styled.span`
    font-size: 64px;
    display: block;
    margin-bottom: 50px;
    white-space: pre;
    color: ${({ theme }) => theme.colors.accent};
`

const getFilterFunction = (term, filter) => {
    let predicates = []
    if (term && term.length > 0) {
        predicates.push(({ label }) => label.toLowerCase().includes(term.toLowerCase()))
    }
    if (filter) {
        predicates.push(({ tags }) =>
            tags.map(tag => tag.toLowerCase()).includes(filter.toLowerCase())
        )
    }

    return item => predicates.every(predicate => predicate(item))
}

export default class ComponentsGrid extends Component {
    static propTypes = {
        filter: PropTypes.string,
        term: PropTypes.string,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        onClick: () => {},
    }

    render() {
        const { term, filter, onClick } = this.props

        let items = nav.allComponents
        if (term || filter) {
            const filterFunction = getFilterFunction(term, filter)
            items = nav.allComponents.filter(filterFunction)
        }

        if (items.length === 0) {
            return (
                <Empty>
                    <EmptyIcon>{`¯\\_(ツ)_/¯`}</EmptyIcon>
                    <div>no result, sorry…</div>
                </Empty>
            )
        }

        return (
            <Grid>
                {items.map(item => (
                    <ComponentsGridItem
                        key={item.path}
                        path={item.path}
                        name={item.label}
                        icon={item.icon}
                        tags={item.tags}
                        onClick={onClick}
                    />
                ))}
            </Grid>
        )
    }
}
