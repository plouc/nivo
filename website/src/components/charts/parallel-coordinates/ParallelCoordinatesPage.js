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
import { Switch } from 'react-router-dom'

const ParallelCoordinatesPage = ({ childRoutes }) => (
    <div className="inner-content">
        <Helmet title="Parallel coordinates components" />
        <Switch>
            {childRoutes.map(childRoute =>
                React.cloneElement(childRoute, {
                    component: childRoute.props.component,
                })
            )}
        </Switch>
    </div>
)

export default ParallelCoordinatesPage
