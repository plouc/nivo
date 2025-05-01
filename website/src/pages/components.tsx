import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'
import { Seo } from '../components/Seo'
import { ComponentsExplorer } from '../components/components/explorer'

const Components = ({ location }: PageProps) => {
    return (
        <Layout>
            <Seo title="Components" />
            <ComponentsExplorer location={location} />
        </Layout>
    )
}

export default Components
