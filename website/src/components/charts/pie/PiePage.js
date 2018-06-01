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
import { generateProgrammingLanguageStats } from '@nivo/generators'

const generateData = () => {
    return generateProgrammingLanguageStats(true, 32).map(d => ({
        id: d.label,
        ...d,
    }))
}

export default class PiePage extends Component {
    state = {
        data: generateData(),
    }

    diceRoll = () => {
        this.setState({
            data: generateData(),
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
                <Helmet title="Pie components" />
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
