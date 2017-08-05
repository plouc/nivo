/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { rgb } from 'd3-color'
import { getColorGenerator, getColorsGenerator } from '../../src/lib/colorUtils'

describe('getColorGenerator()', () => {
    it(`should return 'none' if 'none' provided`, () => {
        expect(getColorGenerator('none')).toBe('none')
    })

    it(`should return a function to use 'data.color' if 'inherit' provided`, () => {
        const colorGenerator = getColorGenerator('inherit')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ data: { color } })).toBe(color)
    })

    it(`should return a function to use darker 'data.color' if 'inherit:darker(*)' provided`, () => {
        const colorGenerator = getColorGenerator('inherit:darker(1)')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ data: { color } })).toEqual(rgb(color).darker(1))
    })

    it(`'inherit:darker(*)' should support floats`, () => {
        const colorGenerator = getColorGenerator('inherit:darker(.3)')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ data: { color } })).toEqual(rgb(color).darker(0.3))
    })

    it(`should return a function to use brighter 'data.color' if 'inherit:brighter(*)' provided`, () => {
        const colorGenerator = getColorGenerator('inherit:brighter(1)')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ data: { color } })).toEqual(rgb(color).brighter(1))
    })

    it(`'inherit:brighter(*)' should support floats`, () => {
        const colorGenerator = getColorGenerator('inherit:brighter(.3)')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ data: { color } })).toEqual(rgb(color).brighter(0.3))
    })

    it(`should return directive if no match found`, () => {
        const color = '#F00'
        const colorGenerator = getColorGenerator(color)

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator()).toBe(color)
    })
})

describe('getColorsGenerator()', () => {
    it(`should just use value returned by 'colorBy' if it's a function`, () => {
        expect(getColorsGenerator('nivo', d => d.color)({ color: 'whatever' })).toBe('whatever')
    })

    it(`should allow to pick specific property from datum`, () => {
        expect(getColorsGenerator('nivo', 'custom')({ custom: 'custom' })).toBe('#e8c1a0')
    })

    it(`should allow to use an array of colors`, () => {
        const generator = getColorsGenerator(['#F00', '#0F0'], 'id')
        expect(generator({ id: 'first' })).toBe('#F00')
        expect(generator({ id: 'second' })).toBe('#0F0')
    })

    it(`should allow to use a predefined color range`, () => {
        const generator = getColorsGenerator('pastel1', 'id')
        expect(generator({ id: 'first' })).toBe('#fbb4ae')
        expect(generator({ id: 'second' })).toBe('#b3cde3')
    })

    it(`should return given 'colors' value otherwise`, () => {
        const generator = getColorsGenerator('#F0F')
        expect(generator({ id: 'first' })).toBe('#F0F')
        expect(generator({ id: 'second' })).toBe('#F0F')
    })
})
