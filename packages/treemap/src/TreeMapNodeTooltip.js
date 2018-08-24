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

const TreeMapNodeTooltip = ({ node, theme, tooltip }) => (
    <BasicTooltip
        id={node.id}
        value={node.value}
        enableChip={true}
        color={node.color}
        theme={theme}
        renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { node, ...node }) : null}
    />
)

TreeMapNodeTooltip.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
    theme: PropTypes.object.isRequired,
    tooltip: PropTypes.func,
}

export default pure(TreeMapNodeTooltip)
