import React from 'react'
import { TimeRange } from '@nivo/calendar'
import timeRangeLightNeutralImg from '../../assets/icons/time-range-light-neutral.png'
import timeRangeLightColoredImg from '../../assets/icons/time-range-light-colored.png'
import timeRangeDarkNeutralImg from '../../assets/icons/time-range-dark-neutral.png'
import timeRangeDarkColoredImg from '../../assets/icons/time-range-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const pad = value => `0${value}`.slice(-2)
const data = Array(21)
    .fill('')
    .map((_, index) => ({
        day: `2021-06-${pad(index + 2)}`,
        value: Math.round(Math.random() * 400),
    }))

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data,
    margin: {
        top: 6,
        right: 14,
        bottom: 6,
        left: 14,
    },
    dayRadius: 3,
    daySpacing: 2,
    square: false,
    weekdayLegendOffset: 0,
}

const TimeRangeIconItem = ({ type }) => {
    const currentColors = colors[type].colors

    return (
        <Icon id={`time-range-${type}`} type={type}>
            <TimeRange
                {...chartProps}
                colors={[currentColors[4], currentColors[2], currentColors[1]]}
                dayBorderColor="none"
                theme={{
                    labels: {
                        text: {
                            fill: 'none',
                        },
                    },
                }}
            />
        </Icon>
    )
}

const TimeRangeIcon = () => (
    <>
        <TimeRangeIconItem type="lightNeutral" />
        <IconImg url={timeRangeLightNeutralImg} />
        <TimeRangeIconItem type="lightColored" />
        <IconImg url={timeRangeLightColoredImg} />
        <TimeRangeIconItem type="darkNeutral" />
        <IconImg url={timeRangeDarkNeutralImg} />
        <TimeRangeIconItem type="darkColored" />
        <IconImg url={timeRangeDarkColoredImg} />
    </>
)

export default TimeRangeIcon
