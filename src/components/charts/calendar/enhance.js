/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import { withTheme, withDimensions } from '../../../hocs'
import { CalendarDefaultProps } from './props'

export default Component =>
    compose(defaultProps(CalendarDefaultProps), withTheme(), withDimensions(), pure)(Component)
