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
import { groupsByScope } from '../../data/components/calendar/props'
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
                controlGroups={groupsByScope.api}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 400,
                    margin: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    },
                    from,
                    to,
                    data: JSON.stringify(data, null, '  '),
                    direction: 'horizontal',
                    yearSpacing: 40,
                    yearLegendOffset: 10,
                    daySpacing: 0,
                    dayBorderWidth: 1,
                    dayBorderColor: '#000000',
                    monthBorderWidth: 3,
                    monthBorderColor: '#000000',
                    monthLegendOffset: 10,
                }}
            />
        </>
    )
}

export default CalendarApi
