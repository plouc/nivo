import React from 'react'
import GuideCode, { GuideCodeComment } from '../GuideCode'

const GradientsExample = () => (
    <GuideCode className="code-block">
        <span>{`import { linearGradientDef } from '@nivo/core'\n`}</span>
        <span>{`import { Stream } from '@nivo/stream'\n\n`}</span>
        <span>{`const MyChart = () => (\n`}</span>
        <span>{`  <Stream\n`}</span>
        {`    data={[`}
        <GuideCodeComment>{`/*…*/`}</GuideCodeComment>
        {`]}\n`}
        <span>{`    keys={['react', 'vue', 'elm']}\n`}</span>
        {`    `}
        <GuideCodeComment>{`// defining gradients`}</GuideCodeComment>
        {'\n'}
        {`    defs={[\n`}
        {`      `}
        <GuideCodeComment>{`// using helpers`}</GuideCodeComment>
        {'\n'}
        {`      `}
        <GuideCodeComment>{`// will inherit colors from current element`}</GuideCodeComment>
        {'\n'}
        {`      linearGradientDef('gradientA', [\n`}
        {`        { offset: 0, color: 'inherit' },\n`}
        {`        { offset: 100, color: 'inherit', opacity: 0 },\n`}
        {`      ]),\n`}
        {`      linearGradientDef('gradientB', [\n`}
        {`        { offset: 0, color: '#000' },\n`}
        {`        { offset: 100, color: 'inherit' },\n`}
        {`      ]),\n`}
        {`      `}
        <GuideCodeComment>{`// using plain object`}</GuideCodeComment>
        {'\n'}
        {`      {\n`}
        {`        id: 'gradientC',\n`}
        {`        type: 'linearGradient',\n`}
        {`        colors: [\n`}
        {`          { offset: 0, color: '#faf047' },\n`}
        {`          { offset: 100, color: '#e4b400' },\n`}
        {`        ],\n`}
        {`      },\n`}
        {`    ]}\n`}
        {`      `}
        <GuideCodeComment>{`// defining rules to apply those patterns`}</GuideCodeComment>
        {'\n'}
        {`    fill={[\n`}
        {`      `}
        <GuideCodeComment>{`// match using object query`}</GuideCodeComment>
        {'\n'}
        {`      { match: { id: 'react' }, id: 'gradientA' },\n`}
        {`      `}
        <GuideCodeComment>{`// match using function`}</GuideCodeComment>
        {'\n'}
        {`      { match: d => d.id === 'vue', id: 'gradientB' },\n`}
        {`      `}
        <GuideCodeComment>{`// match all, will only affect 'elm' because once`}</GuideCodeComment>
        {'\n'}
        {`      `}
        <GuideCodeComment>{`// a rule match, others are skipped`}</GuideCodeComment>
        {'\n'}
        {`      { match: '*', id: 'gradientC' },\n`}
        {`    ]}\n`}
        {`  />\n`}
        {`)`}
    </GuideCode>
)

export default GradientsExample
