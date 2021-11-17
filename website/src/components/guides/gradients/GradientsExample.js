import React from 'react'
import { Highlight } from '../../Highlight'

const code = `
import { linearGradientDef } from '@nivo/core'
import { Stream } from '@nivo/stream'

const MyChart = () => (
    <Stream
        data={[/*…*/]}
        keys={['react', 'vue', 'elm']}
        // 1. defining gradients
        defs={[
            // using helpers
            // will inherit colors from current element
            linearGradientDef('gradientA', [
                { offset: 0, color: 'inherit' },
                { offset: 100, color: 'inherit', opacity: 0 },
            ]),
            linearGradientDef('gradientB', [
                { offset: 0, color: '#000' },
                { offset: 100, color: 'inherit' },
            ],
            // you may specify transforms for your gradients, e.g. rotations and skews,
            // following the transform attribute format.
            // For instance here we rotate 90 degrees relative to the center of the object.
            {
                gradientTransform: 'rotate(90 0.5 0.5)'
            }),
            // using plain object
            {
                id: 'gradientC',
                type: 'linearGradient',
                colors: [
                    { offset: 0, color: '#faf047' },
                    { offset: 100, color: '#e4b400' },
                ],
            },
        ]}
        // 2. defining rules to apply those gradients
        fill={[
            // match using object query
            { match: { id: 'react' }, id: 'gradientA' },
            // match using function
            { match: d => d.id === 'vue', id: 'gradientB' },
            // match all, will only affect 'elm', because once a rule match,
            // others are skipped, so now it acts as a fallback
            { match: '*', id: 'gradientC' },
        ]}
    />
)
`.trim()

const GradientsExample = () => <Highlight code={code} language="jsx" />

export default GradientsExample
