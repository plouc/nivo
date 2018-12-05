/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import noop from '../lib/noop'
import { Theme } from '../theming'

const containerStyle = {
    position: 'relative' as 'relative',
}

const tooltipStyle = {
    pointerEvents: 'none' as 'none',
    position: 'absolute' as 'absolute',
    zIndex: 10,
}

const noopHandlers = {
    showTooltip: noop,
    hideTooltip: noop,
}

export type ShowTooltip = (
    content: null | React.ReactNode,
    event: React.SyntheticEvent<any>
) => void
export type HideTooltip = () => void

export interface ContainerChildrenProps {
    showTooltip: ShowTooltip
    hideTooltip: HideTooltip
}

export interface ContainerProps {
    children: (props: ContainerChildrenProps) => React.ReactNode
    isInteractive: boolean
    theme: Theme
}

export interface TooltipPosition {
    top?: number
    right?: number
    bottom?: number
    left?: number
}

export interface ContainerState {
    isTooltipVisible: boolean
    tooltipContent: null | React.ReactNode
    position: TooltipPosition
}

export default class Container extends React.Component<ContainerProps, ContainerState> {
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

    private container = React.createRef<HTMLDivElement>()

    showTooltip = (content: null | React.ReactNode, event: React.MouseEvent<any>) => {
        const { clientX, clientY } = event
        const bounds = this.container.current.getBoundingClientRect()

        const x = clientX - bounds.left
        const y = clientY - bounds.top

        const position: TooltipPosition = {}

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
            <div style={containerStyle} ref={this.container}>
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
