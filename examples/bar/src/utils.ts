export const inc = (value = 0) => value + 1

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

export const range = (start: number, end: number) =>
    Array.from(' '.repeat(end - start), (_, index) => start + index)

export const shuffle = <T>(values: T[]) =>
    values
        .map(value => [Math.random(), value] as const)
        .sort(([left], [right]) => left - right)
        .map(([, value]) => value)
