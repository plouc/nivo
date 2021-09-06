import React from 'react'
import { ResponsiveTimeRange, timeRangeDefaultProps } from '@nivo/calendar'
import { generateDayCounts } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/time-range/meta.yml'
import mapper from '../../data/components/time-range/mapper'
import { groups } from '../../data/components/time-range/props'

const Tooltip = data => {
    /* return custom tooltip */
}

const from = new Date(2018, 3, 1)
const to = new Date(2018, 7, 12)
const generateData = () => generateDayCounts(from, to)

const initialProperties = {
    from: '2018-04-01',
    to: '2018-08-12',

    align: 'center',
    emptyColor: '#eeeeee',
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
    minValue: 0,
    maxValue: 'auto',

    margin: {
        top: 40,
        right: 40,
        bottom: 100,
        left: 40,
    },
    direction: 'horizontal',

    monthLegendPosition: 'before',
    monthLegendOffset: 10,

    weekdayLegendOffset: 75,

    square: true,
    dayRadius: 0,
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
            justify: false,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
            translateX: -60,
            translateY: -60,
            symbolSize: 20,
        },
    ],
}

const TimeRange = () => {
    return (
        <ComponentTemplate
            name="TimeRange"
            meta={meta.TimeRange}
            icon="time-range"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={timeRangeDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={properties => ({
                ...properties,
                tooltip: properties.tooltip ? Tooltip : undefined,
            })}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTimeRange
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

export default TimeRange
