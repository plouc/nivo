import React from 'react'
import { ControlsLayout } from '../../../components/guides/controls'
import { CodeBlock } from '../../../components/CodeBlock'

export default () => (
    <ControlsLayout title="Controls">
        <p>
            Sometimes, you might want to empower users by allowing them to customize some charts,{' '}
            <code>@nivo/controls</code> was built for this purpose.
        </p>
        <h2>Installation</h2>
        <p>
            This package depends on a few extra packages, so on order to install it you should run:
        </p>
        <CodeBlock>yarn add styled-components @nivo/core @nivo/colors @nivo/controls</CodeBlock>
    </ControlsLayout>
)
