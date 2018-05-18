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
import pure from 'recompose/pure'
import { BasicTooltip } from '@nivo/core'

const HeatMapCellTooltip = ({ node, theme, format, tooltip }) => (
    <BasicTooltip
        id={`${node.yKey} - ${node.xKey}`}
        value={node.value}
        enableChip={true}
        color={node.color}
        theme={theme}
        format={format}
        renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
    />
)

HeatMapCellTooltip.propTypes = {
    node: PropTypes.shape({
        xKey: PropTypes.string.isRequired,
        yKey: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
    format: PropTypes.func,
    tooltip: PropTypes.func,
    theme: PropTypes.shape({
        tooltip: PropTypes.shape({
            container: PropTypes.object.isRequired,
            basic: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
}

export default pure(HeatMapCellTooltip)
