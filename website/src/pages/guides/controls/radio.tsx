import React from 'react'
import { useControl, RadioControl, ControlPanel } from '@nivo/controls'
import Layout from '../../../components/Layout'
import PageContent from '../../../components/PageContent'
import { Seo } from '../../../components/Seo'
import { ControlsNav } from '../../../components/guides/controls'

export default () => {
    const control = useControl({
        id: 'Radio',
        type: 'radio',
        value: 'option_a',
    })

    return (
        <Layout>
            <Seo
                title="RadioControl"
                description="Easily add controls to your nivo charts."
            />
            <PageContent>
                <div className="guide__header">
                    <h1>RadioControl</h1>
                </div>
            </PageContent>
            <PageContent>
                <ControlPanel controls={[control]}/>
            </PageContent>
            <ControlsNav/>
        </Layout>
    )
}
