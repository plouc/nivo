import React from 'react'
import styled from 'styled-components'
import dedent from 'dedent-js'
import { Markdown } from '../../Markdown'

const Description = styled.div`
    grid-column-start: 2;
    font-size: 0.8rem;
    margin-top: 12px;

    p {
        margin: 7px 0;
    }
`

interface PropertyDescriptionProps {
    description: string
}

export const PropertyDescription = ({ description }: PropertyDescriptionProps) => {
    return (
        <Description>
            <Markdown source={dedent(description)} />
        </Description>
    )
}
