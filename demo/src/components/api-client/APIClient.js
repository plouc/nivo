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
import MediaQuery from 'react-responsive'
import CollapsibleCard from '../CollapsibleCard'
import config from '../../config'
import APIPreview from './APIPreview'
import APIResponse from './APIResponse'
import APISubmit from './APISubmit'

export default class APIClient extends Component {
    static propTypes = {
        componentName: PropTypes.string.isRequired,
        apiPath: PropTypes.string.isRequired,
        dataProperty: PropTypes.string.isRequired,
        propsMapper: PropTypes.func.isRequired,
    }

    static defaultProps = {
        dataProperty: 'data',
        propsMapper: props => props,
    }

    constructor(props) {
        super(props)

        this.state = {
            props: props.defaultProps,
            loading: false,
            responseStatus: null,
            response: null,
        }
    }

    handleSettingsUpdate = settings => {
        this.setState({ props: settings })
    }

    handleDataUpdate = e => {
        const { dataProperty } = this.props
        const { props } = this.state

        this.setState({
            props: Object.assign({}, props, {
                [dataProperty]: e.target.value,
            }),
        })
    }

    handleSubmit = () => {
        const { apiPath, propsMapper } = this.props
        const { props } = this.state

        this.setState({
            loading: true,
            response: null,
            responseStatus: null,
        })

        fetch(`${config.nivoApiUrl}${apiPath}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propsMapper(props)),
        })
            .then(res => {
                this.setState({
                    loading: false,
                    responseStatus: res.status,
                })

                return res.json()
            })
            .then(res => {
                this.setState({ response: res })
            })
            .catch(err => {
                console.error(err)
            })
    }

    componentDidMount() {
        //this.handleSubmit()
    }

    render() {
        const { componentName, apiPath, controls, dataProperty, propsMapper } = this.props
        const { props, loading, responseStatus, response } = this.state

        const dataBlock = (
            <CollapsibleCard title="data" expandedByDefault={true}>
                <textarea
                    className="api-client_data"
                    value={props[dataProperty]}
                    onChange={this.handleDataUpdate}
                />
            </CollapsibleCard>
        )

        return (
            <div className="api-client">
                <div className="page_content">
                    <div className="grid">
                        <div className="grid_item grid_item-full">
                            <div className="chart_header">
                                <h1 className="page_header">{componentName} HTTP API</h1>
                                <code>POST {apiPath}</code>
                            </div>
                        </div>
                        <div className="api-client_main">
                            <div className="grid api-client_response-wrapper">
                                <APIPreview
                                    responseStatus={responseStatus}
                                    url={response ? response.url : null}
                                />
                                <APIResponse responseStatus={responseStatus} response={response} />
                            </div>
                            <MediaQuery query="(max-width: 1000px)" className="api-client_aside">
                                <APISubmit loading={loading} onClick={this.handleSubmit} />
                                {dataBlock}
                            </MediaQuery>
                            {React.createElement(controls, {
                                scope: 'api',
                                settings: props,
                                onChange: this.handleSettingsUpdate,
                            })}
                        </div>
                        <MediaQuery query="(min-width: 1000px)" className="api-client_aside">
                            <APISubmit loading={loading} onClick={this.handleSubmit} />
                            {dataBlock}
                            <CollapsibleCard title="Body" expandedByDefault={true}>
                                <div className="code-snippet">
                                    <pre>{JSON.stringify(propsMapper(props), null, '  ')}</pre>
                                </div>
                            </CollapsibleCard>
                        </MediaQuery>
                    </div>
                </div>
            </div>
        )
    }
}
