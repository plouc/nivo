/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Defs, PatternLines, patternLinesDef } from '@nivo/core'
import GuideDemoBlock from '../GuideDemoBlock'

const SAMPLE_SIZE = 120
const patternId = 'lines-pattern'

const controls = [
    {
        name: 'spacing',
        type: 'number',
        help: 'spacing between lines.',
        defaultValue: PatternLines.defaultProps.spacing,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 32,
        },
    },
    {
        name: 'rotation',
        type: 'number',
        help: 'lines rotation.',
        defaultValue: PatternLines.defaultProps.rotation,
        controlType: 'angle',
        controlOptions: {
            start: 90,
            min: -360,
            max: 360,
        },
    },
    {
        name: 'lineWidth',
        type: 'number',
        help: 'lines thickness.',
        defaultValue: PatternLines.defaultProps.lineWidth,
        controlType: 'lineWidth',
        controlOptions: {
            min: 1,
        },
    },
    {
        name: 'background',
        type: 'string',
        help: 'pattern background color.',
        defaultValue: PatternLines.defaultProps.background,
        controlType: 'colorPicker',
    },
    {
        name: 'color',
        type: 'string',
        help: 'lines color.',
        defaultValue: PatternLines.defaultProps.color,
        controlType: 'colorPicker',
    },
]

const initialSettings = {
    spacing: PatternLines.defaultProps.spacing,
    rotation: PatternLines.defaultProps.rotation,
    lineWidth: PatternLines.defaultProps.lineWidth,
    background: PatternLines.defaultProps.background,
    color: PatternLines.defaultProps.color,
}

const generateCode = settings =>
    `
// helper
patternLinesDef('${patternId}', ${JSON.stringify(settings, null, '  ')})
// plain object
${JSON.stringify(patternLinesDef(patternId, settings), null, '    ')}
`.trim()

const PatternsLinesDemo = () => {
    return (
        <GuideDemoBlock
            title="Lines"
            controls={controls}
            initialSettings={initialSettings}
            generateCode={generateCode}
        >
            {settings => (
                <svg width={SAMPLE_SIZE} height={SAMPLE_SIZE}>
                    <Defs defs={[patternLinesDef(patternId, settings)]} />
                    <rect width={SAMPLE_SIZE} height={SAMPLE_SIZE} fill={`url(#${patternId})`} />
                </svg>
            )}
        </GuideDemoBlock>
    )
}

export default PatternsLinesDemo
