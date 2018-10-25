import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const GuideIllustrations = ({ children }) => <Container>{children}</Container>

export default GuideIllustrations
