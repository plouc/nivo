import React, { Component } from 'react'
import Helmet from 'react-helmet'
import LinearScale from './LinearScale'
import PointScale from './PointScale'
import TimeScale from './TimeScale'

export default class ScalesGuide extends Component {
    render() {
        return (
            <div className="inner-content">
                <Helmet title="Scales" />
                <div className="page_content">
                    <div className="guide__header">
                        <h1 className="page_header">
                            Scales | <strong>@nivo/scales</strong>
                        </h1>
                    </div>
                </div>
                <div className="guide__description text-content">
                    <p>Let's see how to deal with scales in nivo.</p>
                    <LinearScale />
                    <PointScale />
                    <TimeScale />
                </div>
            </div>
        )
    }
}
