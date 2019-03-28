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
import { generateLibTree } from '@nivo/generators'

export default class SunburstPage extends Component {
    state = {
        data: generateLibTree(),
    }

    diceRoll = () => {
        this.setState({
            data: generateLibTree(),
        })
    }

    handleDataUpdate = data => {
        this.setState({ data })
    }

    render() {
        const { childRoutes } = this.props
        const { data } = this.state

        return (
            <div className="inner-content pie_page">
                <Helmet title="Sunburst components" />
                {childRoutes.map(childRoute => {
                    return React.cloneElement(childRoute, {
                        component: null,
                        render: () => (
                            <childRoute.props.component
                                data={data}
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
