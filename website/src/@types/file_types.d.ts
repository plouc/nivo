// import { ChartMeta } from '../types'

type ChartMetaFlavors = {
    flavor: 'svg' | 'html' | 'canvas' | 'api'
    path: string
}[]

declare module '*funnel/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Funnel: ChartMeta
    }

    export default meta
}

declare module '*sankey/meta.yml' {
    const meta: {
        flavors: ChartMetaFlavors
        Sankey: ChartMeta
    }

    export default meta
}
