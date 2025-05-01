export interface WaffleDatumSpec {
    id: string
    label?: string
}

export const generateWaffleData = <D extends WaffleDatumSpec>({
    groups,
    total,
}: {
    groups: D[]
    total: number
}): (D & {
    label: string
    value: number
})[] => {
    const slice = total / groups.length

    return groups.map(group => {
        return {
            ...group,
            label: group.label !== undefined ? group.label : group.id,
            value: Math.random() * slice,
        }
    })
}
