import React from 'react'
import styled from 'styled-components'

export const ColorsControlItem = ({ id, colors }: { id: string; colors: string[] }) => (
    <Container>
        <Name>{id}</Name>
        {colors.map(color => (
            <Sample key={color} style={{ background: color }} />
        ))}
    </Container>
)

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Name = styled.span`
    font-weight: 500;
    font-size: 0.8rem;
    margin-right: 14px;
    width: 130px;
`

const Sample = styled.div`
    display: block;
    width: 12px;
    height: 12px;
`
