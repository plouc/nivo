import React, { useCallback, useState, useMemo } from 'react'
import { upperFirst } from 'lodash'
import {
    ContinuousColorScaleConfig,
    divergingColorScaleDefaults,
    quantizeColorScaleDefaults,
} from '@bitbloom/nivo-colors'
import { ChartProperty, Flavor } from '../../../types'
import { ContinuousColorsControlConfig, ControlContext, ObjectControlConfig } from '../types'
import { ObjectControl } from '../generics'

interface ContinuousColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: ContinuousColorsControlConfig
    value: ContinuousColorScaleConfig
    onChange: (config: ContinuousColorScaleConfig) => void
    context?: ControlContext
}

const scaleTypes = ['sequential', 'diverging', 'quantize']
const scaleTypeChoices = scaleTypes.map(type => ({
    label: upperFirst(type),
    value: type,
}))

const helpByType: Record<ContinuousColorScaleConfig['type'], string> = {
    sequential: `
    The \`sequential\` color scale maps colors linearly from min to max value.
    It is intended to be used with a sequential color scheme, 
    but also supports others.
    `,
    diverging: `
    The \`diverging\` color scale maps colors from min to max value,
    with a diverging point which can be configured via \`divergeAt\`.
    It is intended to be used with a diverging color scheme, 
    but also supports others.
    `,
    quantize: `
    The \`quantize\` color scale maps colors from min to max value
    to a discrete color range, dividing the domain into uniform segments.
    You can either use a predefined color scheme or pass a
    custom array of colors.
    `,
}

export const ContinuousColorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    context,
}: ContinuousColorsControlProps) => {
    const [lastDivergeAtValue, setLastDivergeAtValue] = useState(
        'divergeAt' in value ? value.divergeAt : divergingColorScaleDefaults.divergeAt
    )
    const [lastStepsValue, setLastStepsValue] = useState(
        'steps' in value ? value.steps : quantizeColorScaleDefaults.steps
    )

    const objectProperty: Omit<ChartProperty, 'control'> & {
        control: ObjectControlConfig
    } = useMemo(() => {
        return {
            ...property,
            control: {
                type: 'object',
                isOpenedByDefault: true,
                props: [
                    {
                        key: 'type',
                        type: `'sequential' | 'diverging' | 'quantize'`,
                        required: true,
                        help: helpByType[value.type],
                        control: {
                            type: 'radio',
                            columns: 3,
                            choices: scaleTypeChoices,
                        },
                    },
                    {
                        key: 'scheme',
                        type: 'string',
                        control: {
                            type: 'color_interpolators',
                        },
                    },
                    {
                        key: 'minValue',
                        type: 'number',
                        help: 'If omitted, will use the min value from the data.',
                    },
                    {
                        key: 'maxValue',
                        type: 'number',
                        help: 'If omitted, will use the max value from the data.',
                    },
                    {
                        key: 'divergeAt',
                        type: 'number',
                        help: 'Define the divergence point between min & max values (0~1).',
                        when: config => config.type === 'diverging',
                        defaultValue: divergingColorScaleDefaults.divergeAt,
                        control: {
                            type: 'range',
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        key: 'steps',
                        type: 'number',
                        help: `
                        Customize the number of steps you want to use for a \`quantize\` scale
                        unless you specify a custom array of colors, in which case the number of
                        steps is equal to the number of colors you defined.
                        `,
                        when: config => config.type === 'quantize',
                        defaultValue: quantizeColorScaleDefaults.steps,
                        control: {
                            type: 'range',
                            min: 2,
                            max: 16,
                        },
                    },
                ],
            },
        }
    }, [value.type, flavors])

    const handleChange = useCallback(
        ({ divergeAt, steps, ...genericProps }: any) => {
            let fixedValue = genericProps

            if (fixedValue.type === 'diverging') {
                if (divergeAt === undefined) {
                    fixedValue = {
                        ...fixedValue,
                        divergeAt: lastDivergeAtValue,
                    }
                } else {
                    fixedValue = { ...fixedValue, divergeAt }
                    setLastDivergeAtValue(divergeAt)
                }
            }

            if (fixedValue.type === 'quantize') {
                if (steps === undefined) {
                    fixedValue = {
                        ...fixedValue,
                        steps: lastStepsValue,
                    }
                } else {
                    fixedValue = { ...fixedValue, steps }
                    setLastStepsValue(steps)
                }
            }

            onChange(fixedValue)
        },
        [onChange, lastDivergeAtValue, setLastDivergeAtValue, lastStepsValue, setLastStepsValue]
    )

    return (
        <ObjectControl
            id={id}
            property={objectProperty}
            value={value}
            flavors={flavors}
            currentFlavor={currentFlavor}
            config={objectProperty.control}
            onChange={handleChange}
            context={context}
        />
    )
}
