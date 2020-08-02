/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { DescriptionBlock } from '../components/styled'

const NotFoundPage = () => (
    <Layout>
        <SEO title="404: Not found" />
        <div className="guide__header">
            <h1>Not Found</h1>
        </div>
        <DescriptionBlock>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </DescriptionBlock>
    </Layout>
)

export default NotFoundPage
