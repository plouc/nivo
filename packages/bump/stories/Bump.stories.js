import { Bump } from '../src'
import { range, shuffle } from 'lodash'

const generateData = () => {
    const years = range(2000, 2005)
    const ranks = range(1, 7)

    const series = ranks.map(rank => {
        return {
            id: `Serie ${rank}`,
            data: [],
        }
    })

    years.forEach(year => {
        shuffle(ranks).forEach((rank, i) => {
            series[i].data.push({
                x: year,
                y: rank,
                extra: Math.random(),
            })
        })
    })

    return series
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: Bump,
    parameters: {
        controls: {
            exclude: ['data'],
        },
    },
    title: 'Bump',
}

const Template = args => (
    <Bump
        data={generateData()}
        height={360}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        titleOffsetX={-80}
        spacing={80}
        width={900}
        {...args}
    />
)

export const Default = Template.bind({})

const CustomPoint = ({ x, y, isActive, isInactive, size, color, borderColor, borderWidth }) => {
    return (
        <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
            <rect
                x={size * -0.5 - 4}
                y={size * -0.5 + 4}
                width={size + borderWidth}
                height={size + borderWidth}
                fill="rgba(0, 0, 0, .07)"
            />
            <rect
                x={size * -0.5}
                y={size * -0.5}
                width={size}
                height={size}
                fill={color}
                stroke={borderColor}
                strokeWidth={borderWidth}
            />
            {isActive && (
                <text textAnchor="middle" y={4} fill={borderColor}>
                    A
                </text>
            )}
            {isInactive && (
                <text textAnchor="middle" y={4} fill={borderColor}>
                    I
                </text>
            )}
        </g>
    )
}

export const CustomPoints = Template.bind({})

CustomPoints.argTypes = {
    pointColor: {
        control: { type: 'color' },
    },
}

CustomPoints.args = {
    activePointBorderWidth: 4,
    activePointSize: 24,
    inactivePointBorderWidth: 1,
    inactivePointSize: 16,
    pointBorderColor: { from: 'serie.color' },
    pointBorderWidth: 2,
    pointColor: '#ffffff',
    pointComponent: CustomPoint,
    pointSize: 20,
}

CustomPoints.parameters = {
    controls: {
        exclude: ['pointBorderColor', 'pointComponent'],
    },
}

export const MissingData = Template.bind({})

MissingData.args = {
    activePointSize: 16,
    data: [
        {
            id: 'Serie A',
            data: [
                // missing data at the beginning
                { x: 0, y: null },
                { x: 1, y: 1 },
                { x: 2, y: 1 },
                { x: 3, y: 2 },
                { x: 4, y: 2 },
            ],
        },
        {
            id: 'Serie B',
            data: [
                { x: 0, y: 1 },
                { x: 1, y: 2 },
                // missing data in the middle
                { x: 2, y: null },
                { x: 3, y: 3 },
                { x: 4, y: 3 },
            ],
        },
        {
            id: 'Serie C',
            data: [
                { x: 0, y: 3 },
                { x: 1, y: 3 },
                { x: 2, y: 3 },
                { x: 3, y: 1 },
                // missing data at the end
                { x: 4, y: null },
            ],
        },
    ],
    inactivePointSize: 8,
    pointSize: 12,
}

export const MoreSeriesThanRanks = Template.bind({})

MoreSeriesThanRanks.args = {
    data: generateData().map(series => ({
        ...series,
        data: series.data.map(datum => ({
            x: datum.x,
            y: datum.y >= 5 ? null : datum.y,
        })),
    })),
}
