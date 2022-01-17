import { memo } from 'react'
import { useTheme } from 'styled-components'
import { OpacityControlProps } from '../types'
import {
    ControlContainer,
    ControlHeader,
    LabelWithPreview,
    TextInput,
    Slider,
    XGapSpacer,
    YGapSpacer,
} from '../ui'

const size = 24

const NoMemoOpacityControl = ({
    id,
    label,
    icon,
    value,
    setValue,
    context = { path: [] },
}: OpacityControlProps) => {
    const theme = useTheme()

    return (
        <ControlContainer id={id} isSingleRow={false}>
            <ControlHeader>
                <LabelWithPreview
                    id={id}
                    label={label}
                    inputType="range"
                    icon={icon}
                    context={context}
                >
                    <svg width={size} height={size}>
                        <defs>
                            <pattern
                                id="opacityControlChecker"
                                width={8}
                                height={8}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect fill="black" width={4} height={4} />
                                <rect fill="black" x={4} y={4} width={4} height={4} />
                            </pattern>
                        </defs>
                        <rect fill="url(#opacityControlChecker)" width={size} height={size} />
                        <rect
                            fill={theme.colors.accent}
                            width={size}
                            height={size}
                            fillOpacity={value}
                        />
                    </svg>
                </LabelWithPreview>
                <XGapSpacer />
                <TextInput<number> id={id} value={value} onChange={setValue} isNumber={true} />
            </ControlHeader>
            <YGapSpacer />
            <Slider id={id} min={0} max={1} step={0.05} value={value} onChange={setValue} />
        </ControlContainer>
    )
}

export const OpacityControl = memo(NoMemoOpacityControl) as typeof NoMemoOpacityControl
