import { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const useMeasure = () => {
    const measureRef = useRef(null)
    const animationFrameId = useRef(null)
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    })
    const [observer] = useState(
        () =>
            new ResizeObserver(([entry]) => {
                // wrap this call in requestAnimationFrame to avoid "Resize Observer loop limit exceeded"
                // error in certain situations
                animationFrameId.current = requestAnimationFrame(() => {
                    setBounds(entry.contentRect)
                })
            })
    )

    useEffect(() => {
        if (measureRef.current) {
            observer.observe(measureRef.current)
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
            observer.disconnect()
        }
    }, [])

    return [measureRef, bounds]
}
