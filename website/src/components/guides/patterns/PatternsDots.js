/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Defs, patternDotsDef, PatternDots } from '@nivo/core'
import GuideDemoBlock from '../GuideDemoBlock'

const SAMPLE_SIZE = 120
const patternId = 'dots-pattern'

const controls = [
    {
        name: 'size',
        type: 'number',
        help: 'dots size.',
        controlType: 'range',
        defaultValue: PatternDots.defaultProps.size,
        controlOptions: {
            unit: 'px',
            min: 1,
            max: 24,
        },
    },
    {
        name: 'padding',
        type: 'number',
        help: 'padding between dots.',
        controlType: 'range',
        defaultValue: PatternDots.defaultProps.padding,
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        name: 'stagger',
        type: 'boolean',
        help: 'staggered dots.',
        defaultValue: PatternDots.defaultProps.stagger,
        controlType: 'switch',
    },
    {
        name: 'background',
        type: 'string',
        help: 'pattern background color.',
        defaultValue: PatternDots.defaultProps.background,
        controlType: 'colorPicker',
    },
    {
        name: 'color',
        type: 'string',
        help: 'dots color.',
        defaultValue: PatternDots.defaultProps.color,
        controlType: 'colorPicker',
    },
]

const initialSettings = {
    size: PatternDots.defaultProps.size,
    padding: PatternDots.defaultProps.padding,
    stagger: PatternDots.defaultProps.stagger,
    background: PatternDots.defaultProps.background,
    color: PatternDots.defaultProps.color,
}

const generateCode = settings =>
    `
// helper
patternDotsDef('${patternId}', ${JSON.stringify(settings, null, '  ')})
// plain object
${JSON.stringify(patternDotsDef(patternId, settings), null, '    ')}
`.trim()

const PatternDotsDemo = () => {
    return (
        <GuideDemoBlock
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

export default PatternDotsDemo
