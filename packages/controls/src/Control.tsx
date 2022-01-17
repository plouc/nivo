import { AllSupportedValues, ControlProps, ExtractValue } from './types'
import { ObjectControl, RadioControl, RangeControl, SwitchControl, TextControl } from './generic'
import { AngleControl, BoxAnchorControl, LineWidthControl, MarginControl } from './specialized'
import { OpacityControl, ColorControl, OrdinalColorsControl, BlendModeControl } from './colors'

export const Control = <Value extends AllSupportedValues = AllSupportedValues>({
    control,
}: {
    control: ControlProps<Value>
}) => {
    switch (control.type) {
        case 'angle':
            return <AngleControl {...control} />

        case 'blend_mode':
            return <BlendModeControl {...control} />

        case 'box_anchor':
            return <BoxAnchorControl {...control} />

        case 'color':
            return <ColorControl {...control} />

        case 'line_width':
            return <LineWidthControl {...control} />

        case 'margin':
            return <MarginControl {...control} />

        case 'object':
            return <ObjectControl<ExtractValue<Value, 'object'>> {...control} />

        case 'opacity':
            return <OpacityControl {...control} />

        case 'ordinal_colors':
            return <OrdinalColorsControl {...control} />

        case 'radio':
            return <RadioControl<ExtractValue<Value, 'radio'>> {...control} />

        case 'range':
            return <RangeControl {...control} />

        case 'switch':
            return <SwitchControl {...control} />

        case 'text':
            return <TextControl {...control} />

        default:
            return null
    }
}
