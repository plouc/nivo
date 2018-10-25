import React from 'react'
import GuideCode, { GuideCodeComment } from '../GuideCode'

const PatternsExample = () => (
    <GuideCode className="code-block">
        <span>{`import { patternDotsDef, patternSquaresDef } from '@nivo/core'\n`}</span>
        <span>{`import { Stream } from '@nivo/stream'\n\n`}</span>
        <span>{`const MyChart = () => (\n`}</span>
        <span>{`  <Stream\n`}</span>
        {`    data={[`}
        <GuideCodeComment>{`/*…*/`}</GuideCodeComment>
        {`]}\n`}
        <span>{`    keys={['react', 'vue', 'elm']}\n`}</span>
        {`    `}
        <GuideCodeComment>{`// defining patterns`}</GuideCodeComment>
        {'\n'}
        {`    defs={[\n`}
        {`      `}
        <GuideCodeComment
        >{`// using helpers (cannot be used with http rendering API)`}</GuideCodeComment>
        {'\n'}
        {`      `}
        <GuideCodeComment>{`// will use color from current element`}</GuideCodeComment>
        {'\n'}
        {`      patternDotsDef('dots', { color: 'inherit' }),\n`}
        {`      `}
        <GuideCodeComment>{`// will use background color from current element`}</GuideCodeComment>
        {'\n'}
        {`      patternSquaresDef('squares', { background: 'inherit' }),\n`}
        {`      `}
        <GuideCodeComment>{`// using plain object`}</GuideCodeComment>
        {'\n'}
        {`      { id: 'custom', type: 'patternSquares', size: 24 },\n`}
        {`    ]}\n`}
        {`    `}
        <GuideCodeComment>{`// defining rules to apply those patterns`}</GuideCodeComment>
        {'\n'}
        {`    fill={[\n`}
        {`      `}
        <GuideCodeComment>{`// match using query object`}</GuideCodeComment>
        {'\n'}
        {`      `}
        <GuideCodeComment>{`// (can be used with http rendering API`}</GuideCodeComment>
        {'\n'}
        {`      { match: { id: 'react' }, id: 'dots' },\n`}
        {`      `}
        <GuideCodeComment>{`// match using function`}</GuideCodeComment>
        {'\n'}
        {`      `}
        <GuideCodeComment>{`// (cannot be used with http rendering API`}</GuideCodeComment>
        {'\n'}
        {`      { match: d => d.id === 'vue', id: 'squares' },\n`}
        {`      `}
        <GuideCodeComment>{`// match all, will only affect 'elm' because once`}</GuideCodeComment>
        {'\n'}
        {`      `}
        <GuideCodeComment>{`// a rule match, others are skipped`}</GuideCodeComment>
        {'\n'}
        {`      `}
        <GuideCodeComment>{`// (can be used with http rendering API`}</GuideCodeComment>
        {'\n'}
        {`      { match: '*', id: 'custom' },\n`}
        {`    ]}\n`}
        {`  />\n`}
        {`)`}
    </GuideCode>
)

export default PatternsExample
