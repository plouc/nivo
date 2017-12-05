import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UpIcon from 'react-icons/lib/md/keyboard-arrow-up'
import DownIcon from 'react-icons/lib/md/keyboard-arrow-down'

export default class CollapsibleCard extends Component {
    static propTypes = {
        expandedByDefault: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        expandedByDefault: false,
    }

    constructor(props) {
        super(props)

        this.state = {
            expanded: props.expandedByDefault,
        }
    }

    handleToggleClick = () => {
        const { expanded } = this.state
        this.setState({ expanded: !expanded })
    }

    render() {
        const { title, children } = this.props
        const { expanded } = this.state

        return (
            <div className={`card ${expanded ? '_is-expanded' : ''}`}>
                <div className="card__header no-select" onClick={this.handleToggleClick}>
                    <h3>{title}</h3>
                    {expanded ? <UpIcon /> : <DownIcon />}
                </div>
                {expanded && <div className="card_body">{children}</div>}
            </div>
        )
    }
}
