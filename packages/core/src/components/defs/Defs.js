/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { gradientTypes } from './gradients'
import { patternTypes } from './patterns'

export const defsMapping = {
    ...gradientTypes,
    ...patternTypes,
}

const Defs = ({ defs: definitions }) => {
    if (!definitions || definitions.length < 1) return null

    return (
        <defs>
            {definitions.map(({ type, ...def }) => {
                if (defsMapping[type])
                    return React.createElement(defsMapping[type], { key: def.id, ...def })

                return null
            })}
        </defs>
    )
}

Defs.propTypes = {
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(Object.keys(defsMapping)).isRequired,
            id: PropTypes.string.isRequired,
        })
    ),
}

export default memo(Defs)
