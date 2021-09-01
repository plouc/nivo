import React from 'react'
import styled from 'styled-components'
import ControlsGroup from '../controls/ControlsGroup'
import media from '../../theming/mediaQueries'
import { ChartProperty } from '../../types'

interface ControlsGroupsProps {
    groups: {
        name: string
        properties: ChartProperty[]
    }[]
    value: any
    onChange: any
}

const ControlsGroups = ({ groups, value, onChange }: ControlsGroupsProps) => (
    <>
        {groups.map(group => {
            return (
                <Group key={group.name}>
                    <Title>{group.name}</Title>
                    <ControlsGroup
                        name={group.name}
                        controls={group.properties}
                        settings={value}
                        onChange={onChange}
                    />
                </Group>
            )
        })}
    </>
)

export default ControlsGroups

const Group = styled.div`
    &:first-child {
        border-top-width: 0;
    }
`

const Title = styled.div`
    padding: 16px 30px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    line-height: 1em;
    color: white;
    background: ${({ theme }) => theme.colors.accent};
    background-image: linear-gradient(-90deg, #dc5a32, #c44a67);
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: top left;

    ${media.tablet`
        & {
            padding: 16px 20px 16px 30px;
        }
    `}

    ${media.mobile`
        & {
            padding: 16px 20px 16px 30px;
        }
    `}
`
