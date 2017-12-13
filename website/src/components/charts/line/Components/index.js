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
import LineDotsSvg from './LineDotsSvg'

const sampleData = [
    {
        id: 'default',
        data: [
            { x: 0, y: 10 },
            { x: 10, y: 12 },
            { x: 20, y: 16 },
            { x: 30, y: 23 },
            { x: 40, y: 27 },
            { x: 50, y: 27 },
            { x: 60, y: 25 },
        ],
    },
]

const Components = () => (
    <div className="inner-content">
        <div className="page_content">
            <Helmet title="@nivo/line low level components documentation" />
            <div className="chart_header">
                <h1 className="page_header">
                    <strong>@nivo/line</strong> low level components
                </h1>
            </div>
            <LineSvg data={sampleData} />
            <LineAreaSvg data={sampleData} />
            <LineDotsSvg data={sampleData} />
        </div>
    </div>
)

export default Components
