/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { blendModePropType, useMotionConfig } from '@nivo/core'
import { BasicTooltip, Chip, useTooltip } from '@nivo/tooltip'
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
    setCurrent,
    tooltip,
    tooltipFormat,
    isInteractive,
    onClick,
}) => {
    const linkId = `${link.source.id}.${link.target.id}`

    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        path,
        color,
        opacity,
        config: springConfig,
        immediate: !animate,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const tooltipContent = useMemo(() => {
        if (tooltip) {
            return <BasicTooltip id={tooltip(link)} enableChip={false} />
        }

        return <BasicTooltip id={<TooltipContent format={tooltipFormat} link={link} />} />
    }, [tooltip, tooltipFormat, link])

    const handleMouseEnter = useCallback(
        event => {
            setCurrent(link)
            showTooltipFromEvent(tooltipContent, event, 'left')
        },
        [setCurrent, link, showTooltipFromEvent, tooltipContent]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(tooltipContent, event, 'left')
        },
        [showTooltipFromEvent, tooltipContent]
    )

    const handleMouseLeave = useCallback(() => {
        setCurrent(null)
        hideTooltip()
    }, [setCurrent, hideTooltip])

    const handleClick = useCallback(
        event => {
            onClick(link, event)
        },
        [onClick, link]
    )

    return (
        <>
            {enableGradient && (
                <SankeyLinkGradient
                    id={linkId}
                    layout={layout}
                    startColor={link.startColor || link.source.color}
                    endColor={link.endColor || link.target.color}
                />
            )}
            <animated.path
                fill={enableGradient ? `url(#${encodeURI(linkId)})` : animatedProps.color}
                d={animatedProps.path}
                fillOpacity={animatedProps.opacity}
                onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                onMouseMove={isInteractive ? handleMouseMove : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
                style={{ mixBlendMode: blendMode }}
            />
        </>
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
        startColor: PropTypes.string,
        endColor: PropTypes.string,
    }).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    path: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    blendMode: blendModePropType.isRequired,
    enableGradient: PropTypes.bool.isRequired,
    setCurrent: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    tooltip: PropTypes.func,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default memo(SankeyLinksItem)
