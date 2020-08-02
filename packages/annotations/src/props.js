/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const annotationSpecPropType = PropTypes.shape({
    match: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    type: PropTypes.oneOf(['circle', 'rect', 'dot']).isRequired,

    noteX: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            abs: PropTypes.number.isRequired,
        }),
    ]).isRequired,
    noteY: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            abs: PropTypes.number.isRequired,
        }),
    ]).isRequired,
    noteWidth: PropTypes.number,
    noteTextOffset: PropTypes.number,
    note: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,

    offset: PropTypes.number,
})

export const defaultProps = {
    noteWidth: 120,
    noteTextOffset: 8,

    animate: true,
    motionStiffness: 90,
    motionDamping: 13,
}
