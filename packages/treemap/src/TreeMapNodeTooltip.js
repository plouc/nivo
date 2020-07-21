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

const TreeMapNodeTooltip = ({ node, tooltip }) => {
    return (
        <BasicTooltip
            id={node.id}
            value={node.formattedValue}
            enableChip={true}
            color={node.color}
            renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { node }) : null}
        />
    )
}

TreeMapNodeTooltip.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
    tooltip: PropTypes.elementType,
}

export default memo(TreeMapNodeTooltip)
