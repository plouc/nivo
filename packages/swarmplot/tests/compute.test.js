/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { getSizeGenerator, computeValueScale, computeOrdinalScale } from '../src'

describe(`getSizeGenerator`, () => {
    it(`should accept a fixed value`, () => {
        const generator = getSizeGenerator(10)

        expect(generator()).toBe(10)
    })

    it(`should accept a custom function`, () => {
        const sizeFunction = () => 20
        const generator = getSizeGenerator(sizeFunction)

        expect(generator).toBe(sizeFunction)
        expect(generator()).toBe(20)
    })

    describe('varying size using object spec', () => {
        it(`should throw if key is undefined`, () => {
            expect(() => {
                getSizeGenerator({})
            }).toThrow(
                'Size is invalid, key should be a string pointing to the property to use to determine node size'
            )
        })
        it(`should throw if key is not a string`, () => {
            expect(() => {
                getSizeGenerator({ key: 0 })
            }).toThrow(
                'Size is invalid, key should be a string pointing to the property to use to determine node size'
            )
        })
        it(`should throw if values is not an array with two values`, () => {
            expect(() => {
                getSizeGenerator({ key: 'size' })
            }).toThrow(
                'Size is invalid, values spec should be an array containing two values, min and max'
            )
            expect(() => {
                getSizeGenerator({ key: 'size', values: 'string' })
            }).toThrow(
                'Size is invalid, values spec should be an array containing two values, min and max'
            )
            expect(() => {
                getSizeGenerator({ key: 'size', values: [0] })
            }).toThrow(
                'Size is invalid, values spec should be an array containing two values, min and max'
            )
        })
        it(`should throw if sizes is not an array with two values`, () => {
            expect(() => {
                getSizeGenerator({ key: 'size', values: [0, 1] })
            }).toThrow(
                'Size is invalid, sizes spec should be an array containing two values, min and max'
            )
            expect(() => {
                getSizeGenerator({ key: 'size', values: [0, 1], sizes: 'string' })
            }).toThrow(
                'Size is invalid, sizes spec should be an array containing two values, min and max'
            )
            expect(() => {
                getSizeGenerator({ key: 'size', values: [0, 1], sizes: [0] })
            }).toThrow(
                'Size is invalid, sizes spec should be an array containing two values, min and max'
            )
        })
        it(`should return a dynamic size function`, () => {
            const generator = getSizeGenerator({
                key: 'value',
                values: [0, 1],
                sizes: [0, 10],
            })
            expect(generator({ value: 0.5 })).toBe(5)
        })
    })

    it(`should throw if size config is invalid`, () => {
        expect(() => {
            getSizeGenerator('whatever')
        }).toThrow('Size is invalid, it should be either a function, a number or an object')
    })
})

describe(`computeValueScale`, () => {
    it(`should be able to compute a linear scale`, () => {
        const data = [0, 2, 4, 8, 10]
        const scale = computeValueScale({
            data,
            width: 100,
            height: 0,
            axis: 'x',
            getValue: d => d,
            scale: {
                type: 'linear',
                min: 'auto',
                max: 'auto',
            },
        })

        expect(scale.domain()).toEqual([0, 10])
        expect(scale.range()).toEqual([0, 100])
        expect(scale(5)).toBe(50)
    })
})

describe(`computeOrdinalScale`, () => {
    const ordinalScaleArgs = {
        width: 100,
        height: 100,
        axis: 'x',
        groups: ['A', 'B', 'C', 'D'],
        gap: 0,
    }
    it(`should throw if groups is not an array`, () => {
        expect(() => {
            computeOrdinalScale({
                ...ordinalScaleArgs,
                groups: 'string',
            })
        }).toThrow(`'groups' should be an array containing at least one item`)
    })
    it(`should throw if groups doesn't contain at least one item`, () => {
        expect(() => {
            computeOrdinalScale({
                ...ordinalScaleArgs,
                groups: [],
            })
        }).toThrow(`'groups' should be an array containing at least one item`)
    })
    it(`should compute a valid scale`, () => {
        const scale = computeOrdinalScale(ordinalScaleArgs)

        expect(scale.domain()).toEqual(ordinalScaleArgs.groups)
        expect(scale.range()).toEqual([12.5, 37.5, 62.5, 87.5])
        expect(scale('A')).toBe(12.5)
        expect(scale('C')).toBe(62.5)
    })
})
