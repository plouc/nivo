/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as d3 from 'd3'
import { getColorGenerator } from '../src/ColorUtils'

describe('getColorGenerator()', () => {
    it(`should return 'none' if 'none' provided`, () => {
        expect(getColorGenerator('none')).toBe('none')
    })

    it(`should return a function to use 'data.color' if 'inherit' provided`, () => {
        const colorGenerator = getColorGenerator('inherit')
        const color          = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({data: {color}})).toBe(color)
    })

    it(`should return a function to use darker 'data.color' if 'inherit:darker(*)' provided`, () => {
        const colorGenerator = getColorGenerator('inherit:darker(1)')
        const color          = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({data: {color}})).toEqual(d3.rgb(color).darker(1))
    })

    it(`'inherit:darker(*)' should support floats`, () => {
        const colorGenerator = getColorGenerator('inherit:darker(.3)')
        const color          = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({data: {color}})).toEqual(d3.rgb(color).darker(0.3))
    })

    it(`should return a function to use brighter 'data.color' if 'inherit:brighter(*)' provided`, () => {
        const colorGenerator = getColorGenerator('inherit:brighter(1)')
        const color          = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({data: {color}})).toEqual(d3.rgb(color).brighter(1))
    })

    it(`'inherit:brighter(*)' should support floats`, () => {
        const colorGenerator = getColorGenerator('inherit:brighter(.3)')
        const color          = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({data: {color}})).toEqual(d3.rgb(color).brighter(0.3))
    })

    it(`should return directive if no match found`, () => {
        const color          = '#F00'
        const colorGenerator = getColorGenerator(color)

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator()).toBe(color)
    })
})
