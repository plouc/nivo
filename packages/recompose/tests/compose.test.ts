import { compose } from '../src'

test('compose composes from right to left', () => {
    const double = (x: number) => x * 2
    const square = (x: number) => x * x
    // @ts-expect-error not entirely sure why ts is complaining tbh
    expect(compose(square)(5)).toBe(25)
    // @ts-expect-error not entirely sure why ts is complaining tbh
    expect(compose(square, double)(5)).toBe(100)
    // @ts-expect-error not entirely sure why ts is complaining tbh
    expect(compose(double, square, double)(5)).toBe(200)
})

test('compose can be seeded with multiple arguments', () => {
    const square = (x: number) => x * x
    const add = (x: number, y: number) => x + y
    expect(compose(square, add)(1, 2)).toBe(9)
})

test('compose returns the identity function if given no arguments', () => {
    // @ts-expect-error not entirely sure why ts is complaining tbh
    expect(compose()(1, 2)).toBe(1)
    // @ts-expect-error not entirely sure why ts is complaining tbh
    expect(compose()(3)).toBe(3)
    // @ts-expect-error not entirely sure why ts is complaining tbh
    expect(compose()()).toBe(undefined)
})

test('compose returns the first function if given only one', () => {
    const fn = (x: number) => x * x
    // @ts-expect-error not entirely sure why ts is complaining tbh
    expect(compose(fn)(3)).toBe(fn(3))
})
