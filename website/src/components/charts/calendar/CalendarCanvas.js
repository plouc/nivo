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
import { ResponsiveCalendarCanvas, CalendarCanvasDefaultProps } from '@nivo/calendar'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import nivoTheme from '../../../nivoTheme'
import properties from './props'
import propsMapper from './propsMapper'

const Tooltip = data => {
    /* return custom tooltip */
}

const initialSettings = {
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    from: '2013-03-01',
    to: '2019-07-12',

    emptyColor: '#eeeeee',
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
    minValue: 0,
    maxValue: 'auto',

    margin: {
        top: 40,
        right: 40,
        bottom: 50,
        left: 40,
    },
    direction: 'vertical',

    yearSpacing: 30,
    yearLegendPosition: 'before',
    yearLegendOffset: 10,

    monthBorderWidth: 2,
    monthBorderColor: '#ffffff',
    monthLegendPosition: 'before',
    monthLegendOffset: 10,

    daySpacing: 0,
    dayBorderWidth: 1,
    dayBorderColor: '#ffffff',

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            translateY: 40,
            itemCount: 4,
            itemWidth: 34,
            itemHeight: 36,
            itemDirection: 'top-to-bottom',
        },
    ],

    theme: {
        ...nivoTheme,
        labels: {
            ...nivoTheme.labels,
            text: {
                ...nivoTheme.labels.text,
                fontSize: 10,
            },
        },
    },
}

const CalendarCanvas = ({ data }) => {
    const [settings, setSettings] = useState(initialSettings)
    const onDayClick = useCallback((day, event) => {
        alert(`${day.day}: ${day.value}\nclicked at x: ${day.clientX}, y: ${day.clientY}`)
    })

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveCalendarCanvas',
        {
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        {
            pkg: '@nivo/calendar',
            defaults: CalendarCanvasDefaultProps,
        }
    )

    const header = <ChartHeader chartClass="CalendarCanvas" tags={['calendar', 'canvas']} />

    const description = (
        <div className="chart-description">
            <p className="description">
                A variation around the <Link to="/calendar">Calendar</Link> component. Well suited
                for large data sets as it does not impact DOM tree depth, however you'll lose the
                isomorphic rendering ability.
            </p>
            <p className="description">
                The responsive alternative of this component is{' '}
                <code>ResponsiveCalendarCanvas</code>.
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
                    <ResponsiveCalendarCanvas
                        from={settings.from}
                        to={settings.to}
                        data={data}
                        onClick={onDayClick}
                        {...mappedSettings}
                    />
                </ChartTabs>
                <CalendarControls
                    scope="CalendarCanvas"
                    settings={settings}
                    onChange={setSettings}
                />
                <ComponentPropsDocumentation chartClass="CalendarCanvas" properties={properties} />
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

export default CalendarCanvas
