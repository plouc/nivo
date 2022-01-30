import { memo } from 'react'
import { RangeControlProps } from '../types'
import {
    ControlContainer,
    ControlHeader,
    Label,
    TextInput,
    Slider,
    XGapSpacer,
    YGapSpacer,
} from '../ui'
import { defaultContext } from '../defaults'

const NoMemoRangeControl = ({
    id,
    label,
    description,
    min,
    max,
    step = 1,
    unit,
    value,
    onChange,
    context = defaultContext,
}: RangeControlProps) => {
    return (
        <ControlContainer id={id} description={description} isSingleRow={false}>
            <ControlHeader>
                <Label id={id} label={label} inputType="range" context={context} />
                <XGapSpacer />
                <TextInput<number>
                    id={id}
                    value={value}
                    unit={unit}
                    isNumber={true}
                    onChange={onChange}
                />
            </ControlHeader>
            <YGapSpacer />
            <Slider id={id} min={min} max={max} step={step} value={value} onChange={onChange} />
        </ControlContainer>
    )
}

export const RangeControl = memo(NoMemoRangeControl) as typeof NoMemoRangeControl
