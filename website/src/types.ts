export type Flavor = 'svg' | 'html' | 'canvas' | 'api'
import { ControlConfig } from './components/controls/types'

export interface ChartMeta {
    package: string
    tags: string[]
    description: string
    stories: {
        label: string
        link: string
    }[]
}

export interface ChartProperty<Settings = any> {
    key: string
    name?: string
    group: string
    // type of the property, preferably expressed with TypeScript notation
    type: string
    // will be parsed in Markdown and supports links
    help?: string
    // will be parsed in Markdown and supports links
    description?: string
    // assumed to be optional by default
    required?: boolean
    // default property value as defined for the component,
    // default props should be exported by nivo packages
    defaultValue?: any
    flavors?: Flavor[]
    // disable the control when the current chart flavor doesn't match
    enableControlForFlavors?: Flavor[]
    // not used at the moment, indicate that a property is just used
    // for the demo and not part of the component props.
    excludeFromDoc?: boolean
    control?: ControlConfig
    when?: (settings: Settings) => boolean
}

export interface ChartPropertiesGroup {
    name: string
    properties: ChartProperty[]
}

export interface ChartNavData {
    name: string
    id: string
    tags: string[]
    flavors: {
        svg: true
        html?: boolean
        canvas?: boolean
        api?: boolean
    }
}
