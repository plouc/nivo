import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import URLSearchParams from 'url-search-params'
import ComponentsSearch from './ComponentsSearch'
import ComponentsFilters from './ComponentsFilters'
import ComponentsGrid from './ComponentsGrid'

class Components extends Component {
    constructor(props) {
        super(props)

        const {
            location: { search },
        } = props

        const params = new URLSearchParams(search)
        const term = params.get('q')
        const filter = params.get('filter')

        this.state = { term, filter }
    }

    handleSearch = term => {
        const { history } = this.props
        const { filter } = this.state

        const params = new URLSearchParams()
        if (term) params.append('q', term)
        if (filter) params.append('filter', filter)

        this.setState({ term })
        history.replace({
            pathname: '/components',
            search: params.toString(),
        })
    }

    handleFilter = filter => {
        const { history } = this.props
        const { term } = this.state

        const params = new URLSearchParams()
        if (term) params.append('q', term)
        if (filter) params.append('filter', filter)

        this.setState({ filter })
        history.replace({
            pathname: '/components',
            search: params.toString(),
        })
    }

    render() {
        const { components } = this.props
        const { term, filter } = this.state

        return (
            <div className="inner-content">
                <div className="page_content">
                    <Helmet title="Components" />
                    <div className="chart_header">
                        <h1 className="page_header">Components</h1>
                    </div>
                    <div className="components__sub-header">
                        <ComponentsSearch term={term || ''} onChange={this.handleSearch} />
                        <ComponentsFilters onChange={this.handleFilter} filter={filter} />
                    </div>
                    <ComponentsGrid components={components} term={term} filter={filter} />
                </div>
            </div>
        )
    }
}

export default withRouter(Components)
