import random from 'lodash/random'

interface Id {
    id: string
}

interface Variable {
    id: string
    range: [number, number]
    floating?: boolean
}

interface Group {
    id: string
}

export const generateParallelCoordinatesData = ({
    ids,
    variables,
}: {
    ids: Id[]
    variables: Variable[]
}) => {
    const datumGenerator = () =>
        variables.reduce((acc, variable) => {
            const value = random(variable.range[0], variable.range[1], variable.floating)

            return { ...acc, [variable.id]: value }
        }, {})

    return ids.map(id => {
        return {
            ...datumGenerator(),
            ...id,
        }
    })
}

export const generateGroupedParallelCoordinatesData = ({
    ids,
    groups,
    variables,
}: {
    ids: Id[]
    groups: Group[]
    variables: Variable[]
}) => {
    const data: Record<string, string | number>[] = []

    for (const group of groups) {
        // First, generate a baseline for each variable,
        // so that values within a group are close to each other.
        const baselineValues: Record<string, { base: number; variation: number }> = {}
        for (const variable of variables) {
            baselineValues[variable.id] = {
                base: random(variable.range[0], variable.range[1], variable.floating),
                variation: Math.abs(variable.range[1] - variable.range[0]) * 0.12,
            }
        }

        for (const id of ids) {
            const datum: Record<string, string | number> = { ...id, group: group.id }
            for (const variable of variables) {
                const baseline = baselineValues[variable.id]
                const unclampedValue =
                    baseline.base +
                    random(-baseline.variation, baseline.variation, variable.floating)

                datum[variable.id] = Math.max(
                    variable.range[0],
                    Math.min(variable.range[1], unclampedValue)
                )
            }

            data.push(datum)
        }
    }

    return data
}
