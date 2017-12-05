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
import noop from '../lib/noop'

const containerStyle = {
    position: 'relative',
}

const tooltipStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
}

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
        position: {},
    }

    showTooltip = (content, event) => {
        const { clientX, clientY } = event
        const bounds = this.container.getBoundingClientRect()

        const x = clientX - bounds.left
        const y = clientY - bounds.top

        const position = {}

        if (x < bounds.width / 2) position.left = x + 20
        else position.right = bounds.width - x + 20

        if (y < bounds.height / 2) position.top = y - 12
        else position.bottom = bounds.height - y - 12

        this.setState({
            isTooltipVisible: true,
            tooltipContent: content,
            position,
        })
    }

    hideTooltip = () => {
        this.setState({ isTooltipVisible: false, tooltipContent: null })
    }

    render() {
        const { children, isInteractive, theme } = this.props
        const { isTooltipVisible, tooltipContent, position } = this.state

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
    }
}
