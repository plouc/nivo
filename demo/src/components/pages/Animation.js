import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Animation extends Component {
    render() {
        return (
            <div>
                <div className="chart_header">
                    <div className="grid_item-2_3">
                        <h1 className="page_header">Animation</h1>
                    </div>
                </div>
                <div className="page_content">
                    <div className="grid">
                        <div className="grid_item">
                            <p className="description">How to deal with animations in nivo.</p>
                            <p>
                                see{' '}
                                <a
                                    href="http://vis.berkeley.edu/papers/animated_transitions/"
                                    target="_blank"
                                >
                                    this research
                                </a>
                            </p>
                            <p>
                                <code>@todo</code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Animation
