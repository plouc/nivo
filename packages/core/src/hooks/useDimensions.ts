/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { defaultMargin } from '../defaults'

export const useDimensions = (
    width: number,
    height: number,
    partialMargin: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    } = {}
) => {
    return useMemo(() => {
        const margin: {
            top: number
            right: number
            bottom: number
            left: number
        } = {
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
}
