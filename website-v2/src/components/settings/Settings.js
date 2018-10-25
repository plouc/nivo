import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ControlsGroup from '../controls/ControlsGroup'

const Container = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.headerHeight}px;
    bottom: 0;
    left: 0;
    width: 280px;
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.text};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    z-index: 1000;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 12px;
`

const Group = styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const Title = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 9px 12px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1em;
`

export default class Settings extends Component {
    static propTypes = {
        component: PropTypes.string.isRequired,
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        groups: PropTypes.array.isRequired,
        group: PropTypes.string,
    }

    render() {
        const { component, settings, onChange, groups } = this.props

        return (
            <Container>
                {groups.map(group => {
                    return (
                        <Group key={group.name}>
                            <Title>{group.name}</Title>
                            <ControlsGroup
                                component={component}
                                name={group.name}
                                controls={group.controls}
                                settings={settings}
                                onChange={onChange}
                            />
                        </Group>
                    )
                })}
            </Container>
        )
    }
}
