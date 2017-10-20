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
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'
import BasicTooltip from '../../tooltip/BasicTooltip'
import Chip from '../../tooltip/Chip'

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

const TooltipContent = ({ link }) => (
    <span style={tooltipStyles.container}>
        <Chip color={link.source.color} style={tooltipStyles.sourceChip} />
        <strong>{link.source.label}</strong>
        &nbsp;>&nbsp;
        <strong>{link.target.label}</strong>
        <Chip color={link.target.color} style={tooltipStyles.targetChip} />
        <strong>{link.value}</strong>
    </span>
)

const SankeyLinksItem = ({
    link,

    path,
    width,
    color,
    opacity,
    contract,

    // interactivity
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    onClick,
}) => (
    <path
        fill="none"
        d={path}
        strokeWidth={Math.max(1, width - contract * 2)}
        stroke={color}
        strokeOpacity={opacity}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
    />
)

SankeyLinksItem.propTypes = {
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

    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    contract: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,

    // interactivity
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

const enhance = compose(
    withPropsOnChange(['link', 'theme', 'tooltip'], ({ link, theme, tooltip }) => {
        if (tooltip) {
            return {
                tooltip: <BasicTooltip id={tooltip(link)} enableChip={false} theme={theme} />,
            }
        }
        return {
            tooltip: <BasicTooltip id={<TooltipContent link={link} />} theme={theme} />,
        }
    }),
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
