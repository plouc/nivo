'use client'
import {ResponsiveBarCanvas, canvasDefaultProps} from "@nivo/bar";
import { PageLayout} from "@/app/_ui/app/PageLayout";
import { ChartTemplate } from "@/app/_ui/charts/ChartTemplate";
import { BarMeta, barFlavors} from "../meta";
import { generateHeavyDataSet} from '../data'
import { UnmappedBarCanvasProps, MappedBarCanvasProps, barCanvasMapper} from '../mapper'

interface DataWithKeys {
    data: ({
        country: string
    } & {
        [key: string]: number
    })[]
    keys: string[]
}

const unmappedBarProps: UnmappedBarCanvasProps = {
    ...canvasDefaultProps,
    indexBy: 'country',
    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    padding: 0.15,
    layout: 'horizontal',
    colors: { scheme: 'red_blue' },
    axisTop: {
        enable: true,
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
    // 'custom tooltip example': false,
}

export default function BarCanvas() {
  return (
    <PageLayout>
        <ChartTemplate<UnmappedBarCanvasProps, MappedBarCanvasProps, DataWithKeys, HTMLCanvasElement>
            component="BarCanvas"
            icon="bar"
            meta={BarMeta}
            flavors={barFlavors}
            currentFlavor="canvas"
            generateData={generateHeavyDataSet as () => DataWithKeys}
            unmappedProps={unmappedBarProps}
            propsMapper={barCanvasMapper}
            enableDiceRoll
            enableChartDownload
        >
            {({ data, props, chartRef }) => (
                <ResponsiveBarCanvas {...props} data={data.data} keys={data.keys} ref={chartRef}/>
            )}
        </ChartTemplate>
    </PageLayout>
  )
}
