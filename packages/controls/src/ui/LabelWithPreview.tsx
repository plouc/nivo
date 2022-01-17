import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Label, LabelProps } from './Label'
import { XGapSpacer } from './spacers'

export const LabelWithPreview = ({ children, ...forwardProps }: PropsWithChildren<LabelProps>) => {
    return (
        <Container>
            {children}
            <XGapSpacer />
            <Label {...forwardProps} />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
`
