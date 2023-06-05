import React from 'react'
import styled from 'styled-components'

export const ColorsControlItem = ({ id, colors }: { id: string; colors: string[] }) => (
    <Container>
        <Name>{id}</Name>
        {colors.map((color, index) => (
            <Swatch key={`${color}.${index}`} style={{ background: color }} />
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
    width: 260px;
    white-space: nowrap;
`

const Swatch = styled.div`
    display: block;
    width: 10px;
    height: 10px;
`
