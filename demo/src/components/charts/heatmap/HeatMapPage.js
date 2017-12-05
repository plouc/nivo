/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class HeatMapPage extends Component {
    render() {
        const { childRoutes } = this.props

        return (
            <div className="inner-content">
                <Helmet title="HeatMap components" />
                {childRoutes.map(childRoute => {
                    return React.cloneElement(childRoute, {
                        component: null,
                        render: () => <childRoute.props.component />,
                    })
                })}
            </div>
        )
    }
}
