import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UpIcon from 'react-icons/lib/md/keyboard-arrow-up'
import DownIcon from 'react-icons/lib/md/keyboard-arrow-down'

const Wrapper = styled.div`
    margin-bottom: 15px;
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.cardShadow};
    margin-bottom: ${({ isExpanded }) => (isExpanded ? '30px' : 0)};
`

// .card__header
const Header = styled.div`
    height: 52px;
    width: 100%;
    position: relative;
    padding: 0 24px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

// .card__header h3
const Title = styled.h3`
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
`

/*
.card._is-expanded .card_toggle {
    transform: rotate(90deg);
}

.card__header svg {
    font-size: 26px;
    color: #bbb;
}

.card__header:hover svg {
    color: #777;
}
*/

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
            <Wrapper isExpanded={expanded}>
                <Header className="card__header no-select" onClick={this.handleToggleClick}>
                    <Title>{title}</Title>
                    {expanded ? <UpIcon /> : <DownIcon />}
                </Header>
                {expanded && <div className="card_body">{children}</div>}
            </Wrapper>
        )
    }
}
