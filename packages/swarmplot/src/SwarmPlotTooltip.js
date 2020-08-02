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
import { BasicTooltip } from '@nivo/tooltip'

const SwarmPlotTooltip = ({ node }) => (
    <BasicTooltip
        id={node.label}
        value={node.formattedValue}
        enableChip={true}
        color={node.color}
    />
)

SwarmPlotTooltip.propTypes = {
    node: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
}

export default SwarmPlotTooltip
