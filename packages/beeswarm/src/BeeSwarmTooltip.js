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
import { BasicTooltip } from '@nivo/core'

export const BeeSwarmTooltip = ({ node, format, tooltip, theme }) => (
    <BasicTooltip
        id={node.serieId}
        value={node.value}
        enableChip={true}
        color={node.color}
        theme={theme}
        format={format}
        renderContent={typeof tooltip === 'function' ? tooltip.bind(null, node) : null}
    />
)

BeeSwarmTooltip.propTypes = {
    node: PropTypes.shape({}).isRequired,
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    tooltip: PropTypes.func,
    theme: PropTypes.object.isRequired,
}
