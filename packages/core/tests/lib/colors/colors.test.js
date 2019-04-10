/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { rgb } from 'd3-color'
import { getInheritedColorGenerator } from '../../../src/lib/colors'

describe('getInheritedColorGenerator()', () => {
    it(`should return 'none' if 'none' provided`, () => {
        expect(getInheritedColorGenerator('none')()).toBe('none')
    })

    it(`should return a function to use 'data.color' if 'inherit' provided`, () => {
        const colorGenerator = getInheritedColorGenerator('inherit')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ color })).toBe(color)
    })

    it(`should return a function to use darker 'data.color' if 'inherit:darker(*)' provided`, () => {
        const colorGenerator = getInheritedColorGenerator('inherit:darker(1)')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ color })).toEqual(
            rgb(color)
                .darker(1)
                .toString()
        )
    })

    it(`'inherit:darker(*)' should support floats`, () => {
        const colorGenerator = getInheritedColorGenerator('inherit:darker(.3)')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ color })).toEqual(
            rgb(color)
                .darker(0.3)
                .toString()
        )
    })

    it(`should return a function to use brighter 'data.color' if 'inherit:brighter(*)' provided`, () => {
        const colorGenerator = getInheritedColorGenerator('inherit:brighter(1)')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ color })).toEqual(
            rgb(color)
                .brighter(1)
                .toString()
        )
    })

    it(`'inherit:brighter(*)' should support floats`, () => {
        const colorGenerator = getInheritedColorGenerator('inherit:brighter(.3)')
        const color = '#FF0000'

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator({ color })).toEqual(
            rgb(color)
                .brighter(0.3)
                .toString()
        )
    })

    it(`should return directive if no match found`, () => {
        const color = '#F00'
        const colorGenerator = getInheritedColorGenerator(color)

        expect(typeof colorGenerator).toBe('function')
        expect(colorGenerator()).toBe(color)
    })
})
