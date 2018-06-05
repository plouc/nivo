/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import CalendarControls from './CalendarControls'
import { ResponsiveCalendar, CalendarDefaultProps } from '@nivo/calendar'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import nivoTheme from '../../../nivoTheme'
import properties from './props'
import propsMapper from './propsMapper'
import config from '../../../config'

const Tooltip = data => {
    /* return custom tooltip */
}

export default class Calendar extends Component {
    state = {
        data: [],
        settings: {
            from: '2015-03-01',
            to: '2016-07-12',

            domain: 'auto',
            emptyColor: '#eeeeee',
            colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],

            margin: {
                top: 100,
                right: 30,
                bottom: 60,
                left: 30,
            },
            direction: 'horizontal',

            // years
            yearSpacing: 40,
            yearLegendOffset: 10,

            // months
            monthBorderWidth: 2,
            monthBorderColor: '#ffffff',
            monthLegendOffset: 10,

            // days
            daySpacing: 0,
            dayBorderWidth: 2,
            dayBorderColor: '#ffffff',

            // interactivity
            isInteractive: true,
            'custom tooltip example': false,
            tooltip: null,

            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 36,
                    itemsSpacing: 0,
                    itemCount: 4,
                    itemWidth: 34,
                    itemHeight: 36,
                    itemDirection: 'top-to-bottom',
                    symbolSize: 16,
                    opacity: 0.8,
                    effects: [
                        {
                            match: 'hover',
                            style: {
                                opacity: 1,
                                background: '#eeeeee',
                                textColor: '#000000',
                            },
                        },
                    ],
                    onClick: data => console.log(data),
                },
            ],

            theme: nivoTheme,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    handleNodeClick = (node, event) => {
        alert(`${node.day}: ${node.value}\nclicked at x: ${event.clientX}, y: ${event.clientY}`)
    }

    render() {
        const { data } = this.props
        const { settings } = this.state

        const mappedSettings = propsMapper(settings)

        const code = generateCode(
            'ResponsiveCalendar',
            {
                ...mappedSettings,
                tooltip: mappedSettings.tooltip ? Tooltip : undefined,
            },
            {
                pkg: '@nivo/calendar',
                defaults: CalendarDefaultProps,
            }
        )

        const header = (
            <ChartHeader chartClass="Calendar" tags={['calendar', 'react', 'isomorphic']} />
        )

        const description = (
            <div className="chart-description">
                <p className="description">
                    This component is heavily inspired by{' '}
                    <a
                        href="https://bl.ocks.org/mbostock/4063318"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        this block
                    </a>.
                </p>
                <p>
                    This component is suitable for isomorphic rendering but require to use the{' '}
                    <code>Calendar</code> component not the <code>ResponsiveCalendar</code> one.
                </p>
                <p className="description">
                    This component is available in the{' '}
                    <a
                        href="https://github.com/plouc/nivo-api"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        nivo-api
                    </a>, you can <Link to="/calendar/api">try it using the API client</Link>. You
                    can also see more example usages in{' '}
                    <a
                        href={`${config.storybookUrl}?selectedKind=Calendar&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>.
                </p>
                <p className="description">
                    See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                    legends for this component.
                </p>
            </div>
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                        {description}
                    </MediaQuery>
                    <ChartTabs chartClass="calendar" code={code} data={data}>
                        <ResponsiveCalendar
                            from={settings.from}
                            to={settings.to}
                            data={data}
                            onClick={this.handleNodeClick}
                            {...mappedSettings}
                        />
                    </ChartTabs>
                    <CalendarControls
                        scope="Calendar"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                    <ComponentPropsDocumentation chartClass="Calendar" properties={properties} />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                        {description}
                    </MediaQuery>
                </div>
            </div>
        )
    }
}
