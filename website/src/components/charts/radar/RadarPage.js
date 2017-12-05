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
import { generateWinesTastes } from '@nivo/generators'

export default class PiePage extends Component {
    state = generateWinesTastes()

    diceRoll = () => {
        this.setState(generateWinesTastes())
    }

    handleDataUpdate = data => {
        this.setState({ data })
    }

    render() {
        const { childRoutes } = this.props
        const { data, keys } = this.state

        return (
            <div className="inner-content radar_page">
                <Helmet title="Radar components" />
                {childRoutes.map(childRoute => {
                    return React.cloneElement(childRoute, {
                        component: null,
                        render: () => (
                            <childRoute.props.component
                                data={data}
                                keys={keys}
                                indexBy="taste"
                                diceRoll={this.diceRoll}
                                onDataUpdate={this.handleDataUpdate}
                            />
                        ),
                    })
                })}
            </div>
        )
    }
}
