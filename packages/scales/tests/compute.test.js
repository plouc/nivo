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
            new Date(2018, 3, 1, 0, 0, 0, 0),
            new Date(2018, 3, 2, 0, 0, 0, 0),
            new Date(2018, 3, 3, 0, 0, 0, 0),
            new Date(2018, 3, 4, 0, 0, 0, 0),
            new Date(2018, 3, 5, 0, 0, 0, 0),
            new Date(2018, 3, 6, 0, 0, 0, 0),
        ],
        min: new Date(2018, 3, 1, 0, 0, 0, 0),
        max: new Date(2018, 3, 6, 0, 0, 0, 0),
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
                                    { normalized: { [axis]: 'a' } },
                                    { normalized: { [axis]: 'b' } },
                                    { normalized: { [axis]: 'c' } },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    { normalized: { [axis]: 'c' } },
                                    { normalized: { [axis]: 'd' } },
                                    { normalized: { [axis]: 'e' } },
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
                                    { data: { [axis]: 0 }, normalized: {} },
                                    { data: { [axis]: '1' }, normalized: {} },
                                    { data: { [axis]: '02' }, normalized: {} },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    { data: { [axis]: 2 }, normalized: {} },
                                    { data: { [axis]: '3' }, normalized: {} },
                                    { data: { [axis]: '04' }, normalized: {} },
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
                                    { data: { [axis]: '1' }, normalized: {} },
                                    { data: { [axis]: '02' }, normalized: {} },
                                    { data: { [axis]: 0 }, normalized: {} },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    { data: { [axis]: '04' }, normalized: {} },
                                    { data: { [axis]: 2 }, normalized: {} },
                                    { data: { [axis]: '3' }, normalized: {} },
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
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 1, 0, 0, 0, 0) },
                                    },
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 2, 0, 0, 0, 0) },
                                    },
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 3, 0, 0, 0, 0) },
                                    },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 4, 0, 0, 0, 0) },
                                    },
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 5, 0, 0, 0, 0) },
                                    },
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 6, 0, 0, 0, 0) },
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
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 3, 0, 0, 0, 0) },
                                    },
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 1, 0, 0, 0, 0) },
                                    },
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 2, 0, 0, 0, 0) },
                                    },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 6, 0, 0, 0, 0) },
                                    },
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 4, 0, 0, 0, 0) },
                                    },
                                    {
                                        data: {},
                                        normalized: { [axis]: new Date(2018, 3, 5, 0, 0, 0, 0) },
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
                                        normalized: {},
                                    },
                                    {
                                        data: { [axis]: '2018-4-2 0:0:0' },
                                        normalized: {},
                                    },
                                    {
                                        data: { [axis]: '2018-4-3 0:0:0' },
                                        normalized: {},
                                    },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    {
                                        data: { [axis]: '2018-4-4 0:0:0' },
                                        normalized: {},
                                    },
                                    {
                                        data: { [axis]: '2018-4-5 0:0:0' },
                                        normalized: {},
                                    },
                                    {
                                        data: { [axis]: '2018-4-6 0:0:0' },
                                        normalized: {},
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
                                        normalized: {},
                                    },
                                    {
                                        data: { [axis]: '2018-4-1 0:0:0' },
                                        normalized: {},
                                    },
                                    {
                                        data: { [axis]: '2018-4-2 0:0:0' },
                                        normalized: {},
                                    },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    {
                                        data: { [axis]: '2018-4-6 0:0:0' },
                                        normalized: {},
                                    },
                                    {
                                        data: { [axis]: '2018-4-4 0:0:0' },
                                        normalized: {},
                                    },
                                    {
                                        data: { [axis]: '2018-4-5 0:0:0' },
                                        normalized: {},
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
                            { normalized: { [otherAxis]: 'a', [axis]: 10 } },
                            { normalized: { [otherAxis]: 'b', [axis]: 20 } },
                            { normalized: { [otherAxis]: 'c', [axis]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { normalized: { [otherAxis]: 'a', [axis]: 1 } },
                            { normalized: { [otherAxis]: 'b', [axis]: 2 } },
                            { normalized: { [otherAxis]: 'c', [axis]: 3 } },
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
                                normalized: {
                                    [otherAxis]: 'a',
                                    [axis]: 10,
                                    [`${axis}Stacked`]: 10,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: 'b',
                                    [axis]: 20,
                                    [`${axis}Stacked`]: 20,
                                },
                            },
                            {
                                normalized: {
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
                            { normalized: { [otherAxis]: 'a', [axis]: 1, [`${axis}Stacked`]: 11 } },
                            { normalized: { [otherAxis]: 'b', [axis]: 2, [`${axis}Stacked`]: 22 } },
                            { normalized: { [otherAxis]: 'c', [axis]: 3, [`${axis}Stacked`]: 33 } },
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
                            { normalized: { [otherAxis]: 1, [axis]: 10 } },
                            { normalized: { [otherAxis]: 2, [axis]: 20 } },
                            { normalized: { [otherAxis]: 3, [axis]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { normalized: { [otherAxis]: 1, [axis]: 1 } },
                            { normalized: { [otherAxis]: 2, [axis]: 2 } },
                            { normalized: { [otherAxis]: 3, [axis]: 3 } },
                        ],
                    },
                ]
                stackAxis(axis, 'linear', xy, series)

                expect(xy[axis]).toEqual({ minStacked: 10, maxStacked: 33 })
                expect(series).toEqual([
                    {
                        id: 'A',
                        data: [
                            { normalized: { [otherAxis]: 1, [axis]: 10, [`${axis}Stacked`]: 10 } },
                            { normalized: { [otherAxis]: 2, [axis]: 20, [`${axis}Stacked`]: 20 } },
                            { normalized: { [otherAxis]: 3, [axis]: 30, [`${axis}Stacked`]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { normalized: { [otherAxis]: 1, [axis]: 1, [`${axis}Stacked`]: 11 } },
                            { normalized: { [otherAxis]: 2, [axis]: 2, [`${axis}Stacked`]: 22 } },
                            { normalized: { [otherAxis]: 3, [axis]: 3, [`${axis}Stacked`]: 33 } },
                        ],
                    },
                ])
            })

            it(`should stack values using ${otherAxis} time scale`, () => {
                const xy = {
                    [otherAxis]: {
                        all: [
                            new Date(2018, 3, 1, 0, 0, 0, 0),
                            new Date(2018, 3, 2, 0, 0, 0, 0),
                            new Date(2018, 3, 3, 0, 0, 0, 0),
                        ],
                    },
                    [axis]: {},
                }
                const series = [
                    {
                        id: 'A',
                        data: [
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 1, 0, 0, 0, 0),
                                    [axis]: 10,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 2, 0, 0, 0, 0),
                                    [axis]: 20,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 3, 0, 0, 0, 0),
                                    [axis]: 30,
                                },
                            },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 1, 0, 0, 0, 0),
                                    [axis]: 1,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 2, 0, 0, 0, 0),
                                    [axis]: 2,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 3, 0, 0, 0, 0),
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
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 1, 0, 0, 0, 0),
                                    [axis]: 10,
                                    [`${axis}Stacked`]: 10,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 2, 0, 0, 0, 0),
                                    [axis]: 20,
                                    [`${axis}Stacked`]: 20,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 3, 0, 0, 0, 0),
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
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 1, 0, 0, 0, 0),
                                    [axis]: 1,
                                    [`${axis}Stacked`]: 11,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 2, 0, 0, 0, 0),
                                    [axis]: 2,
                                    [`${axis}Stacked`]: 22,
                                },
                            },
                            {
                                normalized: {
                                    [otherAxis]: new Date(2018, 3, 3, 0, 0, 0, 0),
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
                            { normalized: { [otherAxis]: 1, [axis]: 10 } },
                            { normalized: { [otherAxis]: 2, [axis]: null } },
                            { normalized: { [otherAxis]: 3, [axis]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { normalized: { [otherAxis]: 1, [axis]: 1 } },
                            { normalized: { [otherAxis]: 2, [axis]: 2 } },
                            { normalized: { [otherAxis]: 3, [axis]: null } },
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
                            { normalized: { [otherAxis]: 1, [axis]: 10, [`${axis}Stacked`]: 10 } },
                            {
                                normalized: {
                                    [otherAxis]: 2,
                                    [axis]: null,
                                    [`${axis}Stacked`]: null,
                                },
                            },
                            { normalized: { [otherAxis]: 3, [axis]: 30, [`${axis}Stacked`]: 30 } },
                        ],
                    },
                    {
                        id: 'B',
                        data: [
                            { normalized: { [otherAxis]: 1, [axis]: 1, [`${axis}Stacked`]: 11 } },
                            { normalized: { [otherAxis]: 2, [axis]: 2, [`${axis}Stacked`]: null } },
                            {
                                normalized: {
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
                        { normalized: { [otherAxis]: 1, [axis]: 10, [`${axis}Stacked`]: 10 } },
                        { normalized: { [otherAxis]: 2, [axis]: 20, [`${axis}Stacked`]: 20 } },
                        { normalized: { [otherAxis]: 3, [axis]: 30, [`${axis}Stacked`]: 30 } },
                    ],
                }
                const serieB = {
                    id: 'B',
                    data: [
                        { normalized: { [otherAxis]: 1, [axis]: 1, [`${axis}Stacked`]: 11 } },
                        { normalized: { [otherAxis]: 2, [axis]: 2, [`${axis}Stacked`]: 22 } },
                        { normalized: { [otherAxis]: 3, [axis]: 3, [`${axis}Stacked`]: 33 } },
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
