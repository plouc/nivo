/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import { withDimensions, withTheme, withMotion } from '@nivo/core'
import * as props from './props'

const commonEnhancers = [withDimensions(), withTheme()]

export default Component => {
    const implDefaultProps = props[`${Component.displayName}DefaultProps`]

    switch (Component.displayName) {
        case 'Bullet':
            return compose(
                ...[defaultProps(implDefaultProps), ...commonEnhancers, withMotion(), pure]
            )(Component)
    }

    return Component
}
