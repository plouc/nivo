import { ChartProperty, Flavor } from '../../types'

export const annotations = ({
    key = 'annotations',
    target,
    group = 'Annotations',
    type = 'AnnotationMatcher[]',
    flavors,
    defaultValue = [],
    newDefaults,
}: {
    key?: string
    target: string
    group?: string
    type?: string
    flavors: Flavor[]
    defaultValue: any[]
    newDefaults: any
}): ChartProperty => {
    return {
        key,
        group,
        help: `Annotations for ${target}.`,
        type,
        required: false,
        flavors,
        defaultValue,
        control: {
            type: 'array',
            shouldCreate: true,
            addLabel: 'add annotation',
            shouldRemove: true,
            getItemTitle: (index: number, annotation: any) =>
                `annotation[${index}] '${annotation.note}' (${annotation.type})`,
            defaults: newDefaults,
            props: [
                {
                    key: 'type',
                    flavors,
                    help: `Annotation type.`,
                    type: `'dot' | 'circle' | 'rect'`,
                    required: true,
                    control: {
                        type: 'choices',
                        choices: [
                            { value: 'dot', label: 'dot' },
                            { value: 'circle', label: 'circle' },
                            { value: 'rect', label: 'rect' },
                        ],
                    },
                },
                {
                    key: 'match',
                    flavors,
                    help: 'Annotation matcher.',
                    required: true,
                    type: 'object',
                    control: {
                        type: 'object',
                        isOpenedByDefault: true,
                        props: [
                            {
                                key: 'id',
                                required: false,
                                flavors,
                                help: 'Match elements having the provided ID.',
                                type: 'string | number',
                                control: {
                                    type: 'text',
                                },
                            },
                        ],
                    },
                },
                {
                    key: 'note',
                    flavors,
                    help: `Annotation note.`,
                    type: 'text',
                    required: true,
                    control: { type: 'text' },
                },
                {
                    key: 'noteX',
                    flavors,
                    help: `Annotation note x position.`,
                    type: 'number',
                    required: true,
                    control: {
                        type: 'range',
                        min: -300,
                        max: 300,
                        step: 5,
                    },
                },
                {
                    key: 'noteY',
                    flavors,
                    help: `Annotation note y position.`,
                    type: 'number',
                    required: true,
                    control: {
                        type: 'range',
                        min: -300,
                        max: 300,
                        step: 5,
                    },
                },
                {
                    key: 'noteTextOffset',
                    flavors,
                    help: `Annotation note text offset.`,
                    type: 'number',
                    required: true,
                    control: {
                        type: 'range',
                        min: -64,
                        max: 64,
                    },
                },
                {
                    key: 'offset',
                    flavors,
                    help: `Offset from annotated element.`,
                    type: 'number',
                    required: false,
                    control: {
                        type: 'range',
                        min: 0,
                        max: 32,
                    },
                },
            ],
        },
    }
}
