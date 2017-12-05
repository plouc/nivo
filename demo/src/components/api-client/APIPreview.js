/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class APIPreview extends Component {
    render() {
        const { responseStatus, url } = this.props

        let content
        if (responseStatus === 201 && url) {
            content = (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: 'white' }}
                >
                    <img src={url} alt="api result" />
                </a>
            )
        } else {
            content = (
                <div>
                    <p>
                        Click the generate button in order to generate the chart.&nbsp; You can
                        customize settings and data by using dedicated sections.
                    </p>
                </div>
            )
        }

        return <div className="api-client_preview">{content}</div>
    }
}

APIPreview.propTypes = {
    responseStatus: PropTypes.number,
    url: PropTypes.string,
}

APIPreview.defaultProps = {}

export default APIPreview
