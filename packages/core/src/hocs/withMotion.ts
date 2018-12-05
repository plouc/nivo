/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { partialRight } from 'lodash'
import { compose, defaultProps, withPropsOnChange, setPropTypes } from 'recompose'
import { spring } from 'react-motion'
import { motionPropTypes } from '../props'
import { defaultAnimate, defaultMotionDamping, defaultMotionStiffness } from '../defaults'

export interface MotionProps {
    animate: boolean
    motionDamping: number
    motionStiffness: number
}

export default () =>
    compose<Partial<MotionProps>, MotionProps>(
        setPropTypes(motionPropTypes),
        defaultProps({
            animate: defaultAnimate,
            motionDamping: defaultMotionDamping,
            motionStiffness: defaultMotionStiffness,
        }),
        withPropsOnChange(
            ['motionDamping', 'motionStiffness'],
            ({ motionDamping, motionStiffness }) => ({
                boundSpring: partialRight(spring, {
                    damping: motionDamping,
                    stiffness: motionStiffness,
                }),
            })
        )
    )
