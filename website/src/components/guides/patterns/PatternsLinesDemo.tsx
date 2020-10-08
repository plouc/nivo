import React from 'react'
import { Defs, PatternLines, patternLinesDef } from '@bitbloom/nivo-core'
import { ChartProperty } from '../../../types'
import { GuideDemoBlock } from '../GuideDemoBlock'

const defaults = (PatternLines as unknown as any).defaultProps as Settings
const SAMPLE_SIZE = 120
const patternId = 'lines-pattern'

interface Settings {
    spacing: number
    rotation: number
    lineWidth: number
    background: string
    color: string
}

const initialSettings: Settings = {
    spacing: defaults.spacing,
    rotation: defaults.rotation,
    lineWidth: defaults.lineWidth,
    background: defaults.background,
    color: defaults.color,
}

const controls: ChartProperty[] = [
    {
        name: 'spacing',
        type: 'number',
        required: false,
        help: 'spacing between lines.',
        defaultValue: defaults.spacing,
        control: {
            type: 'range',
            min: 0,
            max: 32,
        },
    },
    {
        name: 'rotation',
        type: 'number',
        required: false,
        help: 'lines rotation.',
        defaultValue: defaults.rotation,
        control: {
            type: 'angle',
            start: 90,
            min: -360,
            max: 360,
        },
    },
    {
        name: 'lineWidth',
        type: 'number',
        required: false,
        help: 'lines thickness.',
        defaultValue: defaults.lineWidth,
        control: {
            type: 'lineWidth',
            min: 1,
        },
    },
    {
        name: 'background',
        type: 'string',
        required: false,
        help: 'pattern background color.',
        defaultValue: defaults.background,
        control: { type: 'colorPicker' },
    },
    {
        name: 'color',
        type: 'string',
        required: false,
        help: 'lines color.',
        defaultValue: defaults.color,
        control: { type: 'colorPicker' },
    },
]

const generateCode = (settings: Settings) =>
    `
// helper
import { patternLinesDef } from '@bitbloom/nivo-core'
patternLinesDef('${patternId}', ${JSON.stringify(settings, null, '  ')})
// plain object
${JSON.stringify(patternLinesDef(patternId, settings), null, '    ')}
`.trim()

export const PatternsLinesDemo = () => {
    return (
        <GuideDemoBlock<Settings>
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
