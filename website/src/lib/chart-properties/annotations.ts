import { AnnotationMatcher } from '@bitbloom/nivo-annotations'
import { ChartProperty, Flavor } from '../../types'

export const annotations = ({
    key = 'annotations',
    target,
    group = 'Annotations',
    type = 'AnnotationMatcher[]',
    flavors,
    defaultValue = [],
    createDefaults,
}: {
    key?: string
    target: string
    group?: string
    type?: string
    flavors: Flavor[]
    defaultValue?: AnnotationMatcher<any>[]
    createDefaults: AnnotationMatcher<any>
}): ChartProperty => ({
    key,
    group,
    help: `Annotations for ${target}.`,
    type,
    required: false,
    flavors,
    defaultValue,
    control: {
        type: 'annotations',
        createDefaults,
    },
})
