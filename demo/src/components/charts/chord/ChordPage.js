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

class ChordPage extends Component {
    render() {
        const { childRoutes } = this.props

        return (
            <div className="inner-content chord_page">
                <Helmet title="Chord components" />
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

export default ChordPage
