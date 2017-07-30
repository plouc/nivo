/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import Voronoi from './Voronoi'
import Measure from 'react-measure'

export default class ResponsiveVoronoi extends Component {
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
                {({ measureRef }) =>
                    <div
                        ref={measureRef}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {shouldRender &&
                            <Voronoi
                                width={width}
                                height={height}
                                {...this.props}
                            />}
                    </div>}
            </Measure>
        )
    }
}
