/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*
const commonPropTypes = {
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

    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    fillDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    padding: PropTypes.number.isRequired,

    colors: ordinalColorsPropType.isRequired,
    emptyColor: PropTypes.string.isRequired,
    emptyOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,
    getBorderColor: PropTypes.func.isRequired, // computed

    isInteractive: PropTypes.bool,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    cellSize: PropTypes.number.isRequired,
    cells: PropTypes.array.isRequired,
    origin: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
}

export const WaffleHtmlPropTypes = {
    ...commonPropTypes,
    cellComponent: PropTypes.func.isRequired,
}

const commonDefaultProps = {
    hiddenIds: [],

    fillDirection: 'bottom',
    padding: 1,

    colors: { scheme: 'nivo' },
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 1]] },
    defs: [],
    fill: [],

    isInteractive: true,
    onClick: noop,
}

export const WaffleHtmlDefaultProps = {
    ...commonDefaultProps,
    cellComponent: WaffleCellHtml,
}
*/
