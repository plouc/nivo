/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import range from 'lodash/range'
import random from 'lodash/random'
import React, { Component } from 'react'
import Helmet from 'react-helmet'

const keys = ['group A', 'group B', 'group C', 'group D', 'group E']
const ageRange = [0, 100]
const weightRange = [4, 120]
const generateData = () => {
    return keys.map(key => {
        return {
            id: key,
            data: range(120).map(i => ({
                id: i,
                x: random(ageRange[0], ageRange[1]),
                y: random(weightRange[0], weightRange[1]),
            })),
        }
    })
}

export default class ScatterPlotPage extends Component {
    state = {
        data: generateData(),
    }

    diceRoll = () => {
        this.setState({ data: generateData() })
    }

    render() {
        const { childRoutes } = this.props
        const { data } = this.state

        return (
            <div className="inner-content scatterplot_page">
                <Helmet title="ScatterPlot components" />
                {childRoutes.map(childRoute => {
                    return React.cloneElement(childRoute, {
                        component: null,
                        render: () => (
                            <childRoute.props.component data={data} diceRoll={this.diceRoll} />
                        ),
                    })
                })}
            </div>
        )
    }
}
