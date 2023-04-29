import { useMemo } from 'react'
import { Theme } from '@nivo/core'
import { generateSwarmPlotData } from '@nivo/generators'
import { useOrdinalColorScale } from '@nivo/colors'
import { usePie } from '@nivo/pie'
import { SwarmPlot, CircleProps, SwarmPlotCustomLayerProps } from '@nivo/swarmplot'

type SwarmPlotDatum = ReturnType<typeof generateSwarmPlotData>['data'][number]

const CustomCircle = (props: CircleProps<SwarmPlotDatum>) => {
    const getArcColor = useOrdinalColorScale({ scheme: 'purple_orange' }, v => v)
    const { dataWithArc, arcGenerator } = usePie({
        data: props.node.data.categories.map((value, id) => ({
            id,
            value,
            hidden: false,
            data: value,
            color: '',
            formattedValue: `${value}`,
            label: `${value}`,
        })),
        radius: props.node.size / 2,
        innerRadius: (props.node.size / 2) * 0.7,
        sortByValue: true,
    })

    return (
        <g transform={`translate(${props.node.x},${props.node.y})`}>
            <circle r={props.node.size / 2} stroke="rgb(216, 218, 235)" strokeWidth={12} />
            <circle
                r={props.node.size / 2}
                fill="rgb(45, 0, 75)"
                stroke="rgb(45, 0, 75)"
                strokeWidth={6}
            />
            {dataWithArc.map((datum, i) => {
                return <path key={i} d={arcGenerator(datum.arc)} fill={getArcColor(i)} />
            })}
            {props.node.size > 52 && (
                <text
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        fontSize: 14,
                        fontWeight: 800,
                    }}
                >
                    {props.node.value}
                </text>
            )}
        </g>
    )
}

const ShadowsLayer = ({ nodes }: SwarmPlotCustomLayerProps<unknown>) => (
    <>
        {nodes.map(node => (
            <circle
                key={node.id}
                cx={node.x}
                cy={node.y + node.size * 0.2}
                r={node.size * 0.55}
                fill="rgba(45, 0, 75, .15)"
            />
        ))}
    </>
)

const theme: Theme = {
    background: 'rgb(216, 218, 235)',
    axis: {
        ticks: {
            line: {
                stroke: 'rgb(84, 39, 136)',
            },
            text: {
                fill: 'rgb(84, 39, 136)',
                fontWeight: 600,
            },
        },
        legend: {
            text: {
                fill: 'rgb(84, 39, 136)',
                fontSize: 15,
            },
        },
    },
    grid: {
        line: {
            stroke: 'rgb(128, 115, 172)',
            strokeDasharray: '2 4',
            strokeWidth: 2,
        },
    },
}

export const SwarmPlotCustomCircle = () => {
    const data = useMemo(
        () => generateSwarmPlotData(['group'], { min: 32, max: 32, categoryCount: 9 }),
        []
    )

    return (
        <SwarmPlot
            width={1000}
            height={400}
            margin={{
                top: 30,
                right: 60,
                bottom: 80,
                left: 60,
            }}
            data={data.data}
            groups={data.groups}
            groupBy="group"
            id="id"
            value="price"
            valueScale={{
                type: 'linear',
                min: 0,
                max: 500,
            }}
            size={{
                key: 'volume',
                values: [4, 20],
                sizes: [30, 80],
            }}
            spacing={12}
            enableGridY={false}
            axisTop={null}
            axisRight={null}
            axisLeft={null}
            axisBottom={{
                legend: `custom node rendering with donut charts using usePie() React hook from @nivo/pie package`,
                legendPosition: 'middle',
                legendOffset: 50,
            }}
            circleComponent={CustomCircle}
            layers={['grid', 'axes', ShadowsLayer, 'circles']}
            layout="horizontal"
            theme={theme}
        />
    )
}
