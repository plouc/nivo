import React from 'react'
import Layout from '../components/Layout'
import { Seo } from '../components/Seo'
import ComponentsExplorer from '../components/components/explorer/ComponentsExplorer'

const Components = props => {
    return (
        <Layout>
            <Seo title="Components" />
            <ComponentsExplorer location={props.location} navigate={props.navigate} />
        </Layout>
    )
}

export default Components
