import { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const useMeasure = () => {
    const measureRef = useRef(null)
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    })
    const [observer] = useState(() => new ResizeObserver(([entry]) => setBounds(entry.contentRect)))

    useEffect(() => {
        if (measureRef.current) {
            observer.observe(measureRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return [measureRef, bounds]
}
