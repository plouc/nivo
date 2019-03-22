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
import { generateDayCounts } from '@nivo/generators'

class CalendarPage extends Component {
    constructor(props) {
        super(props)

        const from = new Date(2015, 3, 1)
        const to = new Date(2018, 7, 12)

        this.state = {
            from,
            to,
            data: generateDayCounts(from, to),
        }
    }

    handleDiceRoll = () => {
        const { from, to } = this.state
        this.setState({
            data: generateDayCounts(from, to),
        })
    }

    render() {
        const { childRoutes } = this.props
        const { from, to, data } = this.state

        return (
            <div className="inner-content calendar_page">
                <Helmet title="Calendar component" />
                {childRoutes.map(childRoute => {
                    return React.cloneElement(childRoute, {
                        component: null,
                        render: () => (
                            <childRoute.props.component
                                from={from}
                                to={to}
                                data={data}
                                diceRoll={this.handleDiceRoll}
                            />
                        ),
                    })
                })}
            </div>
        )
    }
}

export default CalendarPage
