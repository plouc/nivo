/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from '../../lib/noop'

const containerStyle = {
    position: 'relative',
}

const tooltipStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
}

const Tooltip = ({ x, y, children, theme }) => (
    <div style={{ ...tooltipStyle, top: y, left: x, ...theme.tooltip }}>{children}</div>
)

const noopHandlers = {
    showTooltip: noop,
    hideTooltip: noop,
}

export default class Container extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        isInteractive: PropTypes.bool.isRequired,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        isInteractive: true,
    }

    state = {
        isTooltipVisible: false,
        tooltipContent: null,
        tooltipX: 0,
        tooltipY: 0,
    }

    showTooltip = (content, event) => {
        const { clientX, clientY } = event
        const bounds = this.container.getBoundingClientRect()

        this.setState({
            isTooltipVisible: true,
            tooltipContent: content,
            tooltipX: clientX - bounds.left + 20,
            tooltipY: clientY - bounds.top,
        })
    }

    hideTooltip = () => {
        this.setState({ isTooltipVisible: false, tooltipContent: null })
    }

    render() {
        const { children, isInteractive, theme } = this.props
        const { isTooltipVisible, tooltipContent, tooltipX, tooltipY } = this.state

        if (!isInteractive) return children(noopHandlers)

        return (
            <div
                style={containerStyle}
                ref={container => {
                    this.container = container
                }}
            >
                {children({
                    showTooltip: this.showTooltip,
                    hideTooltip: this.hideTooltip,
                })}
                {isTooltipVisible && (
                    <Tooltip x={tooltipX} y={tooltipY} theme={theme}>
                        {tooltipContent}
                    </Tooltip>
                )}
            </div>
        )
    }
}
