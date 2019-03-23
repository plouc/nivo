/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import { line, curveMonotoneX, curveMonotoneY } from 'd3-shape'
import { motionPropTypes, SmartMotion, blendModePropType } from '@nivo/core'
import SankeyLinksItem from './SankeyLinksItem'

const sankeyLinkHorizontal = () => {
    const lineGenerator = line().curve(curveMonotoneX)

    return (n, contract) => {
        const thickness = Math.max(1, n.thickness - contract * 2)
        console.log(n.thickness, contract)
        const halfThickness = thickness / 2
        const linkLength = n.target.x0 - n.source.x1
        const padLength = linkLength * 0.12

        const dots = [
            [n.source.x1, n.pos0 - halfThickness],
            [n.source.x1 + padLength, n.pos0 - halfThickness],
            [n.target.x0 - padLength, n.pos1 - halfThickness],
            [n.target.x0, n.pos1 - halfThickness],
            [n.target.x0, n.pos1 + halfThickness],
            [n.target.x0 - padLength, n.pos1 + halfThickness],
            [n.source.x1 + padLength, n.pos0 + halfThickness],
            [n.source.x1, n.pos0 + halfThickness],
            [n.source.x1, n.pos0 - halfThickness],
        ]

        return lineGenerator(dots) + 'Z'
    }
}

const sankeyLinkVertical = () => {
    const lineGenerator = line().curve(curveMonotoneY)

    return n => {
        const halfThickness = n.thickness / 2
        const linkLength = n.target.y0 - n.source.y1
        const padLength = linkLength * 0.12

        const dots = [
            [n.pos0 + halfThickness, n.source.y1],
            [n.pos0 + halfThickness, n.source.y1 + padLength],
            [n.pos1 + halfThickness, n.target.y0 - padLength],
            [n.pos1 + halfThickness, n.target.y0],
            [n.pos1 - halfThickness, n.target.y0],
            [n.pos1 - halfThickness, n.target.y0 - padLength],
            [n.pos0 - halfThickness, n.source.y1 + padLength],
            [n.pos0 - halfThickness, n.source.y1],
            [n.pos0 + halfThickness, n.source.y1],
        ]

        return lineGenerator(dots) + 'Z'
    }
}

const SankeyLinks = ({
    links,
    layout,

    linkOpacity,
    linkHoverOpacity,
    linkHoverOthersOpacity,
    linkContract,
    linkBlendMode,
    enableLinkGradient,

    animate,
    motionDamping,
    motionStiffness,

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

    const getLinkPath = layout === 'horizontal' ? sankeyLinkHorizontal() : sankeyLinkVertical()

    if (animate !== true) {
        return (
            <g>
                {links.map(link => (
                    <SankeyLinksItem
                        key={`${link.source.id}.${link.target.id}`}
                        link={link}
                        layout={layout}
                        path={getLinkPath(link, linkContract)}
                        color={link.color}
                        opacity={getOpacity(link)}
                        blendMode={linkBlendMode}
                        enableGradient={enableLinkGradient}
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
        <Fragment>
            {links.map(link => (
                <SmartMotion
                    key={`${link.source.id}.${link.target.id}`}
                    style={spring => ({
                        path: spring(getLinkPath(link, linkContract), springConfig),
                        color: spring(link.color, springConfig),
                        opacity: spring(getOpacity(link), springConfig),
                    })}
                >
                    {style => (
                        <SankeyLinksItem
                            link={link}
                            layout={layout}
                            {...style}
                            blendMode={linkBlendMode}
                            enableGradient={enableLinkGradient}
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
        </Fragment>
    )
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

    theme: PropTypes.object.isRequired,
    tooltip: PropTypes.func,

    ...motionPropTypes,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    setCurrentLink: PropTypes.func.isRequired,
    currentLink: PropTypes.object,
    isCurrentLink: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default pure(SankeyLinks)
