import { ReactNode } from 'react'
import { config as presets } from '@react-spring/core/dist/declarations/src/constants'

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
    [key: string]: any
}

export type MotionContextProps = {
    animate: boolean
    stiffness: number
    damping: number
    config: keyof typeof presets | Partial<MotionConfig>
}

export interface MotionProviderProps extends MotionContextProps {
    children: ReactNode
}
