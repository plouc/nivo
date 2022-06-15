import { MotionContextConfig } from './types'

export const defaultAnimate = true
export const defaultMotionStiffness = 90
export const defaultMotionDamping = 15

export const defaultMotionProps: MotionContextConfig = {
    animate: true,
    stiffness: 90,
    damping: 15,
    config: {
        tension: 170,
        friction: 26,
    },
}
