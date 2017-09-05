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
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { withColors, withTheme, withDimensions, withMotion } from '../../../hocs'
import { SankeyDefaultProps } from './props'

export default Component =>
    compose(
        defaultProps(SankeyDefaultProps),
        withState('currentNode', 'setCurrentNode', null),
        withState('currentLink', 'setCurrentLink', null),
        withColors(),
        withColors({
            colorByKey: 'linkColorBy',
            destKey: 'getLinkColor',
            defaultColorBy: 'source.id',
        }),
        withTheme(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['nodeBorderColor'], ({ nodeBorderColor }) => ({
            getNodeBorderColor: getInheritedColorGenerator(nodeBorderColor),
        })),
        withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
            getLabelTextColor: getInheritedColorGenerator(labelTextColor),
        })),
        pure
    )(Component)
