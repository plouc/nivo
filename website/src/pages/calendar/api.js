/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateDayCounts } from '@nivo/generators'
import SEO from '../../components/seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import mapper from '../../data/components/calendar/mapper'
import { groups } from '../../data/components/calendar/props'
import meta from '../../data/components/calendar/meta.yml'

const from = new Date(2015, 3, 1)
const to = new Date(2018, 7, 12)
const generateData = () => generateDayCounts(from, to)
const data = generateData()

const CalendarApi = () => {
    return (
        <>
            <SEO title="Calendar HTTP API" keywords={[...meta.Calendar.tags, 'HTTP API']} />
            <ApiClient
                componentName="Calendar"
                chartClass="calendar"
                apiPath="/charts/calendar"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 400,
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
                    direction: 'horizontal',

                    yearSpacing: 40,
                    yearLegendPosition: 'before',
                    yearLegendOffset: 10,

                    monthSpacing: 0,
                    monthBorderWidth: 2,
                    monthBorderColor: '#ffffff',
                    monthLegendPosition: 'before',
                    monthLegendOffset: 10,

                    daySpacing: 0,
                    dayBorderWidth: 2,
                    dayBorderColor: '#ffffff',
                    data: JSON.stringify(data, null, '  '),
                }}
            />
        </>
    )
}

export default CalendarApi
