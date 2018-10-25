import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 31%;
    height: 200px;
    border: 2px solid #333;
    background: ${({ theme }) => theme.colors.background};

    /*
    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        .guide__illustrations__item {
            height: 160px;
        }
    }
    @media only screen and (max-width: 760px) {
        .guide__illustrations__item {
            width: 80%;
            height: 120px;
            margin-top: 10px;
        }
        .guide__illustrations__item:first-child {
            margin-top: 0;
        }
    }
    */
`

const GuideIllustrationsItem = ({ children }) => <Container>{children}</Container>

export default GuideIllustrationsItem
