import { linearScale } from '../src/linearScale'

it(`should be able to build a linear scale for x axis`, () => {
    const scale = linearScale({ axis: 'x' }, { x: { min: 0, max: 1 } }, 100, 100)

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(50)
    expect(scale(1)).toBe(100)
})

it(`should be able to build a linear scale for y axis`, () => {
    const scale = linearScale({ axis: 'y' }, { y: { min: 0, max: 1 } }, 100, 100)

    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(50)
    expect(scale(1)).toBe(0)
})

it(`should allow to define min value for x axis`, () => {
    const scale = linearScale({ axis: 'x', min: 0.5 }, { x: { min: 0, max: 1 } }, 100, 100)

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(-100)
    expect(scale(0.5)).toBe(0)
    expect(scale(1)).toBe(100)
})

it(`should allow to define min value for y axis`, () => {
    const scale = linearScale({ axis: 'y', min: 0.5 }, { y: { min: 0, max: 1 } }, 100, 100)

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(200)
    expect(scale(0.5)).toBe(100)
    expect(scale(1)).toBe(0)
})

it(`should allow to define max value for x axis`, () => {
    const scale = linearScale({ axis: 'x', max: 2 }, { x: { min: 0, max: 1 } }, 100, 100)

    expect(scale.domain()[1]).toBe(2)
    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(25)
    expect(scale(1)).toBe(50)
})

it(`should allow to define max value for y axis`, () => {
    const scale = linearScale({ axis: 'y', max: 2 }, { y: { min: 0, max: 1 } }, 100, 100)

    expect(scale.domain()[1]).toBe(2)
    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(75)
    expect(scale(1)).toBe(50)
})

it(`should allow to reverse domain`, () => {
    const scale = linearScale({ axis: 'y', reverse: true }, { y: { min: 0, max: 1 } }, 100, 100)

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(50)
    expect(scale(1)).toBe(100)
})
