import React from 'react'
import Layout from '../components/Layout'
import { Seo } from '../components/Seo'
import { ComponentsExplorer } from '../components/components/explorer'

interface ComponentsProps {
    location: {
        search: string
    }
}

const Components = ({ location }: ComponentsProps) => {
    return (
        <Layout>
            <Seo title="Components" />
            <ComponentsExplorer location={location} />
        </Layout>
    )
}

export default Components
