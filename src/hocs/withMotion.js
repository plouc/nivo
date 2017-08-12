/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isEqual } from 'lodash'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import setPropTypes from 'recompose/setPropTypes'
import { motionPropTypes } from '../props'
import Nivo from '../Nivo'

/**
 */
export default () =>
    compose(
        setPropTypes(motionPropTypes),
        defaultProps({
            animate: true,
            motionStiffness: Nivo.defaults.motionStiffness,
            motionDamping: Nivo.defaults.motionDamping,
        })
    )
