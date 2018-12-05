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
import Measure from 'react-measure'

export interface ResponsiveWrapperProps {
    children: (props: { width: number; height: number }) => React.ReactNode
}

export interface ResponsiveWrapperState {
    dimensions: {
        width: number
        height: number
    }
}

export default class ResponsiveWrapper extends React.Component<
    ResponsiveWrapperProps,
    ResponsiveWrapperState
> {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }

    state = {
        dimensions: {
            width: -1,
            height: -1,
        },
    }

    render() {
        const { width, height } = this.state.dimensions

        const shouldRender = width > 0 && height > 0

        return (
            <Measure
                bounds
                onResize={contentRect => {
                    this.setState({ dimensions: contentRect.bounds })
                }}
            >
                {({ measureRef }) => (
                    <div ref={measureRef} style={{ width: '100%', height: '100%' }}>
                        {shouldRender && this.props.children({ width, height })}
                    </div>
                )}
            </Measure>
        )
    }
}
