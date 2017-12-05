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
import { sankeyLinkHorizontal } from 'd3-sankey'
import { motionPropTypes, SmartMotion } from '@nivo/core'
import SankeyLinksItem from './SankeyLinksItem'

const getLinkPath = sankeyLinkHorizontal()

const SankeyLinks = ({
    links,

    // links
    linkOpacity,
    linkHoverOpacity,
    linkHoverOthersOpacity,
    linkContract,

    // motion
    animate,
    motionDamping,
    motionStiffness,

    // interactivity
    showTooltip,
    hideTooltip,
    setCurrentLink,
    currentNode,
    currentLink,
    isCurrentLink,
    onClick,
    tooltipFormat,

    tooltip,
    theme,
}) => {
    const getOpacity = link => {
        if (!currentNode && !currentLink) return linkOpacity
        if (isCurrentLink(link)) return linkHoverOpacity
        return linkHoverOthersOpacity
    }

    if (animate !== true) {
        return (
            <g>
                {links.map(link => (
                    <SankeyLinksItem
                        key={`${link.source.id}.${link.target.id}`}
                        link={link}
                        path={getLinkPath(link)}
                        width={Math.max(1, link.width - linkContract * 2)}
                        color={link.color}
                        opacity={getOpacity(link)}
                        contract={linkContract}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        setCurrent={setCurrentLink}
                        onClick={onClick}
                        tooltip={tooltip}
                        theme={theme}
                        tooltipFormat={tooltipFormat}
                    />
                ))}
            </g>
        )
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <g>
            {links.map(link => (
                <SmartMotion
                    key={`${link.source.id}.${link.target.id}`}
                    style={spring => ({
                        path: spring(getLinkPath(link), springConfig),
                        width: spring(Math.max(1, link.width - linkContract * 2), springConfig),
                        color: spring(link.color, springConfig),
                        opacity: spring(getOpacity(link), springConfig),
                        contract: spring(linkContract, springConfig),
                    })}
                >
                    {style => (
                        <SankeyLinksItem
                            link={link}
                            {...style}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            setCurrent={setCurrentLink}
                            onClick={onClick}
                            tooltip={tooltip}
                            theme={theme}
                            tooltipFormat={tooltipFormat}
                        />
                    )}
                </SmartMotion>
            ))}
        </g>
    )
}

SankeyLinks.propTypes = {
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
            width: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
        })
    ).isRequired,

    // links
    linkOpacity: PropTypes.number.isRequired,
    linkHoverOpacity: PropTypes.number.isRequired,
    linkHoverOthersOpacity: PropTypes.number.isRequired,
    linkContract: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,
    tooltip: PropTypes.func,

    ...motionPropTypes,

    // interactivity
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    setCurrentLink: PropTypes.func.isRequired,
    currentLink: PropTypes.object,
    isCurrentLink: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default pure(SankeyLinks)
