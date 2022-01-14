import { ControlProps } from './types'
import { ObjectControl, RadioControl, RangeControl, SwitchControl, TextControl } from './generic'
import { AngleControl, BoxAnchorControl, LineWidthControl } from './specialized'
import { OpacityControl } from './colors'

export const Control = <Props extends ControlProps = any>({ control }: { control: Props }) => {
    switch (control.type) {
        case 'angle':
            return <AngleControl {...control} />

        case 'box_anchor':
            return <BoxAnchorControl {...control} />

        case 'line_width':
            return <LineWidthControl {...control} />

        case 'object':
            return <ObjectControl {...control} />

        case 'opacity':
            return <OpacityControl {...control} />

        case 'radio':
            return <RadioControl {...control} />

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
