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
import { blendModePropType } from '@nivo/core'
import SankeyLinksItem from './SankeyLinksItem'
import { sankeyLinkHorizontal, sankeyLinkVertical } from './links'

const SankeyLinks = ({
    links,
    layout,
    linkOpacity,
    linkHoverOpacity,
    linkHoverOthersOpacity,
    linkContract,
    linkBlendMode,
    enableLinkGradient,
    setCurrentLink,
    currentNode,
    currentLink,
    isCurrentLink,
    isInteractive,
    onClick,
    tooltipFormat,
    tooltip,
}) => {
    const getOpacity = link => {
        if (!currentNode && !currentLink) return linkOpacity
        if (isCurrentLink(link)) return linkHoverOpacity
        return linkHoverOthersOpacity
    }

    const getLinkPath = layout === 'horizontal' ? sankeyLinkHorizontal() : sankeyLinkVertical()

    return links.map(link => (
        <SankeyLinksItem
            key={`${link.source.id}.${link.target.id}`}
            link={link}
            layout={layout}
            path={getLinkPath(link, linkContract)}
            color={link.color}
            opacity={getOpacity(link)}
            blendMode={linkBlendMode}
            enableGradient={enableLinkGradient}
            setCurrent={setCurrentLink}
            isInteractive={isInteractive}
            onClick={onClick}
            tooltip={tooltip}
            tooltipFormat={tooltipFormat}
        />
    ))
}

SankeyLinks.propTypes = {
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            source: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }).isRequired,
            target: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }).isRequired,
            thickness: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
        })
    ).isRequired,
    linkOpacity: PropTypes.number.isRequired,
    linkHoverOpacity: PropTypes.number.isRequired,
    linkHoverOthersOpacity: PropTypes.number.isRequired,
    linkContract: PropTypes.number.isRequired,
    linkBlendMode: blendModePropType.isRequired,
    enableLinkGradient: PropTypes.bool.isRequired,
    tooltip: PropTypes.func,
    setCurrentLink: PropTypes.func.isRequired,
    currentLink: PropTypes.object,
    isCurrentLink: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default memo(SankeyLinks)
