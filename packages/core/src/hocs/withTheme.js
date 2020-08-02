/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { defaultTheme, extendDefaultTheme } from '../theming'

/**
 * This HOC watch theme prop change
 * and returns it deeply merged with default theme.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 */
export default ({ srcKey = 'theme', destKey = 'theme' } = {}) =>
    compose(
        setPropTypes({
            [srcKey]: PropTypes.object,
        }),
        withPropsOnChange([srcKey], props => ({
            [destKey]: extendDefaultTheme(defaultTheme, props[srcKey]),
        }))
    )
