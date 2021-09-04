import React from 'react'
import Layout from '../components/Layout'
import { Seo } from '../components/Seo'
import { DescriptionBlock } from '../components/styled'

const NotFoundPage = () => (
    <Layout>
        <Seo title="404: Not found" />
        <div className="guide__header">
            <h1>Not Found</h1>
        </div>
        <DescriptionBlock>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </DescriptionBlock>
    </Layout>
)

export default NotFoundPage
