/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UpIcon from 'react-icons/lib/md/keyboard-arrow-up'
import DownIcon from 'react-icons/lib/md/keyboard-arrow-down'
import { Card } from './styled'

const Wrapper = styled(Card)`
    margin-bottom: 15px;
    margin-bottom: ${({ isExpanded }) => (isExpanded ? '30px' : 0)};

    svg {
        font-size: 26px;
    }
`

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
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`

const Title = styled.h3`
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
`

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
                <Header className="no-select" onClick={this.handleToggleClick}>
                    <Title>{title}</Title>
                    {expanded ? <UpIcon /> : <DownIcon />}
                </Header>
                {expanded && <div className="card_body">{children}</div>}
            </Wrapper>
        )
    }
}
