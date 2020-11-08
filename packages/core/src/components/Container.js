/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useRef, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { tooltipContext, useTooltipHandlers, TooltipWrapper } from '@nivo/tooltip'
import noop from '../lib/noop'
import { ThemeProvider } from '../theming'
import { MotionConfigProvider } from '../motion'
import ConditionalWrapper from './ConditionalWrapper'

const containerStyle = {
    position: 'relative',
}

const Container = ({
    children,
    theme,
    isInteractive = true,
    renderWrapper = true,
    animate,
    motionStiffness,
    motionDamping,
    motionConfig,
}) => {
    const container = useRef(null)
    const {
        showTooltipAt,
        showTooltipFromEvent,
        hideTooltip,
        isTooltipVisible,
        tooltipContent,
        tooltipPosition,
        tooltipAnchor,
    } = useTooltipHandlers(container)

    const showTooltip = useCallback((content, event) => showTooltipFromEvent(content, event), [
        showTooltipFromEvent,
    ])

    const handlers = useMemo(
        () => ({
            showTooltip: isInteractive ? showTooltip : noop,
            hideTooltip: isInteractive ? hideTooltip : noop,
        }),
        [hideTooltip, isInteractive, showTooltip]
    )

    return (
        <ThemeProvider theme={theme}>
            <MotionConfigProvider
                animate={animate}
                stiffness={motionStiffness}
                damping={motionDamping}
                config={motionConfig}
            >
                <tooltipContext.Provider
                    value={{ showTooltipAt, showTooltipFromEvent, hideTooltip }}
                >
                    {/* we should not render the div element if using the HTTP API */}
                    <ConditionalWrapper
                        condition={renderWrapper}
                        wrapper={children => (
                            <div style={containerStyle} ref={container}>
                                {children}
                                {isTooltipVisible && (
                                    <TooltipWrapper
                                        position={tooltipPosition}
                                        anchor={tooltipAnchor}
                                    >
                                        {tooltipContent}
                                    </TooltipWrapper>
                                )}
                            </div>
                        )}
                    >
                        {typeof children === 'function' ? children(handlers) : children}
                    </ConditionalWrapper>
                </tooltipContext.Provider>
            </MotionConfigProvider>
        </ThemeProvider>
    )
}

Container.propTypes = {
    children: PropTypes.oneOf([PropTypes.func, PropTypes.node]).isRequired,
    isInteractive: PropTypes.bool,
    renderWrapper: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    animate: PropTypes.bool.isRequired,
    motionStiffness: PropTypes.number,
    motionDamping: PropTypes.number,
    motionConfig: PropTypes.string,
}

export default Container
