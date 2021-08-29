import { useState, useEffect } from 'react'

const isClient = typeof window === 'object'

const useLocalStorage = (key, defaultValue) => {
    if (!isClient) return [defaultValue, () => {}]

    const [value, setValue] = useState(() => {
        try {
            return localStorage.getItem(key) || defaultValue
        } catch {
            return defaultValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, value)
        } catch {
            // nothing to do, we'll use default then
        }
    }, [value])

    return [value, setValue]
}

export default useLocalStorage
