/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { generateSeriesAxis, stackAxis, computeAxisSlices } from '../src/compute'

const axes = ['x', 'y']

describe('generateSeriesAxis', () => {
    const pointScaleExpectation = {
        all: ['a', 'b', 'c', 'd', 'e'],
        min: 'a',
        max: 'e',
    }

    const linearScaleExpectation = {
        all: [0, 1, 2, 3, 4],
        min: 0,
        max: 4,
    }

    const timeScaleExpectation = {
        all: [
            new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2018, 3, 2, 0, 0, 0, 0)),
            new Date(Date.UTC(2018, 3, 3, 0, 0, 0, 0)),
            new Date(Date.UTC(2018, 3, 4, 0, 0, 0, 0)),
            new Date(Date.UTC(2018, 3, 5, 0, 0, 0, 0)),
            new Date(Date.UTC(2018, 3, 6, 0, 0, 0, 0)),
        ],
        min: new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
        max: new Date(Date.UTC(2018, 3, 6, 0, 0, 0, 0)),
    }

    axes.forEach(axis => {
        describe(`${axis} axis`, () => {
            it('should compute values for point scale', () => {
                expect(
                    generateSeriesAxis(
                        [
                            {
                                id: 'A',
                                data: [
                                    { data: { [axis]: 'a' } },
                                    { data: { [axis]: 'b' } },
                                    { data: { [axis]: 'c' } },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    { data: { [axis]: 'c' } },
                                    { data: { [axis]: 'd' } },
                                    { data: { [axis]: 'e' } },
                                ],
                            },
                        ],
                        axis,
                        { type: 'point' }
                    )
                ).toEqual(pointScaleExpectation)
            })

            it('should compute values for linear scale', () => {
                expect(
                    generateSeriesAxis(
                        [
                            {
                                id: 'A',
                                data: [
                                    { data: { [axis]: 0 } },
                                    { data: { [axis]: '1' } },
                                    { data: { [axis]: '02' } },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    { data: { [axis]: 2 } },
                                    { data: { [axis]: '3' } },
                                    { data: { [axis]: '04' } },
                                ],
                            },
                        ],
                        axis,
                        { type: 'linear' }
                    )
                ).toEqual(linearScaleExpectation)
            })

            it('should sort values for linear scale', () => {
                expect(
                    generateSeriesAxis(
                        [
                            {
                                id: 'A',
                                data: [
                                    { data: { [axis]: '1' } },
                                    { data: { [axis]: '02' } },
                                    { data: { [axis]: 0 } },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    { data: { [axis]: '04' } },
                                    { data: { [axis]: 2 } },
                                    { data: { [axis]: '3' } },
                                ],
                            },
                        ],
                        axis,
                        { type: 'linear' }
                    )
                ).toEqual(linearScaleExpectation)
            })

            it('should compute values for time scale with native dates', () => {
                expect(
                    generateSeriesAxis(
                        [
                            {
                                id: 'A',
                                data: [
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
                                        },
                                    },
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 2, 0, 0, 0, 0)),
                                        },
                                    },
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 3, 0, 0, 0, 0)),
                                        },
                                    },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 4, 0, 0, 0, 0)),
                                        },
                                    },
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 5, 0, 0, 0, 0)),
                                        },
                                    },
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 6, 0, 0, 0, 0)),
                                        },
                                    },
                                ],
                            },
                        ],
                        axis,
                        { type: 'time', format: 'native' }
                    )
                ).toEqual(timeScaleExpectation)
            })

            it('should sort values for time scale with native dates', () => {
                expect(
                    generateSeriesAxis(
                        [
                            {
                                id: 'A',
                                data: [
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 3, 0, 0, 0, 0)),
                                        },
                                    },
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
                                        },
                                    },
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 2, 0, 0, 0, 0)),
                                        },
                                    },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 6, 0, 0, 0, 0)),
                                        },
                                    },
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 4, 0, 0, 0, 0)),
                                        },
                                    },
                                    {
                                        data: {
                                            [axis]: new Date(Date.UTC(2018, 3, 5, 0, 0, 0, 0)),
                                        },
                                    },
                                ],
                            },
                        ],
                        axis,
                        { type: 'time', format: 'native' }
                    )
                ).toEqual(timeScaleExpectation)
            })

            it('should compute values for time scale using scale format', () => {
                expect(
                    generateSeriesAxis(
                        [
                            {
                                id: 'A',
                                data: [
                                    {
                                        data: { [axis]: '2018-4-1 0:0:0' },
                                    },
                                    {
                                        data: { [axis]: '2018-4-2 0:0:0' },
                                    },
                                    {
                                        data: { [axis]: '2018-4-3 0:0:0' },
                                    },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    {
                                        data: { [axis]: '2018-4-4 0:0:0' },
                                    },
                                    {
                                        data: { [axis]: '2018-4-5 0:0:0' },
                                    },
                                    {
                                        data: { [axis]: '2018-4-6 0:0:0' },
                                    },
                                ],
                            },
                        ],
                        axis,
                        { type: 'time', format: '%Y-%m-%d %H:%M:%S' }
                    )
                ).toEqual(timeScaleExpectation)
            })

            it('should sort values for time scale using scale format', () => {
                expect(
                    generateSeriesAxis(
                        [
                            {
                                id: 'A',
                                data: [
                                    {
                                        data: { [axis]: '2018-4-3 0:0:0' },
                                    },
                                    {
                                        data: { [axis]: '2018-4-1 0:0:0' },
                                    },
                                    {
                                        data: { [axis]: '2018-4-2 0:0:0' },
                                    },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    {
                                        data: { [axis]: '2018-4-6 0:0:0' },
                                    },
                                    {
                                        data: { [axis]: '2018-4-4 0:0:0' },
                                    },
                                    {
                                        data: { [axis]: '2018-4-5 0:0:0' },
                                    },
                                ],
                            },
                        ],
                        axis,
                        { type: 'time', format: '%Y-%m-%d %H:%M:%S' }
                    )
                ).toEqual(timeScaleExpectation)
            })
        })
    })
})

describe('stackAxis', () => {
    axes.forEach(axis => {
        const otherAxis = axis === 'x' ? 'y' : 'x'

        describe(`${axis} axis`, () => {
            it(`should stack values using ${otherAxis} point scale`, () => {
                const xy = {
                    [otherAxis]: {
                        all: ['a', 'b', 'c'],
                    },
                    [axis]: {},
                }
                const series = [
                    {
                        id: 'A',
                        data: [
                            { data: { [otherAxis]: 'a', [axis]: 10 } },
                            { data: { [otherAxis]: 'b', [axis]: 20 } },
                            { data: { [otherAxis]: 'c', [axis]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { data: { [otherAxis]: 'a', [axis]: 1 } },
                            { data: { [otherAxis]: 'b', [axis]: 2 } },
                            { data: { [otherAxis]: 'c', [axis]: 3 } },
                        ],
                    },
                ]
                stackAxis(axis, 'point', xy, series)

                expect(xy[axis]).toEqual({ minStacked: 10, maxStacked: 33 })
                expect(series).toEqual([
                    {
                        id: 'A',
                        data: [
                            {
                                data: {
                                    [otherAxis]: 'a',
                                    [axis]: 10,
                                    [`${axis}Stacked`]: 10,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: 'b',
                                    [axis]: 20,
                                    [`${axis}Stacked`]: 20,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: 'c',
                                    [axis]: 30,
                                    [`${axis}Stacked`]: 30,
                                },
                            },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { data: { [otherAxis]: 'a', [axis]: 1, [`${axis}Stacked`]: 11 } },
                            { data: { [otherAxis]: 'b', [axis]: 2, [`${axis}Stacked`]: 22 } },
                            { data: { [otherAxis]: 'c', [axis]: 3, [`${axis}Stacked`]: 33 } },
                        ],
                    },
                ])
            })

            it(`should stack values using ${otherAxis} linear scale`, () => {
                const xy = {
                    [otherAxis]: {
                        all: [1, 2, 3],
                    },
                    [axis]: {},
                }
                const series = [
                    {
                        id: 'A',
                        data: [
                            { data: { [otherAxis]: 1, [axis]: 10 } },
                            { data: { [otherAxis]: 2, [axis]: 20 } },
                            { data: { [otherAxis]: 3, [axis]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { data: { [otherAxis]: 1, [axis]: 1 } },
                            { data: { [otherAxis]: 2, [axis]: 2 } },
                            { data: { [otherAxis]: 3, [axis]: 3 } },
                        ],
                    },
                ]
                stackAxis(axis, 'linear', xy, series)

                expect(xy[axis]).toEqual({ minStacked: 10, maxStacked: 33 })
                expect(series).toEqual([
                    {
                        id: 'A',
                        data: [
                            { data: { [otherAxis]: 1, [axis]: 10, [`${axis}Stacked`]: 10 } },
                            { data: { [otherAxis]: 2, [axis]: 20, [`${axis}Stacked`]: 20 } },
                            { data: { [otherAxis]: 3, [axis]: 30, [`${axis}Stacked`]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { data: { [otherAxis]: 1, [axis]: 1, [`${axis}Stacked`]: 11 } },
                            { data: { [otherAxis]: 2, [axis]: 2, [`${axis}Stacked`]: 22 } },
                            { data: { [otherAxis]: 3, [axis]: 3, [`${axis}Stacked`]: 33 } },
                        ],
                    },
                ])
            })

            it(`should stack values using ${otherAxis} time scale`, () => {
                const xy = {
                    [otherAxis]: {
                        all: [
                            new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
                            new Date(Date.UTC(2018, 3, 2, 0, 0, 0, 0)),
                            new Date(Date.UTC(2018, 3, 3, 0, 0, 0, 0)),
                        ],
                    },
                    [axis]: {},
                }
                const series = [
                    {
                        id: 'A',
                        data: [
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
                                    [axis]: 10,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 2, 0, 0, 0, 0)),
                                    [axis]: 20,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 3, 0, 0, 0, 0)),
                                    [axis]: 30,
                                },
                            },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
                                    [axis]: 1,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 2, 0, 0, 0, 0)),
                                    [axis]: 2,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 3, 0, 0, 0, 0)),
                                    [axis]: 3,
                                },
                            },
                        ],
                    },
                ]
                stackAxis(axis, 'time', xy, series)

                expect(xy[axis]).toEqual({ minStacked: 10, maxStacked: 33 })
                expect(series).toEqual([
                    {
                        id: 'A',
                        data: [
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
                                    [axis]: 10,
                                    [`${axis}Stacked`]: 10,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 2, 0, 0, 0, 0)),
                                    [axis]: 20,
                                    [`${axis}Stacked`]: 20,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 3, 0, 0, 0, 0)),
                                    [axis]: 30,
                                    [`${axis}Stacked`]: 30,
                                },
                            },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 1, 0, 0, 0, 0)),
                                    [axis]: 1,
                                    [`${axis}Stacked`]: 11,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 2, 0, 0, 0, 0)),
                                    [axis]: 2,
                                    [`${axis}Stacked`]: 22,
                                },
                            },
                            {
                                data: {
                                    [otherAxis]: new Date(Date.UTC(2018, 3, 3, 0, 0, 0, 0)),
                                    [axis]: 3,
                                    [`${axis}Stacked`]: 33,
                                },
                            },
                        ],
                    },
                ])
            })

            it(`should handle null values`, () => {
                const xy = {
                    [otherAxis]: {
                        all: [1, 2, 3],
                    },
                    [axis]: {},
                }
                const series = [
                    {
                        id: 'A',
                        data: [
                            { data: { [otherAxis]: 1, [axis]: 10 } },
                            { data: { [otherAxis]: 2, [axis]: null } },
                            { data: { [otherAxis]: 3, [axis]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { data: { [otherAxis]: 1, [axis]: 1 } },
                            { data: { [otherAxis]: 2, [axis]: 2 } },
                            { data: { [otherAxis]: 3, [axis]: null } },
                        ],
                    },
                ]
                stackAxis(axis, 'linear', xy, series)

                expect(xy).toEqual({
                    [otherAxis]: { all: [1, 2, 3] },
                    [axis]: { minStacked: 10, maxStacked: 30 },
                })
                expect(series).toEqual([
                    {
                        id: 'A',
                        data: [
                            { data: { [otherAxis]: 1, [axis]: 10, [`${axis}Stacked`]: 10 } },
                            {
                                data: {
                                    [otherAxis]: 2,
                                    [axis]: null,
                                    [`${axis}Stacked`]: null,
                                },
                            },
                            { data: { [otherAxis]: 3, [axis]: 30, [`${axis}Stacked`]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { data: { [otherAxis]: 1, [axis]: 1, [`${axis}Stacked`]: 11 } },
                            { data: { [otherAxis]: 2, [axis]: 2, [`${axis}Stacked`]: null } },
                            {
                                data: {
                                    [otherAxis]: 3,
                                    [axis]: null,
                                    [`${axis}Stacked`]: null,
                                },
                            },
                        ],
                    },
                ])
            })
        })
    })
})

describe('computeAxisSlices', () => {
    axes.forEach(axis => {
        const otherAxis = axis === 'x' ? 'y' : 'x'

        describe(`${axis} axis`, () => {
            it('should compute slices', () => {
                const serieA = {
                    id: 'A',
                    data: [
                        { data: { [otherAxis]: 1, [axis]: 10, [`${axis}Stacked`]: 10 } },
                        { data: { [otherAxis]: 2, [axis]: 20, [`${axis}Stacked`]: 20 } },
                        { data: { [otherAxis]: 3, [axis]: 30, [`${axis}Stacked`]: 30 } },
                    ],
                }
                const serieB = {
                    id: 'B',
                    data: [
                        { data: { [otherAxis]: 1, [axis]: 1, [`${axis}Stacked`]: 11 } },
                        { data: { [otherAxis]: 2, [axis]: 2, [`${axis}Stacked`]: 22 } },
                        { data: { [otherAxis]: 3, [axis]: 3, [`${axis}Stacked`]: 33 } },
                    ],
                }

                computeAxisSlices(axis, {
                    series: [serieA, serieB],
                    [otherAxis]: { all: [1, 2, 3] },
                    [`${otherAxis}Scale`]: v => v,
                })
            })
        })
    })
})
