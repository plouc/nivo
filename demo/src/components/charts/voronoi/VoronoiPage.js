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
import range from 'lodash/range'

const generateSites = () =>
    range(100).map(id => ({ id, x: Math.random() * 500, y: Math.random() * 500 }))

class VoronoiPage extends Component {
    state = {
        data: generateSites(),
    }

    diceRoll = () => {
        this.setState({ data: generateSites() })
    }

    render() {
        const { childRoutes } = this.props
        const { data } = this.state

        return (
            <div className="inner-content chord_page">
                <Helmet title="Voronoi component" />
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

export default VoronoiPage
