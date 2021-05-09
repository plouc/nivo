import PropTypes from 'prop-types'

/**
 * The prop type is exported as a simple object instead of `PropTypes.shape`
 * to be able to add extra properties.
 *
 * @example
 * ```javascript
 * import { LegendPropShape } from '@nivo/legends'
 *
 * const customLegendPropType = PropTypes.shape({
 *     ...LegendPropShape,
 *     extra: PropTypes.any.isRequired,
 * })
 * ```
 */
export const LegendPropShape = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string,
            fill: PropTypes.string,
        })
    ),

    // position & layout
    anchor: PropTypes.oneOf([
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
        'top-left',
        'center',
    ]).isRequired,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    direction: PropTypes.oneOf(['row', 'column']).isRequired,

    // item
    itemsSpacing: PropTypes.number,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([
        'left-to-right',
        'right-to-left',
        'top-to-bottom',
        'bottom-to-top',
    ]),
    itemTextColor: PropTypes.string,
    itemBackground: PropTypes.string,
    itemOpacity: PropTypes.number,

    symbolShape: PropTypes.oneOfType([
        PropTypes.oneOf(['circle', 'diamond', 'square', 'triangle']),
        PropTypes.func,
    ]),
    symbolSize: PropTypes.number,
    symbolSpacing: PropTypes.number,
    symbolBorderWidth: PropTypes.number,
    symbolBorderColor: PropTypes.string,

    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,

    effects: PropTypes.arrayOf(
        PropTypes.shape({
            on: PropTypes.oneOfType([PropTypes.oneOf(['hover'])]).isRequired,
            style: PropTypes.shape({
                itemTextColor: PropTypes.string,
                itemBackground: PropTypes.string,
                itemOpacity: PropTypes.number,
                symbolSize: PropTypes.number,
                symbolBorderWidth: PropTypes.number,
                symbolBorderColor: PropTypes.string,
            }).isRequired,
        })
    ),
}
