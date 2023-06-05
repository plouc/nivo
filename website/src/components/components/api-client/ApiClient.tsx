import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../Layout'
import media from '../../../theming/mediaQueries'
import { ComponentPage } from '../ComponentPage'
import { ComponentHeader } from '../ComponentHeader'
import { ComponentFlavorSelector } from '../ComponentFlavorSelector'
import { ComponentDescription } from '../ComponentDescription'
import { ComponentSettings } from '../ComponentSettings'
import { ApiTabs } from './ApiTabs'
import { ApiSubmit } from './ApiSubmit'
import { ApiResponse } from './ApiResponse'
import config from '../../../data/config'
import { ChartPropertiesGroup, Flavor } from '../../../types'

const description = (component: string) => `
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

interface ApiClientProps {
    componentName: string
    chartClass: string
    apiPath: string
    dataProperty?: string
    propsMapper?: (props: any) => any
    defaultProps: any
    flavors: {
        flavor: Flavor
        path: string
    }[]
    controlGroups: ChartPropertiesGroup[]
}

export const ApiClient = ({
    componentName,
    chartClass,
    apiPath,
    dataProperty = 'data',
    propsMapper = (props: any) => props,
    defaultProps,
    flavors,
    controlGroups,
}: ApiClientProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [props, setProps] = useState(defaultProps)
    const [responseStatus, setResponseStatus] = useState<number | null>(null)
    const [response, setResponse] = useState<any | null>(null)

    const handleSettingsUpdate = useCallback(
        (settings: any) => {
            setProps(settings)
        },
        [setProps]
    )

    const handleSubmit = useCallback(() => {
        setIsLoading(true)

        fetch(`${config.nivoApiUrl}${apiPath}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propsMapper(props)),
        })
            .then(res => {
                setIsLoading(false)
                setResponseStatus(res.status)

                return res.json()
            })
            .then(setResponse)
            .catch(err => {
                console.error(err)
            })
    }, [apiPath, propsMapper, props, setIsLoading, setIsLoading, setResponseStatus, setResponse])

    const flavorKeys = flavors.map(flavor => flavor.flavor)

    return (
        <Layout>
            <ComponentPage>
                <ComponentHeader
                    chartClass={`${componentName} HTTP API`}
                    tags={[`POST ${apiPath}`]}
                />
                {flavors && <ComponentFlavorSelector flavors={flavors} current="api" />}
                <ComponentDescription description={description(componentName)} />
                <ApiTabs
                    chartClass={chartClass}
                    data={props[dataProperty]}
                    body={propsMapper(props)}
                    isLoading={isLoading}
                    responseStatus={responseStatus}
                    chartUrl={response ? response.url : null}
                />
                <ControlPanel>
                    <SubmitWrapper>
                        <ApiSubmit loading={isLoading} onClick={handleSubmit} />
                    </SubmitWrapper>
                    <ApiResponse responseStatus={responseStatus} response={response} />
                </ControlPanel>
                <ComponentSettings
                    settings={props}
                    flavors={flavorKeys}
                    currentFlavor="api"
                    groups={controlGroups}
                    onChange={handleSettingsUpdate}
                />
            </ComponentPage>
        </Layout>
    )
}

const ControlPanel = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    width: calc(var(--innerWidth) * 0.55);
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
            width: 55%;
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
