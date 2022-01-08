import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import {
    FiExternalLink as ExternalLinkIcon,
    FiCoffee,
    FiBook,
    FiArrowRight as GuideIcon,
} from 'react-icons/fi'
import media from '../../theming/mediaQueries'
import * as nav from '../../data/nav'
import { FullNavComponentLink } from './FullNavComponentLink'

export const FullNav = memo(() => {
    return (
        <Container>
            <InnerContainer>
                <Components>
                    <SectionTitle>Components</SectionTitle>
                    {nav.components.map(component => (
                        <FullNavComponentLink key={component.id} {...component} />
                    ))}
                </Components>
                <Guides>
                    <SectionTitle>Guides</SectionTitle>
                    {nav.guides.map(guide => (
                        <InternalLink key={guide.path} to={guide.path}>
                            <GuideIcon />
                            <span>{guide.label}</span>
                        </InternalLink>
                    ))}
                </Guides>
                <Other>
                    <SectionTitle>Other</SectionTitle>
                    <InternalLink to="/about/">About</InternalLink>
                    <InternalLink to="/references/">References</InternalLink>
                    <InternalLink to="/faq/">FAQ</InternalLink>
                    <ExternalLink
                        href="https://nivo.rocks/storybook/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiBook />
                        <span>Storybook</span>
                        <ExternalLinkIcon />
                    </ExternalLink>
                    <ExternalLink
                        href="https://opencollective.com/nivo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiCoffee />
                        <span>Donate</span>
                        <ExternalLinkIcon />
                    </ExternalLink>
                    <ExternalLink
                        href="https://github.com/plouc/nivo"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <FaGithub />
                        <span>GitHub</span>
                        <ExternalLinkIcon />
                    </ExternalLink>
                    <ExternalLink
                        href="https://twitter.com/benitteraphael"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Twitter"
                    >
                        <FaTwitter />
                        <span>Twitter</span>
                        <ExternalLinkIcon />
                    </ExternalLink>
                </Other>
            </InnerContainer>
        </Container>
    )
})

const Container = styled.div`
    position: fixed;
    z-index: 1000;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    display: flex;
    justify-content: center;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.15);
    overflow-x: hidden;
    overflow-y: auto;
`

const InnerContainer = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 24px;
    grid-template-areas:
        'components guides'
        'components other';
    align-items: start;
    max-width: 1100px;
    margin: 32px 24px;

    ${media.tablet`
        & {
            margin: 24px 24px 32px;
            max-width: unset;
            grid-template-columns: 2fr 1fr;
            grid-row-gap: 24px;
            grid-template-areas: "components guides"
                                 "components other";
        }
    `}

    ${media.mobile`
        & {
            margin: 16px 16px 32px;
            max-width: unset;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 18px;
            grid-row-gap: 18px;
            grid-template-areas: "components components"
                                 "guides     other";
        }
    `}
`

const SectionTitle = styled.h3`
    padding: 0 0 6px;
    margin: 0 0 12px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%;
`

const Components = styled.div`
    grid-area: components;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
`

const Guides = styled.div`
    grid-area: guides;
    display: flex;
    flex-direction: column;
`

const Other = styled.div`
    grid-area: other;
    display: flex;
    flex-direction: column;
`

const linkStyle = css`
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 1em;
    margin-bottom: 12px;

    & svg:first-child {
        font-size: 16px;
        margin-right: 5px;
        color: ${({ theme }) => theme.colors.accent};
    }

    & svg:last-child {
        font-size: 16px;
        margin-left: 5px;
        opacity: 0.5;
    }

    &:hover {
        text-decoration: underline;
    }
`

const InternalLink = styled(Link)`
    ${linkStyle}
`

const ExternalLink = styled.a`
    ${linkStyle}
`
