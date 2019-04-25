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
import styled from 'styled-components'
import Layout from '../../Layout'
import media from '../../../theming/mediaQueries'
import ComponentPage from '../ComponentPage'
import ComponentHeader from '../ComponentHeader'
import ComponentFlavorSelector from '../ComponentFlavorSelector'
import ComponentDescription from '../ComponentDescription'
import ComponentSettings from '../ComponentSettings'
import ApiTabs from './ApiTabs'
import ApiSubmit from './ApiSubmit'
import ApiResponse from './ApiResponse'
import config from '../../../data/config'

const description = component => `
The \`${component}\`component is available in the nivo
HTTP rendering API.
The API generates a SVG and return a path to this SVG
which can then be easily embedded.

The api accepts almost the same properties as the regular component,
in json, however it's not interactive and you cannot use code
in properties (functions).

Please note that the demo API server is installed on heroku
using a free plan, so it might be unavailable from times to times.
`

export default class ApiClient extends Component {
    static propTypes = {
        componentName: PropTypes.string.isRequired,
        chartClass: PropTypes.string.isRequired,
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

    render() {
        const {
            componentName,
            chartClass,
            apiPath,
            controlGroups,
            dataProperty,
            propsMapper,
            flavors,
        } = this.props
        const { props, loading, responseStatus, response } = this.state

        const flavorKeys = flavors.map(flavor => flavor.flavor)

        return (
            <Layout>
                <ComponentPage>
                    <ComponentHeader
                        chartClass={`${componentName} HTTP API`}
                        tags={[`POST ${apiPath}`]}
                    />
                    {flavors && <ComponentFlavorSelector flavors={flavors} current="api" />}
                    <ComponentDescription description={description(componentName, apiPath)} />
                    <ApiTabs
                        chartClass={chartClass}
                        data={props[dataProperty]}
                        body={propsMapper(props)}
                        isLoading={loading}
                        responseStatus={responseStatus}
                        chartUrl={response ? response.url : null}
                    />
                    <ControlPanel>
                        <SubmitWrapper>
                            <ApiSubmit loading={loading} onClick={this.handleSubmit} />
                        </SubmitWrapper>
                        <ApiResponse responseStatus={responseStatus} response={response} />
                    </ControlPanel>
                    <ComponentSettings
                        component={componentName}
                        settings={props}
                        flavors={flavorKeys}
                        currentFlavor="api"
                        groups={controlGroups}
                        onChange={this.handleSettingsUpdate}
                    />
                </ComponentPage>
            </Layout>
        )
    }
}

const ControlPanel = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    --partialWidth: calc(var(--innerWidth) * 0.6);
    width: var(--partialWidth);
    background: ${({ theme }) => theme.colors.cardAltBackground};
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: calc(var(--innerHeight) * 0.45);
    z-index: 10;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr 2fr;

    ${media.tablet`
        & {
            right: 0;
            bottom: 0;
            --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
            height: calc(var(--innerHeight) * 0.45);
            width: 60%;
        }
    `}

    ${media.mobile`
        & {
            position: relative;
            right: auto;
            bottom: auto;
            width: auto;
            height: auto;
            border-left-width: 0;
            z-index: 0;
        }
    `}
`

const SubmitWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
`
