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
import ComponentsGridItem from './ComponentsGridItem'

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
        const { components, term, filter, onClick } = this.props

        let items = components
        if (term || filter) {
            const filterFunction = getFilterFunction(term, filter)
            items = components.filter(filterFunction)
        }

        if (items.length === 0) {
            return (
                <div className="components__grid__empty">
                    <span className="components__grid__empty__icon">{`¯\\_(ツ)_/¯`}</span>
                    <div>no result, sorry…</div>
                </div>
            )
        }

        return (
            <div className="components__grid">
                {items.map(item => (
                    <ComponentsGridItem
                        key={item.key}
                        path={item.path}
                        name={item.label}
                        className={item.className}
                        tags={item.tags}
                        onClick={onClick}
                    />
                ))}
            </div>
        )
    }
}
