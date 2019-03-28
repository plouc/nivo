/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Defs, patternSquaresDef, PatternSquares } from '@nivo/core'
import GuideDemoBlock from '../GuideDemoBlock'

const SAMPLE_SIZE = 120
const patternId = 'squares-pattern'

const controls = [
    {
        name: 'size',
        type: 'number',
        help: 'squares size.',
        defaultValue: PatternSquares.defaultProps.size,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 1,
            max: 24,
        },
    },
    {
        name: 'padding',
        type: 'number',
        help: 'padding between squares.',
        defaultValue: PatternSquares.defaultProps.padding,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        name: 'stagger',
        type: 'boolean',
        help: 'staggered squares.',
        defaultValue: PatternSquares.defaultProps.stagger,
        controlType: 'switch',
    },
    {
        name: 'background',
        type: 'string',
        help: 'pattern background color.',
        defaultValue: PatternSquares.defaultProps.background,
        controlType: 'colorPicker',
    },
    {
        name: 'color',
        type: 'string',
        help: 'squares color.',
        defaultValue: PatternSquares.defaultProps.color,
        controlType: 'colorPicker',
    },
]

const initialSettings = {
    size: PatternSquares.defaultProps.size,
    padding: PatternSquares.defaultProps.padding,
    stagger: PatternSquares.defaultProps.stagger,
    background: PatternSquares.defaultProps.background,
    color: PatternSquares.defaultProps.color,
}

const generateCode = settings =>
    `
// helper
patternSquaresDef('${patternId}', ${JSON.stringify(settings, null, '  ')})
// plain object
${JSON.stringify(patternSquaresDef(patternId, settings), null, '    ')}
`.trim()

const PatternsSquaresDemo = () => {
    return (
        <GuideDemoBlock
            title="Squares"
            controls={controls}
            initialSettings={initialSettings}
            generateCode={generateCode}
        >
            {settings => (
                <svg width={SAMPLE_SIZE} height={SAMPLE_SIZE}>
                    <Defs defs={[patternSquaresDef(patternId, settings)]} />
                    <rect width={SAMPLE_SIZE} height={SAMPLE_SIZE} fill={`url(#${patternId})`} />
                </svg>
            )}
        </GuideDemoBlock>
    )
}

export default PatternsSquaresDemo
