import { AreaBump } from '../src'
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
    component: AreaBump,
    title: 'AreaBump',
}

const Template = args => (
    <AreaBump
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

export const WithFillPattern = Template.bind({})

WithFillPattern.args = {
    defs: [
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
        },
    ],
    fill: [
        {
            match: {
                id: 'Serie 3',
            },
            id: 'lines',
        },
        {
            match: {
                id: 'Serie 5',
            },
            id: 'dots',
        },
    ],
}

WithFillPattern.parameters = {
    controls: {
        include: [],
    },
}
