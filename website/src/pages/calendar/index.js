import React from 'react'
import { ResponsiveCalendar, calendarDefaultProps } from '@nivo/calendar'
import { generateDayCounts } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/calendar/meta.yml'
import mapper from '../../data/components/calendar/mapper'
import { groups } from '../../data/components/calendar/props'
import { graphql, useStaticQuery } from 'gatsby'

const Tooltip = data => {
    /* return custom tooltip */
}

const from = new Date(2015, 3, 1)
const to = new Date(2018, 7, 12)
const generateData = () => generateDayCounts(from, to)

const initialProperties = {
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
}

const Calendar = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/calendar.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Calendar"
            meta={meta.Calendar}
            icon="calendar"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={calendarDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={properties => ({
                ...properties,
                tooltip: properties.tooltip ? Tooltip : undefined,
            })}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveCalendar
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={day => {
                            logAction({
                                type: 'click',
                                label: `[day] ${day.day}: ${day.value}`,
                                color: day.color,
                                data: day,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Calendar
