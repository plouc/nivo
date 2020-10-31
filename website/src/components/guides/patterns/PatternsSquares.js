/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Defs, patternSquaresDef, patternSquaresDefaults } from '@nivo/core'
import GuideDemoBlock from '../GuideDemoBlock'

const SAMPLE_SIZE = 120
const patternId = 'squares-pattern'

const controls = [
    {
        name: 'size',
        type: 'number',
        help: 'squares size.',
        defaultValue: patternSquaresDefaults.size,
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
        defaultValue: patternSquaresDefaults.padding,
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
        defaultValue: patternSquaresDefaults.stagger,
        controlType: 'switch',
    },
    {
        name: 'background',
        type: 'string',
        help: 'pattern background color.',
        defaultValue: patternSquaresDefaults.background,
        controlType: 'colorPicker',
    },
    {
        name: 'color',
        type: 'string',
        help: 'squares color.',
        defaultValue: patternSquaresDefaults.color,
        controlType: 'colorPicker',
    },
]

const initialSettings = {
    ...patternSquaresDefaults,
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
