/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Separator } from './Separator'

export const Separators = ({ beforeSeparators, afterSeparators }) => (
    <>
        {beforeSeparators.map(separator => (
            <Separator key={separator.partId} separator={separator} />
        ))}
        {afterSeparators.map(separator => (
            <Separator key={separator.partId} separator={separator} />
        ))}
    </>
)

const separatorsPropType = PropTypes.arrayOf(
    PropTypes.shape({
        partId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        x0: PropTypes.number.isRequired,
        x1: PropTypes.number.isRequired,
        y0: PropTypes.number.isRequired,
        y1: PropTypes.number.isRequired,
    })
).isRequired

Separators.propTypes = {
    beforeSeparators: separatorsPropType,
    afterSeparators: separatorsPropType,
}
