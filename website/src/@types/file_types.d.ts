// import { ChartMeta } from '../types'

type ChartMetaFlavors = {
    flavor: 'svg' | 'html' | 'canvas' | 'api'
    path: string
}[]

declare module '*/area-bump/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        AreaBump: ChartMeta
    }

    export default meta
}

declare module '*/bar/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Bar: ChartMeta
        BarCanvas: ChartMeta
    }

    export default meta
}

declare module '*/bullet/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Bullet: ChartMeta
    }

    export default meta
}

declare module '*/bump/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Bump: ChartMeta
    }

    export default meta
}

declare module '*/calendar/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Calendar: ChartMeta
        CalendarCanvas: ChartMeta
    }

    export default meta
}

declare module '*/calendar/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Calendar: ChartMeta
        CalendarCanvas: ChartMeta
    }

    export default meta
}

declare module '*/chord/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Chord: ChartMeta
        ChordCanvas: ChartMeta
    }

    export default meta
}

declare module '*/choropleth/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Choropleth: ChartMeta
        ChoroplethCanvas: ChartMeta
    }

    export default meta
}

declare module '*/circle-packing/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        CirclePacking: ChartMeta
        CirclePackingHtml: ChartMeta
        CirclePackingCanvas: ChartMeta
    }

    export default meta
}

declare module '*/funnel/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Funnel: ChartMeta
    }

    export default meta
}

declare module '*/geomap/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        GeoMap: ChartMeta
    }

    export default meta
}

declare module '*/heatmap/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        HeatMap: ChartMeta
        HeatMapCanvas: ChartMeta
    }

    export default meta
}

declare module '*/icicles/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Icicles: ChartMeta
    }

    export default meta
}

declare module '*/line/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Line: ChartMeta
        LineCanvas: ChartMeta
    }

    export default meta
}

declare module '*/marimekko/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Marimekko: ChartMeta
    }

    export default meta
}

declare module '*/network/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Network: ChartMeta
        NetworkCanvas: ChartMeta
    }

    export default meta
}

declare module '*/parallel-coordinates/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        ParallelCoordinates: ChartMeta
        ParallelCoordinatesCanvas: ChartMeta
    }

    export default meta
}

declare module '*/pie/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Pie: ChartMeta
        PieCanvas: ChartMeta
    }

    export default meta
}

declare module '*/radar/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Radar: ChartMeta
    }

    export default meta
}

declare module '*/radial-bar/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        RadialBar: ChartMeta
    }

    export default meta
}

declare module '*/sankey/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Sankey: ChartMeta
    }

    export default meta
}

declare module '*/scatterplot/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        ScatterPlot: ChartMeta
        ScatterPlotCanvas: ChartMeta
    }

    export default meta
}

declare module '*/stream/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Stream: ChartMeta
    }

    export default meta
}

declare module '*/sunburst/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Sunburst: ChartMeta
    }

    export default meta
}

declare module '*/swarmplot/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        SwarmPlot: ChartMeta
        SwarmPlotCanvas: ChartMeta
    }

    export default meta
}

declare module '*/time-range/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        TimeRange: ChartMeta
    }

    export default meta
}

declare module '*/treemap/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        TreeMap: ChartMeta
        TreeMapHtml: ChartMeta
        TreeMapCanvas: ChartMeta
    }

    export default meta
}

declare module '*/voronoi/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Voronoi: ChartMeta
    }

    export default meta
}

declare module '*/waffle/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Waffle: ChartMeta
        WaffleHtml: ChartMeta
        WaffleCanvas: ChartMeta
    }

    export default meta
}

declare module '*.png' {
    const file: string

    export default file
}
