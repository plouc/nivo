/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
