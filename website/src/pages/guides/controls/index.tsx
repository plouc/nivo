import React from 'react'
import Layout from '../../../components/Layout'
import { Seo } from '../../../components/Seo'
import PageContent from '../../../components/PageContent'
import { DescriptionBlock } from '../../../components/styled'
import { ControlsNav } from '../../../components/guides/controls'

const Controls = () => (
    <Layout>
        <Seo
            title="Controls Guide"
            description="Easily add controls to your nivo charts."
        />
        <PageContent>
            <div className="guide__header">
                <h1>Controls</h1>
            </div>
        </PageContent>
        <DescriptionBlock>
            <h2>@nivo/controls</h2>
            <p>
                Sometimes, you might want to empower users by allowing them
                to customize some charts, <code>@nivo/controls</code>{' '}
                was built for this purpose.
            </p>
        </DescriptionBlock>
        <ControlsNav/>
    </Layout>
)

export default Controls
