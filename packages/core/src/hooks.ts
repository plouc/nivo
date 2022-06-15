import { useRef, useState, useEffect, useMemo, MutableRefObject } from 'react'
import { Bounds, Margin } from './types'
import { curveFromProp, CurveFactoryId, defaultMargin } from './props'
import { getValueFormatter } from './lib/values'
import { ValueFormat } from './lib/types'

export const useMeasure = (): [MutableRefObject<null>, Bounds] => {
    const measureRef = useRef<null>(null)

    const [bounds, setBounds] = useState<Bounds>({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    })

    const [observer] = useState(() => {
        // Check if window is defined (so if in the browser or in node.js).
        const isBrowser = typeof window !== 'undefined'
        if (!isBrowser) return null

        return new ResizeObserver(([entry]) => setBounds(entry.contentRect))
    })

    useEffect(() => {
        if (measureRef.current && observer !== null) {
            observer.observe(measureRef.current)
        }

        return () => {
            if (observer !== null) observer.disconnect()
        }
    }, [observer])

    return [measureRef, bounds]
}

export const useDimensions = (width: number, height: number, partialMargin: Partial<Margin> = {}) =>
    useMemo(() => {
        const margin = {
            ...defaultMargin,
            ...partialMargin,
        }

        return {
            margin,
            innerWidth: width - margin.left - margin.right,
            innerHeight: height - margin.top - margin.bottom,
            outerWidth: width,
            outerHeight: height,
        }
    }, [width, height, partialMargin])

/** transform d3 curve interpolation id to its corresponding interpolator. */
export const useCurveInterpolation = (interpolation: CurveFactoryId) =>
    useMemo(() => curveFromProp(interpolation), [interpolation])

export const useValueFormatter = <Value>(format?: ValueFormat<Value>) =>
    useMemo(() => getValueFormatter<Value>(format), [format])
