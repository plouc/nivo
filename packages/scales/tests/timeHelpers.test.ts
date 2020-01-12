/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createPrecisionMethod, TimeScalePrecision } from '../src/timeHelpers'

describe('createPrecisionMethod', () => {
    const input = new Date(2018, 9, 30, 15, 33, 47, 29)
    const testCases: Array<{
        precision: TimeScalePrecision
        expected: Date
    }> = [
        {
            precision: 'millisecond',
            expected: input,
        },
        {
            precision: 'second',
            expected: new Date(2018, 9, 30, 15, 33, 47, 0),
        },
        {
            precision: 'minute',
            expected: new Date(2018, 9, 30, 15, 33, 0, 0),
        },
        {
            precision: 'hour',
            expected: new Date(2018, 9, 30, 15, 0, 0, 0),
        },
        {
            precision: 'day',
            expected: new Date(2018, 9, 30, 0, 0, 0, 0),
        },
        {
            precision: 'month',
            expected: new Date(2018, 9, 1, 0, 0, 0, 0),
        },
        {
            precision: 'year',
            expected: new Date(2018, 0, 1, 0, 0, 0, 0),
        },
    ]

    testCases.forEach(({ precision, expected }) => {
        it(`should support ${precision} precision`, () => {
            const date = new Date(input.getTime())
            createPrecisionMethod(precision)(date)
            expect(date.getTime()).toBe(expected.getTime())
        })
    })
})
