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
import { SizeLegendSvg, SHAPE_CIRCLE, ANCHOR_BOTTOM } from '@nivo/legends'
import SizeLegendControls from './SizeLegendControls'

export default class SizeLegendDocumentation extends Component {
    state = {
        settings: {
            anchor: ANCHOR_BOTTOM,
            shape: SHAPE_CIRCLE,
            linkLength: 10,
            labelOffset: 9,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { settings } = this.state

        return (
            <div className="inner-content">
                <Helmet title="@nivo/legends SizeLegend" />
                <div className="page_content">
                    <div className="guide__header">
                        <h1 className="page_header">
                            <strong>@nivo/legends</strong> SizeLegend
                        </h1>
                    </div>
                </div>
                <div className="guide__description text-content">
                    <svg width={800} height={200}>
                        <g transform="translate(0, 40)">
                            <SizeLegendSvg labelPosition="top" {...settings} />
                            <SizeLegendSvg x={200} labelPosition="right" {...settings} />
                            <SizeLegendSvg x={400} labelPosition="bottom" {...settings} />
                            <SizeLegendSvg x={600} labelPosition="left" {...settings} />
                        </g>
                    </svg>
                    <SizeLegendControls settings={settings} onChange={this.handleSettingsUpdate} />
                </div>
            </div>
        )
    }
}
