import React from 'react'
import styled from 'styled-components'

const Anchor = styled.a`
    cursor: pointer;
    position: absolute;
    width: 24px;
    height: 24px;
    left: -24px;
    top: 50%;
    margin-top: -12px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    display: none;
`

const Title2Base = styled.h2`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleText};
    position: relative;
    font-size: 1.4rem;

    &:hover ${Anchor} {
        display: flex;
    }
`

export const Title2 = ({ children, id }) => (
    <Title2Base id={id}>
        {id && (
            <Anchor href={`#${id}`} aria-hidden>
                #
            </Anchor>
        )}
        {children}
    </Title2Base>
)

const Title3Base = styled.h3`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleText};
    position: relative;
    font-size: 1.2rem;

    &:hover ${Anchor} {
        display: flex;
    }
`

export const Title3 = ({ children, id }) => (
    <Title3Base id={id}>
        {id && (
            <Anchor href={`#${id}`} aria-hidden>
                #
            </Anchor>
        )}
        {children}
    </Title3Base>
)

const Title4Base = styled.h4`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleText};
    position: relative;
    font-size: 1rem;

    &:hover ${Anchor} {
        display: flex;
    }
`

export const Title4 = ({ children, id }) => (
    <Title4Base id={id}>
        {id && (
            <Anchor href={`#${id}`} aria-hidden>
                #
            </Anchor>
        )}
        {children}
    </Title4Base>
)
