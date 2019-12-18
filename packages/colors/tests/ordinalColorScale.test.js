/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {
    getOrdinalColorScale,
    colorSchemes,
    categoricalColorSchemeIds,
    divergingColorSchemeIds,
    sequentialColorSchemeIds,
} from '../src'

it(`should accept user defined function`, () => {
    const userFunction = () => 'red'
    const colorScale = getOrdinalColorScale(userFunction)

    expect(colorScale).toBe(userFunction)
    expect(colorScale()).toBe('red')
})

it(`should be able to generate a generator which use data color`, () => {
    const colorScale = getOrdinalColorScale({ datum: 'color' })

    expect(colorScale({ color: 'green' })).toBe('green')
})

it(`should accept user defined color array`, () => {
    const colors = ['purple', 'green', 'blue']
    const colorScale = getOrdinalColorScale(colors, 'id')

    expect(colorScale.scale.range()).toEqual(colors)
    expect(colorScale({ id: 'whatever' })).toBe('purple')
})

categoricalColorSchemeIds.forEach(scheme => {
    it(`should be able to generate a scale from categorical colors (${scheme})`, () => {
        const colorScale = getOrdinalColorScale({ scheme }, 'id')

        expect(colorScale.scale.range()).toEqual(colorSchemes[scheme])
        expect(colorScale({ id: 'whatever' })).toBe(colorSchemes[scheme][0])
    })
})

divergingColorSchemeIds.forEach(scheme => {
    it(`should be able to generate a scale from diverging colors (${scheme})`, () => {
        const colorScale = getOrdinalColorScale({ scheme }, 'id')

        expect(colorScale.scale.range()).toEqual(colorSchemes[scheme][11])
        expect(colorScale({ id: 'whatever' })).toBe(colorSchemes[scheme][11][0])
    })
})
divergingColorSchemeIds.forEach(scheme => {
    it(`should be able to generate a scale from diverging colors with a specific size (${scheme})`, () => {
        const colorScale = getOrdinalColorScale({ scheme, size: 5 })

        expect(colorScale.scale.range()).toEqual(colorSchemes[scheme][5])
        expect(colorScale('whatever')).toBe(colorSchemes[scheme][5][0])
    })
})
it(`should throw if trying to generate a scale from diverging colors with a size lower than 3`, () => {
    expect(() => {
        getOrdinalColorScale({ scheme: divergingColorSchemeIds[0], size: 2 })
    }).toThrow(
        `Invalid size '2' for diverging color scheme '${divergingColorSchemeIds[0]}', must be between 3~11`
    )
})
it(`should throw if trying to generate a scale from diverging colors with a size greater than 11`, () => {
    expect(() => {
        getOrdinalColorScale({ scheme: divergingColorSchemeIds[0], size: 13 })
    }).toThrow(
        `Invalid size '13' for diverging color scheme '${divergingColorSchemeIds[0]}', must be between 3~11`
    )
})

sequentialColorSchemeIds.forEach(scheme => {
    it(`should be able to generate a scale from sequential colors (${scheme})`, () => {
        const colorScale = getOrdinalColorScale({ scheme })

        expect(colorScale.scale.range()).toEqual(colorSchemes[scheme][9])
        expect(colorScale('whatever')).toBe(colorSchemes[scheme][9][0])
    })
})
sequentialColorSchemeIds.forEach(scheme => {
    it(`should be able to generate a scale from sequential colors with a specific size (${scheme})`, () => {
        const colorScale = getOrdinalColorScale({ scheme, size: 5 })

        expect(colorScale.scale.range()).toEqual(colorSchemes[scheme][5])
        expect(colorScale('whatever')).toBe(colorSchemes[scheme][5][0])
    })
})
it(`should throw if trying to generate a scale from sequential colors with a size lower than 3`, () => {
    expect(() => {
        getOrdinalColorScale({ scheme: sequentialColorSchemeIds[0], size: 2 })
    }).toThrow(
        `Invalid size '2' for sequential color scheme '${sequentialColorSchemeIds[0]}', must be between 3~9`
    )
})
it(`should throw if trying to generate a scale from sequential colors with a size greater than 9`, () => {
    expect(() => {
        getOrdinalColorScale({ scheme: sequentialColorSchemeIds[0], size: 11 })
    }).toThrow(
        `Invalid size '11' for sequential color scheme '${sequentialColorSchemeIds[0]}', must be between 3~9`
    )
})

it(`should throw if an object is given but doesn't match datum or scheme`, () => {
    expect(() => {
        getOrdinalColorScale({})
    }).toThrow(
        `Invalid colors, when using an object, you should either pass a 'datum' or a 'scheme' property`
    )
})
