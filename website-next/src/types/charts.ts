export type Flavor = 'svg' | 'html' | 'canvas' | 'api'

export interface ChartFlavor {
    flavor: Flavor
    path: string
}

export interface ChartStory {
    label: string
    link: string
    description?: string
}

export interface ChartMeta {
    package: string
    tags: string[]
    description: string
    stories: ChartStory[]
}