import styled from 'styled-components'
import dedent from 'dedent-js'
import { Markdown } from './Markdown'

interface PropertyDescriptionProps {
    description: string
}

export const Description = ({ description }: PropertyDescriptionProps) => (
    <Container>
        <Markdown source={dedent(description)} />
    </Container>
)

const Container = styled.div`
    grid-column-start: 2;
    font-size: 0.8rem;
    margin-top: 12px;

    p {
        margin: 7px 0;
    }
`
