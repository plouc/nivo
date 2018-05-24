/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const WafflePropTypes = {
    // data
    total: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

    // layout
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,

    // styling
    emptyColor: PropTypes.string.isRequired,
    emptyOpacity: PropTypes.number.isRequired,
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    fill: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func])
                .isRequired,
        })
    ).isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,
    getBorderColor: PropTypes.func.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool,
}

export const WaffleDefaultProps = {
    // layout
    padding: 2,

    // axes & grid
    axisBottom: {},
    enableGridX: true,
    enableGridY: false,

    borderWidth: 0,
    borderColor: 'inherit:darker(1)',

    // styling
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: 'nivo',
    fillOpacity: 1,
    defs: [],
    fill: [],

    // interactivity
    isInteractive: true,

    // stack tooltip
    enableStackTooltip: true,

    legends: [],
}
