import React, { Component } from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import GlobalLayout from '../layouts/GlobalLayout'
import ChartHeader from '../components/ChartHeader'
import ChartTabs from '../components/ChartTabs'
import ComponentPropsDoc from '../components/ComponentPropsDoc'
import Stories from '../components/Stories'
import componentsMapping from '../constants/componentsMapping'
import componentsDataGenerators from '../constants/data_generators'
import componentsDefaultSettings from '../constants/default_settings'

export default class ChartTemplate extends Component {
    state = {}

    componentDidMount() {
        const { pageContext: { package: pkg, component_id } } = this.props
        const generateData = componentsDataGenerators[pkg][component_id]
        const defaultSettings = componentsDefaultSettings[pkg][component_id]

        this.setState({
            data: generateData(),
            settings: { ...defaultSettings }
        })
    }

    diceRoll = () => {
        const { pageContext: { package: pkg, component_id } } = this.props
        const generateData = componentsDataGenerators[pkg][component_id]

        this.setState({
            data: generateData(),
        })
    }

    render() {
        const { pageContext, data } = this.props
        const { package: pkg, component_id, data_key } = pageContext
        const { info, props } = data
        const { data: chartData, settings } = this.state

        if (!info) {
            return (
                <div className="inner-content bar_page">
                    <div className="page_content grid">
                        <div className="chart-page_main">
                            <div style={{ color: 'white' }}>
                                no info found for {pkg}/{component_id}!
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const ChartComponent = componentsMapping[pkg][component_id]

        const description = (
            <div className="chart-description">
                <ReactMarkdown source={info.description} />
            </div>
        )

        let stories = null
        if (info.stories && info.stories.length > 0) {
            stories = <Stories stories={info.stories}/>
        }

        return (
            <GlobalLayout>
                <div className="inner-content bar_page">
                    <div className="page_content grid">
                        <div className="chart-page_main">
                            {chartData && (
                                <ChartTabs
                                    chartClass="bar"
                                    code={''}
                                    data={chartData[data_key]}
                                    diceRoll={this.diceRoll}
                                >
                                    <ChartComponent
                                        {...chartData}
                                        {...settings}
                                    />
                                </ChartTabs>
                            )}
                            <ComponentPropsDoc
                                component={info.component}
                                properties={props ? props.props : []}
                            />
                        </div>
                        <div className="chart-page_aside">
                            <ChartHeader chartClass={info.component} tags={info.tags}/>
                            {description}
                            {stories}
                        </div>
                    </div>
                </div>
            </GlobalLayout>
        )
    }
}

export const query = graphql`
query componentInfo($package: String, $component_id: String, $props_id: String) {
  info: componentsYaml(package: {eq: $package}, component_id: {eq: $component_id}) {
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
      description
      type
      required
      default
    }
  }
}
`
