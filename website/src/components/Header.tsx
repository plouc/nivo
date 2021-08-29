import React from 'react'
import styled from 'styled-components'
import { HeaderNav } from './HeaderNav'

const Header = () => (
    <Container>
        <HeaderNav />
    </Container>
)

export default Header

const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.gradientColor0};
    background-image: linear-gradient(
        -90deg,
        ${({ theme }) => theme.colors.gradientColor0},
        ${({ theme }) => theme.colors.gradientColor1}
    );
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 11;
`
