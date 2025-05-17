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

export type FlavorAwareChartPropertyAttribute<T> = T | Partial<Record<Flavor, T>>

export interface ChartProperty<Settings = Record<string, unknown>> {
    key: string
    name?: string
    group: string
    // type of the property, preferably expressed with TypeScript notation
    type: FlavorAwareChartPropertyAttribute<string>
    // will be parsed in Markdown and supports links
    help?: string
    // will be parsed in Markdown and supports links
    description?: FlavorAwareChartPropertyAttribute<string>
    required: boolean
    // default property value as defined for the component,
    // default props should be exported by nivo packages
    defaultValue?: any
    flavors?: Flavor[]
    // disable the control when the current chart flavor doesn't match
    enableControlForFlavors?: Flavor[]
    // not used at the moment, indicate that a property is just used
    // for the demo and not part of the component props.
    excludeFromDoc?: boolean
    // control?: ControlConfig
    when?: (settings: Settings) => boolean
}