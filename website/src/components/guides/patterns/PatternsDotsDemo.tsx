import React from 'react'
import {
    Defs,
    // @ts-ignore
    patternDotsDef,
    // @ts-ignore
    PatternDots,
} from '@nivo/core'
import { ChartProperty } from '../../../types'
import { GuideDemoBlock } from '../GuideDemoBlock'

const defaults = (PatternDots as unknown as any).defaultProps as Settings
const SAMPLE_SIZE = 120
const patternId = 'dots-pattern'

interface Settings {
    size: number
    padding: number
    stagger: boolean
    background: string
    color: string
}

const initialSettings: Settings = {
    size: defaults.size,
    padding: defaults.padding,
    stagger: defaults.stagger,
    background: defaults.background,
    color: defaults.color,
}

const controls: ChartProperty[] = [
    {
        name: 'size',
        type: 'number',
        help: 'dots size.',
        defaultValue: defaults.size,
        control: {
            type: 'range',
            unit: 'px',
            min: 1,
            max: 24,
        },
    },
    {
        name: 'padding',
        type: 'number',
        help: 'padding between dots.',
        defaultValue: defaults.padding,
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        name: 'stagger',
        type: 'boolean',
        help: 'staggered dots.',
        defaultValue: defaults.stagger,
        control: { type: 'switch' },
    },
    {
        name: 'background',
        type: 'string',
        help: 'pattern background color.',
        defaultValue: defaults.background,
        control: { type: 'colorPicker' },
    },
    {
        name: 'color',
        type: 'string',
        help: 'dots color.',
        defaultValue: defaults.color,
        control: { type: 'colorPicker' },
    },
]

const generateCode = (settings: Settings) =>
    `
// helper
import { patternDotsDef } from '@nivo/core'
patternDotsDef('${patternId}', ${JSON.stringify(settings, null, '  ')})
// plain object
${JSON.stringify(patternDotsDef(patternId, settings), null, '    ')}
`.trim()

export const PatternsDotsDemo = () => {
    return (
        <GuideDemoBlock<Settings>
            title="Dots"
            controls={controls}
            initialSettings={initialSettings}
            generateCode={generateCode}
        >
            {settings => (
                <svg width={SAMPLE_SIZE} height={SAMPLE_SIZE}>
                    <Defs defs={[patternDotsDef(patternId, settings)]} />
                    <rect width={SAMPLE_SIZE} height={SAMPLE_SIZE} fill={`url(#${patternId})`} />
                </svg>
            )}
        </GuideDemoBlock>
    )
}
