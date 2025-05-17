'use client'
import {ResponsiveBarCanvas, svgDefaultProps} from "@nivo/bar";
import { AppHeader} from "@/app/_ui/app/AppHeader";
import { ChartTemplate } from "@/app/_ui/charts/ChartTemplate";
import { BarMeta, barFlavors} from "../meta";
import { generateHeavyDataSet} from '../data'
import { UnmappedBarProps, MappedBarProps} from '../mapper'

interface DataWithKeys {
    data: ({
        country: string
    } & {
        [key: string]: number
    })[]
    keys: string[]
}

const unmappedBarProps: UnmappedBarProps = {
    ...svgDefaultProps,
    indexBy: 'country',
    margin: {
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
    },
    // valueFormat: { format: '', enabled: false },
    // Patterns should be disabled by default, otherwise the code
    // becomes too complex for a simple example.
    // defs: [
    //     patternDotsDef('dots', {
    //         background: 'inherit',
    //         color: '#38bcb2',
    //         size: 4,
    //         padding: 1,
    //         stagger: true,
    //     }),
    //     patternLinesDef('lines', {
    //         background: 'inherit',
    //         color: '#eed312',
    //         rotation: -45,
    //         lineWidth: 6,
    //         spacing: 10,
    //     }),
    // ],
    // fill: [
    //     { match: { id: 'fries' }, id: 'dots' },
    //     { match: { id: 'sandwich' }, id: 'lines' },
    // ],
    axisTop: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
        truncateTickAt: 0,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
        truncateTickAt: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0,
    },
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    legends: [
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 16,
            itemDirection: 'left-to-right',
            symbolSize: 16,
        },
    ],
    // 'custom tooltip example': false,
}

export default function BarCanvas() {
  return (
    <div>
        <AppHeader/>
        <ChartTemplate<UnmappedBarProps, MappedBarProps, DataWithKeys, HTMLCanvasElement>
            component="BarCanvas"
            icon="bar"
            meta={BarMeta}
            flavors={barFlavors}
            currentFlavor="canvas"
            generateData={generateHeavyDataSet as () => DataWithKeys}
            unmappedProps={unmappedBarProps}
            enableDiceRoll
            // initialProperties={{}}
            enableChartDownload
        >
            {({ data, chartRef }) => (
                <ResponsiveBarCanvas data={data.data} keys={data.keys} ref={chartRef}/>
            )}
        </ChartTemplate>
    </div>
  )
}
