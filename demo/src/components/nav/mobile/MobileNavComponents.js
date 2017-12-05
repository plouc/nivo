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
import ComponentsSearch from '../../components/ComponentsSearch'
import ComponentsFilters from '../../components/ComponentsFilters'
import ComponentsGrid from '../../components/ComponentsGrid'

export default class MobileNavComponents extends Component {
    static propTypes = {
        close: PropTypes.func.isRequired,
    }

    state = {
        filter: null,
        term: '',
    }

    setFilter = filter => {
        this.setState({ filter })
    }

    setTerm = term => {
        this.setState({ term })
    }

    render() {
        const { close } = this.props
        const { term, filter } = this.state

        return (
            <div>
                <div className="mobile-nav__title">Components</div>
                <ComponentsSearch term={term} onChange={this.setTerm} />
                <ComponentsFilters filter={filter} onChange={this.setFilter} />
                <ComponentsGrid term={term} filter={filter} onClick={close} />
            </div>
        )
    }
}
