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
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withDimensions, withTheme, withMotion, withColors } from '@nivo/core'
import { getInheritedColorGenerator } from '@nivo/core'
import { bindDefs } from '@nivo/core'
import * as props from './props'

const commonEnhancers = [
    withDimensions(),
    withColors({ defaultColorBy: 'id' }),
    withTheme(),
    withMotion(),
    withPropsOnChange(['borderColor'], ({ borderColor }) => ({
        getBorderColor: getInheritedColorGenerator(borderColor),
    })),
]

export default Component => {
    const implDefaultProps = props.WaffleDefaultProps

    switch (Component.displayName) {
        case 'Waffle':
            return compose(
                ...[defaultProps(implDefaultProps), ...commonEnhancers, withMotion(), pure]
            )(Component)

        case 'WaffleHtml':
            return compose(
                ...[defaultProps(implDefaultProps), ...commonEnhancers, withMotion(), pure]
            )(Component)

        case 'WaffleCanvas':
            return compose(...[defaultProps(implDefaultProps), ...commonEnhancers, pure])(Component)
    }

    return Component
}
