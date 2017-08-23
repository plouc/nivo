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
import { motionPropTypes } from '../../../props'
import SmartMotion from '../../SmartMotion'
import SankeyLinksItem from './SankeyLinksItem'

const getLinkPath = sankeyLinkHorizontal()

const SankeyLinks = ({
    links,

    // links
    linkOpacity,
    linkHoverOpacity,
    linkContract,

    // motion
    animate,
    motionDamping,
    motionStiffness,

    showTooltip,
    hideTooltip,

    theme,
}) => {
    if (animate !== true) {
        return (
            <g>
                {links.map(link =>
                    <SankeyLinksItem
                        key={`${link.source.id}.${link.target.id}`}
                        link={link}
                        path={getLinkPath(link)}
                        width={Math.max(1, link.width - linkContract * 2)}
                        color={link.color}
                        opacity={linkOpacity}
                        hoverOpacity={linkHoverOpacity}
                        contract={linkContract}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        theme={theme}
                    />
                )}
            </g>
        )
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <g>
            {links.map(link =>
                <SmartMotion
                    key={`${link.source.id}.${link.target.id}`}
                    style={spring => ({
                        path: spring(getLinkPath(link), springConfig),
                        width: spring(Math.max(1, link.width - linkContract * 2), springConfig),
                        color: spring(link.color, springConfig),
                        opacity: spring(linkOpacity, springConfig),
                        contract: spring(linkContract, springConfig),
                    })}
                >
                    {style =>
                        <SankeyLinksItem
                            link={link}
                            {...style}
                            hoverOpacity={linkHoverOpacity}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            theme={theme}
                        />}
                </SmartMotion>
            )}
        </g>
    )
}

SankeyLinks.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            source: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            }).isRequired,
            target: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            }).isRequired,
            width: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
        })
    ).isRequired,

    // links
    linkOpacity: PropTypes.number.isRequired,
    linkHoverOpacity: PropTypes.number.isRequired,
    linkContract: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,

    ...motionPropTypes,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default pure(SankeyLinks)
