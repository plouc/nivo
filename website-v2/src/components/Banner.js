import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    margin-bottom: 40px;
    padding: 20px;
`

const Banner = ({ children }) => <Wrapper>{children}</Wrapper>

export default Banner
