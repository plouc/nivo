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
    borderRadius: '3px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
    padding: '7px 12px',
}

const Tooltip = ({ x, y, children }) =>
    <div style={{ ...tooltipStyle, top: y, left: x }}>
        {children}
    </div>

export default class Container extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }

    state = {
        isTooltipVisible: true,
        tooltipContent: 'crap',
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
        const { children } = this.props
        const { isTooltipVisible, tooltipContent, tooltipX, tooltipY } = this.state

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
