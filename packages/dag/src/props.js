/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const commonPropTypes = {
    layering: PropTypes.oneOf(['simplex', 'longestPath', 'coffmanGraham', 'topological'])
        .isRequired,
    coord: PropTypes.oneOf(['spread', 'vertical', 'minCurve', 'greedy', 'topological']).isRequired,
}

export const commonDefaultProps = {
    layering: 'simplex',
    coord: 'vertical',
}
