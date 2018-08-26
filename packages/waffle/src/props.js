/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { defsPropTypes, noop } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'
import WaffleCell from './WaffleCell'
import WaffleCellHtml from './WaffleCellHtml'

const commonPropTypes = {
    // data
    total: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
    hiddenIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        .isRequired,

    // layout
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    fillDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    padding: PropTypes.number.isRequired,

    // styling
    emptyColor: PropTypes.string.isRequired,
    emptyOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,
    getBorderColor: PropTypes.func.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    // computed
    cellSize: PropTypes.number.isRequired,
    cells: PropTypes.array.isRequired,
    origin: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
}

export const WafflePropTypes = {
    ...commonPropTypes,
    cellComponent: PropTypes.func.isRequired,
    ...defsPropTypes,
    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

export const WaffleHtmlPropTypes = {
    ...commonPropTypes,
    cellComponent: PropTypes.func.isRequired,
}

export const WaffleCanvasPropTypes = {
    ...commonPropTypes,
    pixelRatio: PropTypes.number.isRequired,
    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

const commonDefaultProps = {
    hiddenIds: [],

    // layout
    fillDirection: 'bottom',
    padding: 1,

    // styling
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderWidth: 0,
    borderColor: 'inherit:darker(1)',
    colors: 'nivo',
    defs: [],
    fill: [],

    // interactivity
    isInteractive: true,
    onClick: noop,
}

export const WaffleDefaultProps = {
    ...commonDefaultProps,
    cellComponent: WaffleCell,
    defs: [],
    fill: [],
    legends: [],
}

export const WaffleHtmlDefaultProps = {
    ...commonDefaultProps,
    cellComponent: WaffleCellHtml,
}

export const WaffleCanvasDefaultProps = {
    ...commonDefaultProps,
    legends: [],
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
