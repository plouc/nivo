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
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
}

const withTooltip = () => WrappedComponent => {
    return class extends Component {
        static propTypes = {
            theme: PropTypes.object.isRequired,
            margin: PropTypes.shape({
                top: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                bottom: PropTypes.number.isRequired,
                left: PropTypes.number.isRequired
            }).isRequired,
        }

        state = {
            isTooltipVisible: false,
            tooltipContent: null,
            position: {},
        }

        showTooltip = (content, { event, position: { x: _x, y: _y } }) => {
            let anchorX
            let anchorY

            const { margin } = this.props
            const bounds = this.container.getBoundingClientRect()

            if (event !== undefined) {
                const {clientX, clientY} = event
                anchorX = clientX - bounds.left
                anchorY = clientY - bounds.top
            } else {
                anchorX = _x
                anchorY = _y
            }

            const x = anchorX + margin.left
            const y = anchorY + margin.top

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
            this.setState({
                isTooltipVisible: false,
                tooltipContent: null,
            })
        }

        render() {
            const { theme } = this.props
            const { isTooltipVisible, tooltipContent, position } = this.state

            return (
                <div
                    style={containerStyle}
                    ref={container => {
                        this.container = container
                    }}
                >
                    <WrappedComponent
                        {...this.props}
                        showTooltip={this.showTooltip}
                        hideTooltip={this.hideTooltip}
                    />
                    {isTooltipVisible && (
                        <div
                            style={{
                                ...tooltipStyle,
                                ...position,
                                ...theme.tooltip.container,
                            }}
                        >
                            {tooltipContent}
                        </div>
                    )}
                </div>
            )
        }
    }
}

export default withTooltip