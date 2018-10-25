import React from 'react'
import styled from 'styled-components'

const Container = styled.pre`
    background: ${({ theme }) => theme.colors.cardBackground};
    padding: 15px 25px;
    font-size: 16px;
    line-height: 26px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    margin: 30px 0 50px;
    overflow-x: auto;

    /*
    @media only screen and (max-width: 760px) {
        .guide__code {
            font-size: 14px;
            line-height: 1.6em;
        }
    }
    */
`

export const GuideCodeComment = styled.span`
    color: #999;
`

const GuideCode = ({ children }) => <Container>{children}</Container>

export default GuideCode
