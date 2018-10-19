import React from 'react'

const GradientsExample = () => (
    <pre className="code-block guide__code">
        <span>{`import { linearGradientDef } from '@nivo/core'\n`}</span>
        <span>{`import { Stream } from '@nivo/stream'\n\n`}</span>
        <span>{`const MyChart = () => (\n`}</span>
        <span>{`  <Stream\n`}</span>
        {`    data={[`}
        <span className="guide__code__comment">{`/*…*/`}</span>
        {`]}\n`}
        <span>{`    keys={['react', 'vue', 'elm']}\n`}</span>
        {`    `}
        <span className="guide__code__comment">{`// defining gradients`}</span>
        {'\n'}
        {`    defs={[\n`}
        {`      `}
        <span className="guide__code__comment">{`// using helpers`}</span>
        {'\n'}
        {`      `}
        <span className="guide__code__comment">{`// will inherit colors from current element`}</span>
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
        <span className="guide__code__comment">{`// using plain object`}</span>
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
        <span className="guide__code__comment">{`// defining rules to apply those patterns`}</span>
        {'\n'}
        {`    fill={[\n`}
        {`      `}
        <span className="guide__code__comment">{`// match using object query`}</span>
        {'\n'}
        {`      { match: { id: 'react' }, id: 'gradientA' },\n`}
        {`      `}
        <span className="guide__code__comment">{`// match using function`}</span>
        {'\n'}
        {`      { match: d => d.id === 'vue', id: 'gradientB' },\n`}
        {`      `}
        <span className="guide__code__comment">{`// match all, will only affect 'elm' because once`}</span>
        {'\n'}
        {`      `}
        <span className="guide__code__comment">{`// a rule match, others are skipped`}</span>
        {'\n'}
        {`      { match: '*', id: 'gradientC' },\n`}
        {`    ]}\n`}
        {`  />\n`}
        {`)`}
    </pre>
)

export default GradientsExample
