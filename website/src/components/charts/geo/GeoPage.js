/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Helmet from 'react-helmet'

const GeoPage = ({ childRoutes }) => {
    return (
        <div className="inner-content">
            <Helmet title="Geo components" />
            {childRoutes.map(childRoute => {
                return React.cloneElement(childRoute, {
                    component: null,
                    render: () => <childRoute.props.component />,
                })
            })}
        </div>
    )
}

export default GeoPage
