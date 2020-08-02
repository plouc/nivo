/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import withProps from 'recompose/withProps'
import { curveFromProp } from '../props'

/**
 * This HOC transform d3 curve interpolation identifier
 * to its corresponding interpolator.
 */
export default ({ srcKey = 'curve', destKey = 'curveInterpolator' } = {}) =>
    withProps(props => ({
        [destKey]: curveFromProp(props[srcKey]),
    }))
