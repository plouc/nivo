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
import { BasicTooltip } from '@nivo/tooltip'

const Tooltip = ({ node }) => {
    return (
        <BasicTooltip
            id={node.data.serieId}
            value={`x: ${node.data.formattedX}, y: ${node.data.formattedY}`}
            enableChip={true}
            color={node.style.color}
        />
    )
}

Tooltip.propTypes = {
    node: PropTypes.object.isRequired,
}

export default memo(Tooltip)
