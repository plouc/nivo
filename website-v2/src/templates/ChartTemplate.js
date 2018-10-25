import React, { Component, Fragment } from 'react'
import omit from 'lodash/omit'
import { graphql } from 'gatsby'
import GlobalLayout from '../layouts/GlobalLayout'
import generateCode from '../lib/generateChartCode'
import ChartHeader from '../components/ChartHeader'
import ChartTabs from '../components/ChartTabs'
import ComponentPropsDoc from '../components/ComponentPropsDoc'
import Stories from '../components/Stories'
import Settings from '../components/settings/Settings'
import componentsMapping from '../constants/componentsMapping'
import componentsDataGenerators from '../constants/data_generators'
import componentsDefaultSettings from '../constants/default_settings'
import { getSettingsMapper } from '../constants/settings_mappers'
import { getPropertiesGroupsControls } from '../lib/componentProperties'
import ChartMeta from '../components/ChartMeta'

export default class ChartTemplate extends Component {
    state = {}

    static getDerivedStateFromProps(props, state) {
        if (!state.data && !state.settings && !state.mapper) {
            const {
                pageContext: { package: pkg, component_id },
            } = props
            const generateData = componentsDataGenerators[pkg][component_id]
            const defaultSettings = componentsDefaultSettings[pkg][component_id]
            const settingsMapper = getSettingsMapper(pkg, component_id)

            return {
                data: generateData ? generateData() : {},
                settings: defaultSettings ? { ...defaultSettings } : {},
                settingsMapper,
            }
        }

        return null
    }

    diceRoll = () => {
        const {
            pageContext: { package: pkg, component_id },
        } = this.props
        const generateData = componentsDataGenerators[pkg][component_id]

        this.setState({
            data: generateData(),
        })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { pageContext, data } = this.props
        const { package: pkg, component_id, data_key } = pageContext
        const { info, props } = data
        const { data: chartData, settings, settingsMapper } = this.state

        if (!info) {
            console.error('NO INFO', pageContext)
            return null
        }

        const ChartComponent = componentsMapping[pkg][component_id]
        const mappedSettings = settingsMapper(settings)

        const code = generateCode(
            `Responsive${info.component}`,
            {
                ...omit(chartData, [data_key]),
                ...mappedSettings,
            },
            { pkg: `@nivo/${pkg}`, defaults: {} }
        )

        const description = (
            <div
                className="chart-description"
                dangerouslySetInnerHTML={{
                    __html: info.description,
                }}
            />
        )

        let stories = null
        if (info.stories && info.stories.length > 0) {
            stories = <Stories stories={info.stories} />
        }

        let settingsElement = null
        if (props && data && settings) {
            const groups = getPropertiesGroupsControls(props.props, info.component)
            settingsElement = (
                <Settings
                    component={info.component}
                    settings={settings}
                    onChange={this.handleSettingsUpdate}
                    groups={groups}
                />
            )
        }

        return (
            <GlobalLayout>
                {({ theme }) => (
                    <Fragment>
                        <ChartMeta
                            location={this.props.location}
                            package={pkg}
                            component={info.component}
                        />
                        {settingsElement}
                        <div className="inner-content bar_page">
                            <div className="page_content grid">
                                <div className="chart-page_main">
                                    {chartData && (
                                        <ChartTabs
                                            chartClass={pkg}
                                            code={code}
                                            data={chartData[data_key]}
                                            diceRoll={this.diceRoll}
                                        >
                                            <ChartComponent
                                                {...chartData}
                                                {...mappedSettings}
                                                theme={theme.nivo}
                                            />
                                        </ChartTabs>
                                    )}
                                    <ComponentPropsDoc
                                        component={info.component}
                                        properties={props ? props.props : []}
                                    />
                                </div>
                                <div className="chart-page_aside">
                                    <ChartHeader chartClass={info.component} tags={info.tags} />
                                    {description}
                                    {stories}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            </GlobalLayout>
        )
    }
}

export const query = graphql`
    query componentInfo($package: String, $component_id: String, $props_id: String) {
        info: componentsYaml(package: { eq: $package }, component_id: { eq: $component_id }) {
            component_id
            package
            component
            tags
            description
            stories {
                label
                link {
                    kind
                    story
                }
            }
        }
        props: propsYaml(props_id: { eq: $props_id }) {
            props {
                key
                scopes
                description
                type
                required
                default
                group
                control
                controlOptions {
                    unit
                    min
                    max
                    step
                    disabledValue
                    defaultValue
                    withCustomColor
                    includeSequential
                    choices {
                        label
                        value
                        icon
                    }
                    props {
                        key
                        # scopes
                        description
                        type
                        # required
                        # default
                        control
                        controlOptions {
                            # unit
                            min
                            max
                            # step
                            disabledValue
                            defaultValue
                            # withCustomColor
                            choices {
                                label
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`
