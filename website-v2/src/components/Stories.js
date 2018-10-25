import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VisitIcon from 'react-icons/lib/md/keyboard-arrow-right'
// import config from '../config'
import CollapsibleCard from './CollapsibleCard'

const buildStoryLink = ({ kind, story }) =>
    //`${config.storybookUrl}?selectedKind=${encodeURIComponent(
    `?selectedKind=${encodeURIComponent(kind)}&selectedStory=${encodeURIComponent(story)}`

const StoriesItem = styled.a`
    padding: 9px 24px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 14px;
    line-height: 1.6em;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};
    }
`

export default class Stories extends Component {
    static propTypes = {
        stories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                link: PropTypes.shape({
                    kind: PropTypes.string.isRequired,
                    story: PropTypes.string.isRequired,
                }).isRequired,
            })
        ),
    }

    render() {
        const { stories } = this.props

        return (
            <CollapsibleCard title="Recipes" expandedByDefault={true}>
                {stories.map((story, i) => (
                    <StoriesItem
                        key={i}
                        href={buildStoryLink(story.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {story.label}
                        <VisitIcon size={20} color="#bbb" />
                    </StoriesItem>
                ))}
            </CollapsibleCard>
        )
    }
}
