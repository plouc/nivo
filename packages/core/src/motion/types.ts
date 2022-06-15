import { ReactNode } from 'react'
import { config as presets } from '@react-spring/core/dist/declarations/src/constants'
import { SpringConfig } from '@react-spring/web'

export type MotionConfig = {
    mass: number
    tension: number
    friction: number
    clamp: boolean
    precision: number
    velocity: number
    duration: number
    easing: (t: number) => number
}

export type MotionContextConfig = {
    animate: boolean
    stiffness: number
    damping: number
    config: Partial<MotionConfig>
    [key: string]: boolean | number | string | Record<string, unknown>
}

export type MotionContextProps = {
    animate: boolean
    stiffness: number
    damping: number
    config: keyof typeof presets | Partial<MotionConfig> | SpringConfig
}

export interface MotionProviderProps extends MotionContextProps {
    children: ReactNode
}

export type ModernMotionProps = Partial<{
    animate: boolean
    motionConfig: keyof typeof presets | SpringConfig
}>
