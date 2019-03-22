import React, { Component } from 'react'
import snakeCase from 'lodash/kebabCase'
import PropTypes from 'prop-types'
import VisitIcon from 'react-icons/lib/md/keyboard-arrow-right'
import config from '../config'
import CollapsibleCard from './CollapsibleCard'

const buildStoryLink = ({ kind, story }) =>
    `${config.storybookUrl}?path=/story/${encodeURIComponent(
        kind.toLowerCase()
    )}--${encodeURIComponent(snakeCase(story))}`

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
                    <a
                        key={i}
                        className="stories__item"
                        href={buildStoryLink(story.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {story.label}
                        <VisitIcon size={20} color="#bbb" />
                    </a>
                ))}
            </CollapsibleCard>
        )
    }
}
