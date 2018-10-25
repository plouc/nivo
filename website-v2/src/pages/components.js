import React, { Component } from 'react'
import { graphql } from 'gatsby'
import GlobalLayout from '../layouts/GlobalLayout'
import ExplorerGrid from '../components/explorer/ExplorerGrid'

export default class Components extends Component {
    render() {
        const { data } = this.props

        return (
            <GlobalLayout>
                {() => (
                    <div className="inner-content">
                        <div className="page_content">
                            {/*<Helmet title="Components" />*/}
                            <div className="chart_header">
                                <h1 className="page_header">Components</h1>
                            </div>
                            <div className="components__sub-header">
                                {/*
                                <ComponentsSearch term={term || ''} onChange={this.handleSearch} />
                                <ComponentsFilters onChange={this.handleFilter} filter={filter} />
                                */}
                            </div>
                            <ExplorerGrid
                                components={data.components.edges.map(({ node }) => node)}
                                // term={term}
                                // filter={filter}
                            />
                        </div>
                    </div>
                )}
            </GlobalLayout>
        )
    }
}

export const query = graphql`
    query {
        components: allComponentsYaml(sort: { fields: [package, component] }) {
            edges {
                node {
                    component_id
                    package
                    component
                    tags
                }
            }
        }
    }
`
