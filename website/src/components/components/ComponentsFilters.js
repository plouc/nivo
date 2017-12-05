/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const filters = ['SVG', 'HTML', 'Canvas', 'API']

export default class ComponentsFilters extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
    }

    render() {
        const { filter: currentFilter, onChange } = this.props

        return (
            <div className="ComponentsFilters">
                <span
                    className={`ComponentsFilters__item${
                        currentFilter === null ? ' ComponentsFilters__item--active' : ''
                    }`}
                    onClick={() => {
                        onChange(null)
                    }}
                >
                    All
                </span>
                {filters.map(filter => (
                    <span
                        key={filter}
                        className={`ComponentsFilters__item${
                            currentFilter && filter.toLowerCase() === currentFilter.toLowerCase()
                                ? ' ComponentsFilters__item--active'
                                : ''
                        }`}
                        onClick={() => {
                            onChange(filter)
                        }}
                    >
                        {filter}
                    </span>
                ))}
            </div>
        )
    }
}
