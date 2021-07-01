import { useMemo } from 'react'
import { defaultMargin } from '../defaults'

export const useDimensions = (width, height, partialMargin = {}) =>
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
    }, [
        width,
        height,
        partialMargin.top,
        partialMargin.right,
        partialMargin.bottom,
        partialMargin.left,
    ])
