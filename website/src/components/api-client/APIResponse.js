/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import CollapsibleCard from '../CollapsibleCard'

class APIResponse extends Component {
    render() {
        const { responseStatus, response } = this.props

        let responseContent = 'no response available'
        if (response) {
            responseContent = JSON.stringify(response, null, '  ')
        }

        return (
            <div className="api-client_response">
                <CollapsibleCard
                    title={`Response (${responseStatus ? responseStatus : 'n/a'})`}
                    expandedByDefault={true}
                >
                    <div className="code-snippet">
                        <pre>{responseContent}</pre>
                    </div>
                </CollapsibleCard>
            </div>
        )
    }
}

APIResponse.propTypes = {}

APIResponse.defaultProps = {}

export default APIResponse
