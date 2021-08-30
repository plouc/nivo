export type Flavor = 'svg' | 'html' | 'canvas' | 'api'

export interface ChartMeta {
    package: string
    tags: string[]
    description: string
    stories: {
        label: string
        link: string
    }[]
}
