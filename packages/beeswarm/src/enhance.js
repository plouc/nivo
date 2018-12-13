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
import withPropsOnChange from 'recompose/withPropsOnChange'
import setDisplayName from 'recompose/setDisplayName'
import { withTheme, withDimensions, withMotion, withColors } from '@nivo/core'
import { BeeSwarmDefaultProps } from './props'
import { computeBeeSwarmNodes } from './compute'

export const enhance = Component =>
    setDisplayName(Component.displayName)(
        compose(
            defaultProps(BeeSwarmDefaultProps),
            withTheme(),
            withDimensions(),
            withColors(),
            withMotion(),
            withPropsOnChange(
                ['data', 'layout', 'scale', 'width', 'height', 'gap', 'nodeSize', 'nodePadding'],
                computeBeeSwarmNodes
            ),
            pure
        )(Component)
    )
