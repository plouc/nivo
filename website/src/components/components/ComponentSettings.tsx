import React from 'react'
import styled from 'styled-components'
import media from '../../theming/mediaQueries'
import { Flavor, ChartPropertiesGroup } from '../../types'
import { ControlsGroup } from '../controls/ControlsGroup'

interface ComponentSettingsProps<Settings = any> {
    flavors: Flavor[]
    currentFlavor: Flavor
    settings: Settings
    onChange: (settings: Settings) => void
    groups: ChartPropertiesGroup[]
}

export function ComponentSettings<Settings = any>({
    flavors,
    currentFlavor,
    settings,
    onChange,
    groups,
}: ComponentSettingsProps<Settings>) {
    return (
        <Container>
            {groups.map(group => {
                return (
                    <Group key={group.name}>
                        <Title>{group.name}</Title>
                        <ControlsGroup
                            name={group.name}
                            flavors={flavors}
                            currentFlavor={currentFlavor}
                            controls={group.properties}
                            settings={settings}
                            onChange={onChange}
                        />
                    </Group>
                )
            })}
        </Container>
    )
}

const Container = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.text};
`

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
    background-image: linear-gradient(
        -90deg,
        ${({ theme }) => theme.colors.gradientColor0},
        ${({ theme }) => theme.colors.gradientColor1}
    );
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
