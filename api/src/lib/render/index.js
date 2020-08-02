/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const _ = require('lodash')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const mapping = require('../../mapping')

const theme = {}

exports.chart = ({ type, props }, override) => {
    const chart = mapping[type]
    const overridable = chart.runtimeProps || []
    const rendered = renderToStaticMarkup(
        React.createElement(chart.component, {
            animate: false,
            isInteractive: false,
            renderWrapper: false,
            theme,
            ...chart.defaults,
            ...props,
            ..._.pick(override, overridable),
        })
    )

    return `<?xml version="1.0" ?>${rendered}`
}
