export function mergeRefs(...refs) {
    return value => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(value)
            } else if (ref != null) {
                ref.current = value
            }
        }
    }
}
