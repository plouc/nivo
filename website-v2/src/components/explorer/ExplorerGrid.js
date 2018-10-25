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
import ExplorerGridItem from './ExplorerGridItem'

// .components__grid
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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

export default class ExplorerGrid extends Component {
    static propTypes = {
        filter: PropTypes.string,
        term: PropTypes.string,
        onClick: PropTypes.func,
        components: PropTypes.array.isRequired,
    }

    static defaultProps = {
        onClick: () => {},
    }

    render() {
        const { components, term, filter, onClick } = this.props

        let items = components
        if (term || filter) {
            const filterFunction = getFilterFunction(term, filter)
            items = components.filter(filterFunction)
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
            <Container>
                {items.map(item => (
                    <ExplorerGridItem
                        key={`${item.package}.${item.component_id}`}
                        package={item.package}
                        id={item.component_id}
                        path={item.path}
                        name={item.component}
                        className={item.className}
                        tags={item.tags}
                        onClick={onClick}
                    />
                ))}
            </Container>
        )
    }
}
