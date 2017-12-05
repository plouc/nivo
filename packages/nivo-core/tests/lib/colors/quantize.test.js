/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { guessQuantizeColorScale } from '../../../src/lib/colors/quantize'

describe('guessQuantizeColorScale()', () => {
    it('should accept an existing color scale', () => {
        const existingColorScale = () => {}
        existingColorScale.domain = () => {}
        const colorScale = guessQuantizeColorScale(existingColorScale)
        expect(colorScale).toEqual(existingColorScale)
    })

    it('should not accept a function not providing a domain function', () => {
        expect(() => {
            guessQuantizeColorScale(() => {})
        }).toThrow(
            /Provided colors should be a valid quantize scale providing a 'domain\(\)' function/
        )
    })

    it('should accept d3 colors key', () => {
        const colorScale = guessQuantizeColorScale('BuGn')
        expect(colorScale.range()).toEqual([
            '#f7fcfd',
            '#e5f5f9',
            '#ccece6',
            '#99d8c9',
            '#66c2a4',
            '#41ae76',
            '#238b45',
            '#006d2c',
            '#00441b',
        ])
    })

    it('should accept custom colors', () => {
        const colors = ['#F00', '#0F0', '#00F']
        const colorScale = guessQuantizeColorScale(colors)
        expect(colorScale.range()).toEqual(colors)
    })

    it('should throw if directive is invalid', () => {
        expect(() => {
            guessQuantizeColorScale('invalid')
        }).toThrow(/Unable to guess quantize color scale from 'invalid'/)
    })
})
