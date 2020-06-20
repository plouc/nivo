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
import { TableTooltip } from '@nivo/tooltip'

const ParallelCoordinatesLineTooltip = ({ data, variables }) => {
    return (
        <TableTooltip
            rows={variables.map(variable => [
                variable.key,
                <strong>{data[variable.key]}</strong>, // eslint-disable-line react/jsx-key
            ])}
        />
    )
}

ParallelCoordinatesLineTooltip.propTypes = {
    data: PropTypes.object.isRequired,
    variables: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
}

export default memo(ParallelCoordinatesLineTooltip)
