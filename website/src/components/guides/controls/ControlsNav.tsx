import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

export const ControlsNav = () => {
    return (
        <Container>
            <SectionTitle>Generics</SectionTitle>
            <SectionLinks>
                {/*
                <ControlLink to="/guides/controls/object/" activeClassName="_is-active">
                    ObjectControl
                </ControlLink>
                */}
                <ControlLink to="/guides/controls/radio/" activeClassName="_is-active">
                    RadioControl
                </ControlLink>
                <ControlLink to="/guides/controls/range/" activeClassName="_is-active">
                    RangeControl
                </ControlLink>
                <ControlLink to="/guides/controls/switch/" activeClassName="_is-active">
                    SwitchControl
                </ControlLink>
                <ControlLink to="/guides/controls/text/" activeClassName="_is-active">
                    TextControl
                </ControlLink>
            </SectionLinks>
            <SectionTitle>Specialized</SectionTitle>
            <SectionLinks>
                <ControlLink to="/guides/controls/angle/" activeClassName="_is-active">
                    AngleControl
                </ControlLink>
                <ControlLink to="/guides/controls/box-anchor/" activeClassName="_is-active">
                    BoxAnchorControl
                </ControlLink>
                <ControlLink to="/guides/controls/line-width/" activeClassName="_is-active">
                    LineWidthControl
                </ControlLink>
                <ControlLink to="/guides/controls/margin/" activeClassName="_is-active">
                    MarginControl
                </ControlLink>
            </SectionLinks>
            <SectionTitle>Colors</SectionTitle>
            <SectionLinks>
                <ControlLink to="/guides/controls/blend-mode/" activeClassName="_is-active">
                    BlendModeControl
                </ControlLink>
                <ControlLink to="/guides/controls/color/" activeClassName="_is-active">
                    ColorControl
                </ControlLink>
                <ControlLink to="/guides/controls/opacity/" activeClassName="_is-active">
                    OpacityControl
                </ControlLink>
                <ControlLink to="/guides/controls/ordinal-colors/" activeClassName="_is-active">
                    OrdinalColorsControl
                </ControlLink>
            </SectionLinks>
        </Container>
    )
}

const Container = styled.nav`
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.cardBackground};
    box-shadow: ${({ theme }) => theme.cardShadow};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const SectionTitle = styled.h3`
    background: ${({ theme }) => theme.colors.accent};
    background-image: linear-gradient(
        -90deg,
        ${({ theme }) => theme.colors.gradientColor0},
        ${({ theme }) => theme.colors.gradientColor1}
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: top left;
    color: #ffffff;
    text-transform: uppercase;
    margin: 0;
    padding: 9px 12px;
    font-weight: 700;
    font-size: 11px;
    line-height: 1em;
`

const SectionLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 7px 0;
`

const ControlLink = styled(Link)`
    padding: 7px 12px;
    line-height: 1em;
    font-size: 14px;
    text-decoration: none;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 3px;
        background-color: ${({ theme }) => theme.colors.accent};
        opacity: 0;
    }

    &:hover:before {
        opacity: 0.35;
    }

    &._is-active {
        font-weight: 600;
    }
    &._is-active:before {
        opacity: 1;
    }
`
