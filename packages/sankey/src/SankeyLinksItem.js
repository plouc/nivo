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
import { compose, withPropsOnChange, withHandlers, pure } from 'recompose'
import { BasicTooltip, Chip, blendModePropType } from '@nivo/core'
import SankeyLinkGradient from './SankeyLinkGradient'

const tooltipStyles = {
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    sourceChip: {
        marginRight: 7,
    },
    targetChip: {
        marginLeft: 7,
        marginRight: 7,
    },
}

const TooltipContent = ({ link, format }) => (
    <span style={tooltipStyles.container}>
        <Chip color={link.source.color} style={tooltipStyles.sourceChip} />
        <strong>{link.source.label}</strong>
        {' > '}
        <strong>{link.target.label}</strong>
        <Chip color={link.target.color} style={tooltipStyles.targetChip} />
        <strong>{format ? format(link.value) : link.value}</strong>
    </span>
)

TooltipContent.propTypes = {
    link: PropTypes.shape({
        source: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired,
        target: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired,
        color: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,
    format: PropTypes.func,
}

const SankeyLinksItem = ({
    link,
    layout,
    path,
    color,
    opacity,
    blendMode,
    enableGradient,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    onClick,
}) => {
    const linkId = `${link.source.id}.${link.target.id}`

    return (
        <Fragment>
            {enableGradient && (
                <SankeyLinkGradient
                    id={linkId}
                    layout={layout}
                    startColor={link.startColor || link.source.color}
                    endColor={link.endColor || link.target.color}
                />
            )}
            <path
                fill={enableGradient ? `url(#${linkId})` : color}
                d={path}
                fillOpacity={opacity}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                style={{ mixBlendMode: blendMode }}
            />
        </Fragment>
    )
}

SankeyLinksItem.propTypes = {
    link: PropTypes.shape({
        source: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string.isRequired,
        }).isRequired,
        target: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string.isRequired,
        }).isRequired,
        color: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    path: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    blendMode: blendModePropType.isRequired,
    enableGradient: PropTypes.bool.isRequired,

    theme: PropTypes.object.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    handleMouseEnter: PropTypes.func.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,
}

const enhance = compose(
    withPropsOnChange(
        ['link', 'theme', 'tooltip', 'tooltipFormat'],
        ({ link, theme, tooltip, tooltipFormat }) => {
            if (tooltip) {
                return {
                    tooltip: <BasicTooltip id={tooltip(link)} enableChip={false} theme={theme} />,
                }
            }
            return {
                tooltip: (
                    <BasicTooltip
                        id={<TooltipContent format={tooltipFormat} link={link} />}
                        theme={theme}
                    />
                ),
            }
        }
    ),
    withPropsOnChange(['onClick', 'link'], ({ onClick, link }) => ({
        onClick: event => onClick(link, event),
    })),
    withHandlers({
        handleMouseEnter: ({ showTooltip, setCurrent, link, tooltip }) => e => {
            setCurrent(link)
            showTooltip(tooltip, e)
        },
        handleMouseMove: ({ showTooltip, tooltip }) => e => {
            showTooltip(tooltip, e)
        },
        handleMouseLeave: ({ hideTooltip, setCurrent }) => () => {
            setCurrent(null)
            hideTooltip()
        },
    }),
    pure
)

export default enhance(SankeyLinksItem)
