export const pick = (obj: Record<string, unknown>, keys: string[]) => {
    const result: Record<string, unknown> = {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key]
        }
    }
    return result
}
