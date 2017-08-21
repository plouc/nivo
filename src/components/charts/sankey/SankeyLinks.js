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
import SmartMotion from '../../SmartMotion'

const getLinkPath = sankeyLinkHorizontal()

const SankeyLinks = ({
    links,

    // links
    linkOpacity,
    getLinkColor,

    // motion
    animate,
    motionDamping,
    motionStiffness,
}) => {
    if (animate !== true) {
        return (
            <g>
                {links.map(link =>
                    <path
                        key={`${link.source.id}.${link.target.id}`}
                        fill="none"
                        d={getLinkPath(link)}
                        strokeWidth={Math.max(1, link.width)}
                        stroke={getLinkColor(link)}
                        strokeOpacity={linkOpacity}
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
                        d: spring(getLinkPath(link), springConfig),
                        strokeWidth: spring(Math.max(1, link.width), springConfig),
                        stroke: spring(getLinkColor(link), springConfig),
                        strokeOpacity: spring(linkOpacity, springConfig),
                    })}
                >
                    {style => <path fill="none" {...style} />}
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
        })
    ).isRequired,

    // links
    linkOpacity: PropTypes.number.isRequired,
    getLinkColor: PropTypes.func.isRequired,
}

export default pure(SankeyLinks)
