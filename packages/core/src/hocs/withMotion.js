/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { compose, defaultProps, setPropTypes } from '@bitbloom/nivo-recompose'
import { motionPropTypes } from '../motion'
import { defaultAnimate, defaultMotionDamping, defaultMotionStiffness } from '../defaults'

export default () =>
    compose(
        setPropTypes(motionPropTypes),
        defaultProps({
            animate: defaultAnimate,
            motionDamping: defaultMotionDamping,
            motionStiffness: defaultMotionStiffness,
        })
    )
