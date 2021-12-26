import React from 'react'
import { ResponsiveCalendarCanvas, calendarCanvasDefaultProps } from '@nivo/calendar'
import { generateDayCounts } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/calendar/meta.yml'
import mapper from '../../data/components/calendar/mapper'
import { groups } from '../../data/components/calendar/props'
import { graphql, useStaticQuery } from 'gatsby'

const from = new Date(2013, 3, 1)
const to = new Date(2019, 7, 12)
const generateData = () => generateDayCounts(from, to)

const Tooltip = data => {
    /* return custom tooltip */
}

const initialProperties = {
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    from: '2013-03-01',
    to: '2019-07-12',

    align: 'center',
    emptyColor: '#aa7942',
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

    monthSpacing: 0,
    monthBorderWidth: 2,
    monthBorderColor: '#ffffff',
    monthLegendPosition: 'before',
    monthLegendOffset: 10,

    daySpacing: 0,
    dayBorderWidth: 0,
    dayBorderColor: '#ffffff',

    isInteractive: true,
    'custom tooltip example': false,

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

const CalendarCanvas = () => {
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
            name="CalendarCanvas"
            meta={meta.CalendarCanvas}
            icon="calendar"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={calendarCanvasDefaultProps}
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
                    <ResponsiveCalendarCanvas
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

export default CalendarCanvas
