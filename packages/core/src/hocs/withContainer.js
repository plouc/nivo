/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { themeContext } from '../theming'
import { tooltipContext } from '../tooltip'
import { usePartialTheme } from '../hooks'

const containerStyle = {
    position: 'relative',
}

const tooltipStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
}

const Container = ({ theme: partialTheme = {}, children }) => {
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
    const theme = usePartialTheme(partialTheme)

    return (
        <themeContext.Provider value={theme}>
            <tooltipContext.Provider value={[showTooltip, hideTooltip]}>
                <div style={containerStyle} ref={containerEl}>
                    {children}
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
            </tooltipContext.Provider>
        </themeContext.Provider>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object,
}

export const withContainer = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return class extends Component {
        render() {
            // eslint-disable-next-line react/prop-types
            const { theme, ...rest } = this.props

            return (
                <Container theme={theme}>
                    <WrappedComponent {...rest} />
                </Container>
            )
        }
    }
}
