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
import random from 'lodash/random'
import { generateSankeyData } from '@nivo/generators'

const generateData = () => generateSankeyData({ nodeCount: 6, maxIterations: 8 })

export default class SankeyPage extends Component {
    state = {
        data: generateData(),
    }

    randomizeLinkValues = () => {
        const { data } = this.state
        this.setState({
            data: Object.assign({}, data, {
                links: data.links.map(link =>
                    Object.assign({}, link, {
                        value: random(5, 200),
                    })
                ),
            }),
        })
    }

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    render() {
        const { childRoutes } = this.props
        const { data } = this.state

        return (
            <div className="inner-content">
                <Helmet title="Sankey component" />
                {childRoutes.map(childRoute => {
                    return React.cloneElement(childRoute, {
                        component: null,
                        render: () => (
                            <childRoute.props.component
                                data={data}
                                randomizeLinkValues={this.randomizeLinkValues}
                                diceRoll={this.diceRoll}
                            />
                        ),
                    })
                })}
            </div>
        )
    }
}
