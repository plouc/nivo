/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useContext, useEffect, useMemo, useRef } from 'react'
import { interpolateString } from 'd3-interpolate'
import { to, useSpring } from '@react-spring/web'
import { MotionContext } from './context'

/**
: {
    animate: boolean
    config: SpringConfig
    stiffness: number
    damping: number
}
 **/

export const useMotionConfig = () => useContext(MotionContext)

const usePrevious = (value: string) => {
    const ref = useRef<null | string>(null)

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

export const useAnimatedPath = (path: string) => {
    const { animate, config: springConfig } = useMotionConfig()

    const previousPath = usePrevious(path)
    const interpolator = useMemo(
        () => interpolateString(previousPath ?? '', path),
        [previousPath, path]
    )

    const { value } = useSpring({
        from: { value: 0 },
        to: { value: 1 },
        reset: true,
        config: springConfig,
        immediate: !animate,
    })

    return to(value, interpolator)
}
