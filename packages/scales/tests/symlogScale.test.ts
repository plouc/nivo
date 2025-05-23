import { createSymlogScale } from '../src'

it(`should be able to build a symlog scale for x axis`, () => {
    const scale = createSymlogScale(
        { type: 'symlog', round: true },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(58)
    expect(scale(1)).toBe(100)
})

it(`should be able to build a symlog scale for y axis`, () => {
    const scale = createSymlogScale(
        { type: 'symlog', round: true },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(42)
    expect(scale(1)).toBe(0)
})

it(`should allow to define min value for x axis`, () => {
    const scale = createSymlogScale(
        { type: 'symlog', min: 0.5, round: true },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(-141)
    expect(scale(0.5)).toBe(0)
    expect(scale(1)).toBe(100)
})

it(`should allow to define min value for y axis`, () => {
    const scale = createSymlogScale(
        { type: 'symlog', min: 0.5, round: true },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(241)
    expect(scale(0.5)).toBe(100)
    expect(scale(1)).toBe(0)
})

it(`should allow to define max value for x axis`, () => {
    const scale = createSymlogScale(
        { type: 'symlog', max: 2, round: true },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )

    expect(scale.domain()[1]).toBe(2)
    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(37)
    expect(scale(1)).toBe(63)
})

it(`should allow to define max value for y axis`, () => {
    const scale = createSymlogScale(
        { type: 'symlog', max: 2, round: true },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale.domain()[1]).toBe(2)
    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(63)
    expect(scale(1)).toBe(37)
})

it(`should allow to reverse domain`, () => {
    const scale = createSymlogScale(
        { type: 'symlog', reverse: true, round: true },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(58)
    expect(scale(1)).toBe(100)
})

it(`should allow to adjust the constant`, () => {
    const scale = createSymlogScale(
        { type: 'symlog', constant: 0.1, round: true },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(75)
    expect(scale(1)).toBe(100)
})

it(`should allow to toggle rounding`, () => {
    const roundedScale = createSymlogScale(
        { type: 'symlog', round: true },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )
    expect(roundedScale(0.1)).toBe(14)

    const nonRoundedScale = createSymlogScale(
        { type: 'symlog', round: false },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )
    expect(nonRoundedScale(0.1)).toBe(13.75035237499349)
})

it(`should allow to toggle nice`, () => {
    const niceScale = createSymlogScale(
        { type: 'symlog' },
        { all: [], min: 0.1, max: 99.9 },
        100,
        'x'
    )
    expect(niceScale.domain()).toStrictEqual([0, 100])

    const nonNiceScale = createSymlogScale(
        { type: 'symlog', nice: false },
        { all: [], min: 0.1, max: 99.9 },
        100,
        'x'
    )
    expect(nonNiceScale.domain()).toStrictEqual([0.1, 99.9])
})
