import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    font-style: italic;
    text-align: center;
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    color: #777;
`

const GuideIllustrationsLegend = ({ children }) => <Container>{children}</Container>

export default GuideIllustrationsLegend
