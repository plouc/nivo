import styled from 'styled-components'
import { OptionProps, SingleValueProps, components, GroupBase } from 'react-select'
import { ColorSchemeOption } from './helpers'

const ColorSchemeSelectItem = ({ label, colors }: ColorSchemeOption) => (
    <Container>
        <Label>{label}</Label>
        <Swatches>
            {colors.map((color, index) => (
                <Swatch key={`${color}.${index}`} style={{ background: color }} />
            ))}
        </Swatches>
    </Container>
)

export const ColorSchemeSingleValueComponent = (
    props: SingleValueProps<ColorSchemeOption, false, GroupBase<ColorSchemeOption>>
) => (
    <components.SingleValue {...props}>
        <SingleValueContainer>
            <ColorSchemeSelectItem {...props.data} />
        </SingleValueContainer>
    </components.SingleValue>
)

export const ColorSchemeOptionComponent = (
    props: OptionProps<ColorSchemeOption, false, GroupBase<ColorSchemeOption>>
) => (
    <components.Option {...props}>
        <ColorSchemeSelectItem {...props.data} />
    </components.Option>
)

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const SingleValueContainer = styled.div`
    padding: 3px 0 6px;
`

const Label = styled.span`
    font-weight: 500;
`

const Swatches = styled.div`
    margin: 5px 0 0;
    display: flex;
`

const Swatch = styled.div`
    display: block;
    width: 12px;
    height: 8px;
`
