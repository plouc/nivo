/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createContext, useMemo } from 'react'
import { isString } from 'lodash'
import { config as presets } from '@react-spring/web'
import {MotionConfig, MotionContextConfig, MotionProviderProps} from './types'
import { defaultMotionProps } from './props'

export const MotionContext = createContext<MotionContextConfig>(defaultMotionProps)

export const MotionConfigProvider = ({
    children,
    animate = defaultMotionProps['animate'],
    stiffness = defaultMotionProps['stiffness'],
    damping = defaultMotionProps['damping'],
    config = defaultMotionProps['config'],
}: MotionProviderProps) => {
    const value = useMemo(() => {
        const reactSpringConfig = isString(config) ? presets[config] : config

        return {
            animate,
            stiffness,
            damping,
            config: reactSpringConfig as MotionConfig,
        }
    }, [animate, stiffness, damping, config])

    return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}
