/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import snakeCase from 'lodash/kebabCase'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VisitIcon from 'react-icons/lib/md/keyboard-arrow-right'
import media from '../../theming/mediaQueries'
import config from '../../data/config'

const buildStoryLink = link =>
    `${config.storybookUrl}?path=/story/${encodeURIComponent(link.toLowerCase())}`

const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: calc(var(--innerHeight) * 0.4);
    background: ${({ theme }) => theme.colors.cardAltBackground};
    ${({ isFullWidth, theme }) => {
        if (isFullWidth) {
            return `
                --innerWidth: calc(100% - ${theme.dimensions.miniNavWidth}px);
                width: calc(var(--innerWidth) * 0.55);
                right: 0;
            `
        }

        return `
            --innerWidth: calc(100% - ${theme.dimensions.miniNavWidth}px);
            --partialWidth: calc(var(--innerWidth) * 0.55);
            width: calc(var(--partialWidth) / 2);
            right: calc(var(--partialWidth) / 2);
        `
    }}
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;

    ${media.tablet`
        & {
            --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
            height: calc(var(--innerHeight) * 0.4);
            left: 45%;
            bottom: 0;
            ${({ isFullWidth }) => {
                if (isFullWidth) {
                    return `
                        width: calc(100% * 0.55);
                    `
                }

                return `
                    --halfWidth: calc(100% * 0.55);
                    --computedWidth: calc(var(--halfWidth) / 2);
                    width: var(--computedWidth);
                `
            }}
        }
    `}

    ${media.mobile`
        & {
            position: relative;
            bottom: auto;
            right: auto;
            width: auto;
            height: auto;
            border-left: none;
            border-top: 1px solid ${({ theme }) => theme.colors.border};
        }
    `}
`

const Header = styled.div`
    top: 0;
    left: 0;
    padding: 7px 12px;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
`

const StoriesItem = styled.a`
    color: inherit;
    padding: 9px 24px;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    font-size: 14px;
    line-height: 1.6em;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};
    }
`

const Stories = ({ isFullWidth = false, stories }) => {
    return (
        <Wrapper isFullWidth={isFullWidth}>
            <Header>Recipes</Header>
            {stories.map((story, i) => (
                <StoriesItem
                    key={i}
                    href={buildStoryLink(story.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {story.label}
                    <VisitIcon size={20} color="#bbbbbb" />
                </StoriesItem>
            ))}
        </Wrapper>
    )
}

Stories.propTypes = {
    isFullWidth: PropTypes.bool,
    stories: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        })
    ),
}

export default Stories
