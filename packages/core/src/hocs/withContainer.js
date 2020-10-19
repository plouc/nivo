/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, useRef } from 'react'
import PropTypes from 'prop-types'
import { tooltipContext, useTooltipHandlers, TooltipWrapper } from '@nivo/tooltip'
import { ThemeProvider } from '../theming'
import { MotionConfigProvider } from '../motion'

const containerStyle = {
    position: 'relative',
}

const Container = ({
    theme,
    renderWrapper = true,
    children,
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
                    {renderWrapper === true && (
                        <div style={containerStyle} ref={container}>
                            {children}
                            {isTooltipVisible && (
                                <TooltipWrapper position={tooltipPosition} anchor={tooltipAnchor}>
                                    {tooltipContent}
                                </TooltipWrapper>
                            )}
                        </div>
                    )}
                    {renderWrapper !== true && children}
                </tooltipContext.Provider>
            </MotionConfigProvider>
        </ThemeProvider>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object,
    animate: MotionConfigProvider.propTypes.animate,
    motionStiffness: MotionConfigProvider.propTypes.stiffness,
    motionDamping: MotionConfigProvider.propTypes.damping,
    motionConfig: MotionConfigProvider.propTypes.config,
    renderWrapper: PropTypes.bool,
}

export const withContainer = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return class extends Component {
        render() {
            // eslint-disable-next-line react/prop-types
            const { theme, renderWrapper, ...childProps } = this.props

            return (
                <Container
                    theme={theme}
                    renderWrapper={renderWrapper}
                    animate={childProps.animate}
                    motionStiffness={childProps.motionStiffness}
                    motionDamping={childProps.motionDamping}
                    motionConfig={childProps.motionConfig}
                >
                    <WrappedComponent {...childProps} />
                </Container>
            )
        }
    }
}
