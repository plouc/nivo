/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const LinearGradient = ({ id, colors, ...rest }) => (
    <linearGradient id={id} x1={0} x2={0} y1={0} y2={1} {...rest}>
        {colors.map(({ offset, color, opacity }) => (
            <stop
                key={offset}
                offset={`${offset}%`}
                stopColor={color}
                stopOpacity={opacity !== undefined ? opacity : 1}
            />
        ))}
    </linearGradient>
)

LinearGradient.propTypes = {
    id: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(
        PropTypes.shape({
            offset: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
            opacity: PropTypes.number,
        })
    ).isRequired,
    gradientTransform: PropTypes.string,
}

export const linearGradientDef = (id, colors, options = {}) => ({
    id,
    type: 'linearGradient',
    colors,
    ...options,
})
