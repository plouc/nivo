import { createLinearScale } from '../src'

it(`should be able to build a linear scale for x axis`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear' },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(50)
    expect(scale(1)).toBe(100)
})

it(`should be able to build a linear scale for y axis`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear' },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(50)
    expect(scale(1)).toBe(0)
})

it(`should allow to define min value for x axis`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear', min: 0.5 },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(-100)
    expect(scale(0.5)).toBe(0)
    expect(scale(1)).toBe(100)
})

it(`should allow to define min value for y axis`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear', min: 0.5 },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(200)
    expect(scale(0.5)).toBe(100)
    expect(scale(1)).toBe(0)
})

it(`should allow to define max value for x axis`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear', max: 2 },
        { all: [], min: 0, max: 1 },
        100,
        'x'
    )

    expect(scale.domain()[1]).toBe(2)
    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(25)
    expect(scale(1)).toBe(50)
})

it(`should allow to define max value for y axis`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear', max: 2 },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale.domain()[1]).toBe(2)
    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(75)
    expect(scale(1)).toBe(50)
})

it(`should allow to reverse domain`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear', reverse: true },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(50)
    expect(scale(1)).toBe(100)
})

it(`should allow to clamping`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear', clamp: true, min: 0.5 },
        { all: [], min: 0, max: 1 },
        100,
        'y'
    )

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(100)
    expect(scale(1)).toBe(0)
})

it(`should allow nice`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear', nice: true },
        { all: [], min: 0.243, max: 0.933 },
        100,
        'x'
    )

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(50)
    expect(scale(1)).toBe(100)
})

it(`should allow numeric nice`, () => {
    const scale = createLinearScale<number>(
        { type: 'linear', nice: 2 },
        { all: [], min: 0.243, max: 0.933 },
        100,
        'x'
    )

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(50)
    expect(scale(1)).toBe(100)
})
