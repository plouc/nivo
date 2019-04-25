/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { tooltipContext } from '@nivo/tooltip'
import noop from '../lib/noop'
import { themeContext } from '../theming'
import { MotionConfigProvider } from '../motion'

const containerStyle = {
    position: 'relative',
}

const tooltipStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
}

const Container = ({
    children,
    theme,
    isInteractive = true,
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const containerEl = useRef(null)
    const [state, setState] = useState({
        isTooltipVisible: false,
        tooltipContent: null,
        position: {},
    })
    const showTooltip = useCallback(
        (content, event) => {
            if (!containerEl) return

            const bounds = containerEl.current.getBoundingClientRect()

            const { clientX, clientY } = event

            const x = clientX - bounds.left
            const y = clientY - bounds.top

            const position = {}

            if (x < bounds.width / 2) position.left = x + 20
            else position.right = bounds.width - x + 20

            if (y < bounds.height / 2) position.top = y - 12
            else position.bottom = bounds.height - y - 12

            setState({
                isTooltipVisible: true,
                tooltipContent: content,
                position,
            })
        },
        [containerEl]
    )
    const hideTooltip = useCallback(() => {
        setState({ isTooltipVisible: false, tooltipContent: null })
    })
    const { isTooltipVisible, tooltipContent, position } = state

    let content
    if (isInteractive === true) {
        content = (
            <div style={containerStyle} ref={containerEl}>
                {children({
                    showTooltip: isInteractive ? showTooltip : noop,
                    hideTooltip: isInteractive ? hideTooltip : noop,
                })}
                {isTooltipVisible && (
                    <div
                        style={{
                            ...tooltipStyle,
                            ...position,
                            ...theme.tooltip,
                        }}
                    >
                        {tooltipContent}
                    </div>
                )}
            </div>
        )
    } else {
        content = children({
            showTooltip: isInteractive ? showTooltip : noop,
            hideTooltip: isInteractive ? hideTooltip : noop,
        })
    }

    return (
        <themeContext.Provider value={theme}>
            <MotionConfigProvider
                animate={animate}
                stiffness={motionStiffness}
                damping={motionDamping}
            >
                <tooltipContext.Provider value={[showTooltip, hideTooltip]}>
                    {content}
                </tooltipContext.Provider>
            </MotionConfigProvider>
        </themeContext.Provider>
    )
}

Container.propTypes = {
    children: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    animate: PropTypes.bool.isRequired,
    motionStiffness: PropTypes.number,
    motionDamping: PropTypes.number,
}

export default Container
