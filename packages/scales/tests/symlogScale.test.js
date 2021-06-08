import { symlogScale } from '../src/symlogScale'

it(`should be able to build a symlog scale for x axis`, () => {
    const scale = symlogScale({ axis: 'x' }, { x: { min: 0, max: 1 } }, 100, 100)

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(58)
    expect(scale(1)).toBe(100)
})

it(`should be able to build a symlog scale for y axis`, () => {
    const scale = symlogScale({ axis: 'y' }, { y: { min: 0, max: 1 } }, 100, 100)

    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(42)
    expect(scale(1)).toBe(0)
})

it(`should allow to define min value for x axis`, () => {
    const scale = symlogScale({ axis: 'x', min: 0.5 }, { x: { min: 0, max: 1 } }, 100, 100)

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(-141)
    expect(scale(0.5)).toBe(0)
    expect(scale(1)).toBe(100)
})

it(`should allow to define min value for y axis`, () => {
    const scale = symlogScale({ axis: 'y', min: 0.5 }, { y: { min: 0, max: 1 } }, 100, 100)

    expect(scale.domain()[0]).toBe(0.5)
    expect(scale(0)).toBe(241)
    expect(scale(0.5)).toBe(100)
    expect(scale(1)).toBe(0)
})

it(`should allow to define max value for x axis`, () => {
    const scale = symlogScale({ axis: 'x', max: 2 }, { x: { min: 0, max: 1 } }, 100, 100)

    expect(scale.domain()[1]).toBe(2)
    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(37)
    expect(scale(1)).toBe(63)
})

it(`should allow to define max value for y axis`, () => {
    const scale = symlogScale({ axis: 'y', max: 2 }, { y: { min: 0, max: 1 } }, 100, 100)

    expect(scale.domain()[1]).toBe(2)
    expect(scale(0)).toBe(100)
    expect(scale(0.5)).toBe(63)
    expect(scale(1)).toBe(37)
})

it(`should allow to reverse domain`, () => {
    const scale = symlogScale({ axis: 'y', reverse: true }, { y: { min: 0, max: 1 } }, 100, 100)

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(58)
    expect(scale(1)).toBe(100)
})

it(`should allow to adjust the constant`, () => {
    const scale = symlogScale({ axis: 'x', constant: 0.1 }, { x: { min: 0, max: 1 } }, 100, 100)

    expect(scale(0)).toBe(0)
    expect(scale(0.5)).toBe(75)
    expect(scale(1)).toBe(100)
})
