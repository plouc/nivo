/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Helmet from 'react-helmet'
import LineSvg from './LineSvg'
import LineAreaSvg from './LineAreaSvg'

const Components = () => (
    <div className="inner-content">
        <div className="page_content">
            <Helmet title="@nivo/line low level components documentation" />
            <div className="chart_header">
                <h1 className="page_header">
                    <strong>@nivo/line</strong> low level components
                </h1>
            </div>
            <LineSvg />
            <LineAreaSvg />
        </div>
    </div>
)

export default Components
