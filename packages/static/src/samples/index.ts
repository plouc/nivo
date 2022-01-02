import {
    generateLibTree,
    generateDrinkStats,
    generateCountriesData,
    generateProgrammingLanguageStats,
    generateWinesTastes,
    generateSankeyData,
} from '@nivo/generators'
import { ChartProps, ChartType, LineApiProps } from '../mappings'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const moreKeys = [...keys, 'junk', 'sushi', 'ramen', 'curry', 'udon', 'bagel']

export const samples: Record<
    string,
    {
        type: ChartType
        props: ChartProps<ChartType>
    }
> = {
    bar: {
        type: 'bar',
        props: {
            width: 1400,
            height: 600,
            data: generateCountriesData(keys, { size: 24 }),
            keys,
            indexBy: 'country',
            colors: 'nivo',
        },
    },
    circle_packing: {
        type: 'circle_packing',
        props: {
            width: 600,
            height: 600,
            data: generateLibTree(),
            id: 'name',
            value: 'loc',
            label: 'name',
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
        } as ChartProps<'circle_packing'>,
    },
    chord: {
        type: 'chord',
        props: {
            width: 800,
            height: 800,
            data: [
                [11975, 5871, 8916, 2868, 1967, 2987, 4300],
                [1951, 10048, 2060, 6171, 1967, 2987, 4300],
                [8010, 16145, 8090, 8045, 1967, 2987, 4300],
                [1013, 990, 940, 6907, 2306, 1200, 900],
                [1013, 990, 940, 6907, 800, 3400, 1200],
                [1013, 990, 940, 6907, 1967, 2987, 4300],
                [1013, 990, 940, 6907, 3000, 3456, 876],
            ],
            keys: moreKeys.slice(0, 7),
            colors: { scheme: 'paired' },
            padAngle: 0.01,
            innerRadiusRatio: 0.98,
            innerRadiusOffset: 0.01,
        },
    },
    heatmap: {
        type: 'heatmap',
        props: {
            width: 900,
            height: 600,
            data: generateCountriesData(moreKeys, { size: 9, min: 0, max: 100 }),
            keys: moreKeys,
            indexBy: 'country',
            forceSquare: true,
            cellShape: 'circle',
            cellBorderWidth: 2,
            cellBorderColor: 'inherit:darker(0.4)',
            padding: 4,
            sizeVariation: 0.5,
            enableGridY: true,
            labelTextColor: 'inherit:darker(2.4)',
            colors: 'PuOr',
        },
    },
    line: {
        type: 'line',
        props: {
            width: 800,
            height: 500,
            data: generateDrinkStats(),
            keys: ['whisky', 'rhum', 'gin', 'vodka', 'cognac'],
            identity: 'country',
            cumulative: false,
            curve: 'monotoneX',
        } as LineApiProps,
    },
    pie: {
        type: 'pie',
        props: {
            width: 800,
            height: 800,
            data: generateProgrammingLanguageStats(true, 9).map(d =>
                Object.assign(d, {
                    id: d.label,
                })
            ),
            innerRadius: 0.5,
            padAngle: 0.5,
            cornerRadius: 5,
            margin: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100,
            },
        },
    },
    radar: {
        type: 'radar',
        props: Object.assign(
            {
                width: 800,
                height: 800,
                indexBy: 'taste',
                curve: 'catmullRomClosed',
                enableMarkersLabel: true,
            },
            generateWinesTastes()
        ),
    },
    sankey: {
        type: 'sankey',
        props: {
            width: 1400,
            height: 800,
            data: generateSankeyData({ nodeCount: 13, maxIterations: 2 }),
            colors: { scheme: 'paired' },
            nodeOpacity: 1,
            nodeThickness: 14,
            nodeBorderWidth: 0,
            linkOpacity: 0.15,
            labelPadding: 20,
        },
    },
    sunburst: {
        type: 'sunburst',
        props: {
            width: 800,
            height: 800,
            data: generateLibTree(),
            id: 'name',
            value: 'loc',
            childColor: { from: 'color', modifiers: [['brighter', 0.1]] },
            cornerRadius: 2,
            enableArcLabels: true,
            arcLabelsSkipAngle: 10,
            arcLabelsTextColor: { from: 'color', modifiers: [['darker', 1.4]] },
        },
    },
    treemap: {
        type: 'treemap',
        props: {
            width: 800,
            height: 500,
            data: generateLibTree(),
            identity: 'name',
            value: 'loc',
            labelFormat: '.0s',
            leavesOnly: false,
            innerPadding: 3,
            outerPadding: 3,
        },
    },
}
