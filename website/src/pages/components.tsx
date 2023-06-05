import React from 'react'
import Layout from '../components/Layout'
import { Seo } from '../components/Seo'
import { ComponentsExplorer } from '../components/components/explorer'

interface ComponentsProps {
    location: {
        search: string
    }
    navigate: (
        path: string,
        options?: {
            replace?: boolean
        }
    ) => void
}

const Components = ({ location, navigate }: ComponentsProps) => {
    return (
        <Layout>
            <Seo title="Components" />
            <ComponentsExplorer location={location} navigate={navigate} />
        </Layout>
    )
}

export default Components
