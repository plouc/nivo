/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { rgb } from 'd3-color'
import { getInheritedColorGenerator } from '../src'

it(`should accept user defined function`, () => {
    const userFunction = datum => datum.color
    const getColor = getInheritedColorGenerator(userFunction)

    expect(getColor({ color: 'red' })).toBe('red')
})

it(`should throw if an object is given but doesn't match theme or inheritance`, () => {
    expect(() => {
        getInheritedColorGenerator({})
    }).toThrow(
        `Invalid color spec, you should either specify 'theme' or 'from' when using a config object`
    )
})

describe(`from theme`, () => {
    it(`should be able to use a theme property`, () => {
        const theme = { thing: { color: 'green' } }
        const getColor = getInheritedColorGenerator({ theme: 'thing.color' }, theme)

        expect(getColor()).toBe('green')
    })

    it(`should throw if no theme is provided`, () => {
        expect(() => {
            getInheritedColorGenerator({ theme: 'color' })
        }).toThrow('Unable to use color from theme as no theme was provided')
    })

    it(`should throw if theme property is undefined`, () => {
        expect(() => {
            getInheritedColorGenerator({ theme: 'color' }, {})
        }).toThrow(`Color from theme is undefined at path: 'color'`)
    })
})

describe(`from datum`, () => {
    it(`should be able to use color from datum`, () => {
        const getColor = getInheritedColorGenerator({ from: 'data.color' })

        expect(getColor({ data: { color: 'purple' } })).toBe('purple')
    })

    it(`should be able to apply a brighter modifier on inherited color`, () => {
        const getColor = getInheritedColorGenerator({
            from: 'color',
            modifiers: [['brighter', 1]],
        })

        expect(getColor({ color: '#ff0099' })).toBe(rgb('#ff0099').brighter(1).toString())
    })

    it(`should be able to apply a darker modifier on inherited color`, () => {
        const getColor = getInheritedColorGenerator({
            from: 'color',
            modifiers: [['darker', 1]],
        })

        expect(getColor({ color: '#ff0099' })).toBe(rgb('#ff0099').darker(1).toString())
    })

    it(`should be able to apply an opacity modifier on inherited color`, () => {
        const getColor = getInheritedColorGenerator({
            from: 'color',
            modifiers: [['opacity', 0.5]],
        })

        const expectedColor = rgb('#ff0099')
        expectedColor.opacity = 0.5
        expect(getColor({ color: '#ff0099' })).toBe(expectedColor.toString())
    })

    it(`should be able to chain several modifiers on inherited color`, () => {
        const getColor = getInheritedColorGenerator({
            from: 'color',
            modifiers: [
                ['darker', 2],
                ['opacity', 0.5],
            ],
        })

        const expectedColor = rgb('#ff0099').darker(2)
        expectedColor.opacity = 0.5
        expect(getColor({ color: '#ff0099' })).toBe(expectedColor.toString())
    })

    it(`should throw if modifier type is invalid`, () => {
        expect(() => {
            getInheritedColorGenerator({
                from: 'color',
                modifiers: [['invalid']],
            })
        }).toThrow(
            `Invalid color modifier: 'invalid', must be one of: 'brighter', 'darker', 'opacity'`
        )
    })
})
