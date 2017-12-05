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

export default class BubblePage extends Component {
    state = {
        libTree: generateLibTree(),
    }

    diceRoll = () => {
        this.setState({ libTree: generateLibTree() })
    }

    render() {
        const { childRoutes } = this.props
        const { libTree } = this.state

        return (
            <div className="inner-content bubble_page">
                <Helmet title="Bubble component" />
                {childRoutes.map(childRoute => {
                    return React.cloneElement(childRoute, {
                        component: null,
                        render: () => (
                            <childRoute.props.component root={libTree} diceRoll={this.diceRoll} />
                        ),
                    })
                })}
            </div>
        )
    }
}
