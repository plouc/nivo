/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
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

const Tooltip = data => {
    /* return custom tooltip */
}

const initialSettings = {
    from: '2015-03-01',
    to: '2016-07-12',

    align: 'center',
    emptyColor: '#eeeeee',
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
    minValue: 0,
    maxValue: 'auto',

    margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    // margin: {
    //     top: 100,
    //     right: 30,
    //     bottom: 60,
    //     left: 30,
    // },
    direction: 'horizontal',

    yearSpacing: 40,
    yearLegendPosition: 'before',
    yearLegendOffset: 10,

    monthBorderWidth: 2,
    monthBorderColor: '#ffffff',
    monthLegendPosition: 'before',
    monthLegendOffset: 10,

    daySpacing: 0,
    dayBorderWidth: 2,
    dayBorderColor: '#ffffff',

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
        },
    ],

    theme: nivoTheme,
}

const Calendar = ({ data }) => {
    const [settings, setSettings] = useState(initialSettings)
    const onDayClick = useCallback((node, event) => {
        alert(`${node.day}: ${node.value}\nclicked at x: ${event.clientX}, y: ${event.clientY}`)
    })

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
        <ChartHeader chartClass="Calendar" tags={['@nivo/calendar', 'svg', 'isomorphic']} />
    )

    const description = (
        <div className="chart-description">
            <p className="description">
                This component is heavily inspired by{' '}
                <a
                    href="https://observablehq.com/@d3/calendar-view"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    this demo
                </a>
                .
            </p>
            <p className="description">
                The responsive alternative of this component is <code>ResponsiveCalendar</code>, it
                also offers a canvas implementations, see{' '}
                <Link to="/calendar/canvas">CalendarCanvas</Link>.
            </p>
            <p className="description">
                See the <Link to="/guides/legends">dedicated guide</Link> on how to setup legends
                for this component.
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
                        onClick={onDayClick}
                        {...mappedSettings}
                    />
                </ChartTabs>
                <CalendarControls scope="Calendar" settings={settings} onChange={setSettings} />
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

export default Calendar
