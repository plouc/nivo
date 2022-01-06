import React, { memo, useCallback, useMemo } from 'react'
import omit from 'lodash/omit'
import { AnnotationMatcher } from '@nivo/annotations'
import { ChartProperty, Flavor } from '../../../types'
import { AnnotationsControlConfig, ArrayControlConfig, ControlContext } from '../types'
import { ArrayControl } from '../generics'

const fixAnnotation = (annotation: AnnotationMatcher<any>): AnnotationMatcher<any> => {
    let adjusted: AnnotationMatcher<any> = annotation

    if (annotation.type === 'rect') {
        if (annotation.borderRadius === undefined) {
            adjusted = { ...annotation, borderRadius: 2 }
        }
    } else {
        if ((annotation as any).borderRadius !== undefined) {
            adjusted = omit(annotation as any, 'borderRadius') as AnnotationMatcher<any>
        }
    }

    return adjusted
}

interface AnnotationsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: AnnotationsControlConfig
    value: AnnotationMatcher<any>[]
    onChange: (annotations: AnnotationMatcher<any>[]) => void
    context?: ControlContext
}

export const AnnotationsControl = memo(
    ({
        id,
        property,
        flavors,
        currentFlavor,
        value,
        config: { createDefaults },
        onChange,
        context,
    }: AnnotationsControlProps) => {
        const arrayProperty: Omit<ChartProperty, 'control'> & {
            control: ArrayControlConfig<AnnotationMatcher<any>>
        } = useMemo(
            () => ({
                ...property,
                control: {
                    type: 'array',
                    shouldCreate: true,
                    addLabel: 'add annotation',
                    shouldRemove: true,
                    getItemTitle: (index, annotation) =>
                        `annotations[${index}] '${annotation.note}' (${annotation.type})`,
                    defaults: createDefaults,
                    props: [
                        {
                            key: 'type',
                            flavors: property.flavors,
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
                            flavors: property.flavors,
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
                                        flavors: property.flavors,
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
                            key: 'borderRadius',
                            flavors,
                            help: `Rect border radius.`,
                            type: 'number',
                            required: false,
                            when: (settings: any) => settings.type === 'rect',
                            control: {
                                type: 'range',
                                min: 0,
                                max: 12,
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
                            required: false,
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
            }),
            [property, createDefaults]
        )

        const handleChange = useCallback(
            (annotations: AnnotationMatcher<any>[]) => onChange(annotations.map(fixAnnotation)),
            [onChange]
        )

        return (
            <ArrayControl<AnnotationMatcher<any>>
                id={id}
                property={arrayProperty as ChartProperty<any>}
                value={value}
                flavors={flavors}
                currentFlavor={currentFlavor}
                config={arrayProperty.control}
                onChange={handleChange}
                context={context}
            />
        )
    }
)
