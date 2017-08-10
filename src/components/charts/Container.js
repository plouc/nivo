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

const containerStyle = {
    position: 'relative',
}

const tooltipStyle = {
    position: 'absolute',
    background: '#FFF',
    zIndex: 10,
    top: 0,
    left: 0,
    borderRadius: '2px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
    padding: '5px 9px',
    fontSize: '14px',
}

const Tooltip = ({ x, y, children }) =>
    <div style={{ ...tooltipStyle, top: y, left: x }}>
        {children}
    </div>

const noop = {
    showTooltip: () => {},
    hideTooltip: () => {},
}

export default class Container extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        isInteractive: PropTypes.bool.isRequired,
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
        const { pageX, pageY } = event
        const bounds = this.container.getBoundingClientRect()

        this.setState({
            isTooltipVisible: true,
            tooltipContent: content,
            tooltipX: pageX - bounds.left + 20,
            tooltipY: pageY - bounds.top,
        })
    }

    hideTooltip = () => {
        this.setState({ isTooltipVisible: false, tooltipContent: null })
    }

    render() {
        const { children, isInteractive } = this.props
        const { isTooltipVisible, tooltipContent, tooltipX, tooltipY } = this.state

        if (!isInteractive) return children(noop)

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
                {isTooltipVisible &&
                    <Tooltip x={tooltipX} y={tooltipY}>
                        {tooltipContent}
                    </Tooltip>}
            </div>
        )
    }
}
