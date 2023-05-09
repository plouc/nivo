import random from 'lodash/random'

interface IdSpec {
    id: string
    label?: string
}

interface VariableSpec {
    id: string
    range: [number, number]
}

type Options = Partial<{
    ids: IdSpec[]
    groups: string[]
    variables: VariableSpec[]
}>

export const generateParallelCoordinatesData = ({
    ids = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }],
    groups = [],
    variables = [
        { id: 'temp', range: [-10, 40] },
        { id: 'cost', range: [200, 40000] },
        { id: 'weight', range: [10, 300] },
        { id: 'volume', range: [0.2, 7.6] },
    ],
}: Options = {}) => {
    const datumGenerator = () =>
        variables.reduce((acc, variable) => {
            const value = random(...variable.range)

            return { ...acc, [variable.id]: value }
        }, {})

    if (groups.length === 0) {
        return ids.map(id => {
            return {
                ...datumGenerator(),
                ...id,
            }
        })
    }

    const data: Record<string, string | number>[] = []
    for (const group of groups) {
        for (const id of ids) {
            data.push({
                ...datumGenerator(),
                group,
                ...id,
                id: `${group}.${id.id}`,
            })
        }
    }

    return data
}
