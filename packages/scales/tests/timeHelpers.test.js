/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {
    createPrecisionMethod,
    TIME_PRECISION_MILLISECOND,
    TIME_PRECISION_SECOND,
    TIME_PRECISION_MINUTE,
    TIME_PRECISION_HOUR,
    TIME_PRECISION_DAY,
    TIME_PRECISION_MONTH,
    TIME_PRECISION_YEAR,
} from '../src/timeHelpers'

describe('createPrecisionMethod', () => {
    const input = new Date(2018, 9, 30, 15, 33, 47, 29)
    const testCases = [
        {
            precision: TIME_PRECISION_MILLISECOND,
            expected: input,
        },
        {
            precision: TIME_PRECISION_SECOND,
            expected: new Date(2018, 9, 30, 15, 33, 47, 0),
        },
        {
            precision: TIME_PRECISION_MINUTE,
            expected: new Date(2018, 9, 30, 15, 33, 0, 0),
        },
        {
            precision: TIME_PRECISION_HOUR,
            expected: new Date(2018, 9, 30, 15, 0, 0, 0),
        },
        {
            precision: TIME_PRECISION_DAY,
            expected: new Date(2018, 9, 30, 0, 0, 0, 0),
        },
        {
            precision: TIME_PRECISION_MONTH,
            expected: new Date(2018, 9, 1, 0, 0, 0, 0),
        },
        {
            precision: TIME_PRECISION_YEAR,
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
