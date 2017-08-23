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

const TooltipContent = ({ link }) =>
    <span style={tooltipStyles.container}>
        <Chip color={link.source.color} style={tooltipStyles.sourceChip} />
        <strong>{link.source.id}</strong>
        &nbsp;>&nbsp;
        <strong>{link.target.id}</strong>
        <Chip color={link.target.color} style={tooltipStyles.targetChip} />
        <strong>{link.value}</strong>
    </span>

const SankeyLinksItem = ({
    link,
    path,
    width,
    color,
    opacity,
    hoverOpacity,
    contract,
    showTooltip,
    hideTooltip,
    isHover,
}) =>
    <path
        fill="none"
        d={path}
        strokeWidth={Math.max(1, width - contract * 2)}
        stroke={color}
        strokeOpacity={isHover ? hoverOpacity : opacity}
        onMouseEnter={showTooltip}
        onMouseMove={showTooltip}
        onMouseLeave={hideTooltip}
    />

SankeyLinksItem.propTypes = {
    link: PropTypes.shape({
        source: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }).isRequired,
        target: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }).isRequired,
        color: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,

    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    hoverOpacity: PropTypes.number.isRequired,
    contract: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

const enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(['link', 'theme'], ({ link, theme }) => ({
        tooltip: <BasicTooltip id={<TooltipContent link={link} />} theme={theme} />,
    })),
    withHandlers({
        showTooltip: ({ showTooltip, setIsHover, tooltip }) => e => {
            setIsHover(true)
            showTooltip(tooltip, e)
        },
        hideTooltip: ({ hideTooltip, setIsHover }) => () => {
            setIsHover(false)
            hideTooltip()
        },
    }),
    pure
)

export default enhance(SankeyLinksItem)
