import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import ComponentsExplorer from '../components/components/explorer/ComponentsExplorer'

const Components = props => {
    return (
        <Layout>
            <SEO title="Components" />
            <ComponentsExplorer location={props.location} navigate={props.navigate} />
        </Layout>
    )
}

export default Components
