import { CssMixBlendMode } from '@bitbloom/nivo-core'
import { OrdinalColorScaleConfig } from '@bitbloom/nivo-colors'
import { ChartProperty, Flavor } from '../../types'

export const ordinalColors = ({
    key = 'colors',
    group = 'Style',
    flavors,
    help = `Define chart's colors.`,
    description = `Please see the [dedicated documentation](self:/guides/colors) for colors.`,
    defaultValue,
}: {
    key?: string
    group?: string
    flavors: Flavor[]
    help?: string
    description?: string
    defaultValue: OrdinalColorScaleConfig
}): ChartProperty => ({
    key,
    group,
    type: 'OrdinalColorScaleConfig',
    help,
    description,
    required: false,
    defaultValue,
    flavors,
    control: { type: 'ordinalColors' },
})

export const blendMode = ({
    key = 'blendMode',
    target,
    description,
    group = 'Style',
    flavors,
    required = false,
    defaultValue,
}: {
    key?: string
    target: string
    description?: string
    group?: string
    flavors: Flavor[]
    required?: boolean
    defaultValue: CssMixBlendMode
}): ChartProperty => ({
    key,
    group,
    type: 'CssMixBlendMode',
    help: `Define CSS [\`mix-blend-mode\`](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode) for ${target}.`,
    description,
    required,
    defaultValue,
    flavors,
    control: { type: 'blendMode' },
})
