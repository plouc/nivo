import React, { useCallback } from 'react'
import styled from 'styled-components'
import { FaChevronRight } from 'react-icons/fa'
import { Flavor, ChartPropertiesGroup } from '../../types'
import { ControlsGroup } from '../controls/ControlsGroup'

interface ComponentSettingsGroupProps<Settings> {
    group: ChartPropertiesGroup
    flavors: Flavor[]
    currentFlavor: Flavor
    settings: Settings
    onChange: (settings: Settings) => void
    isOpen: boolean
    toggle: (name: string) => void
    searchTerm: string
}

export const ComponentSettingsGroup = <Settings = any,>({
    group,
    flavors,
    currentFlavor,
    settings,
    onChange,
    isOpen,
    toggle,
}: ComponentSettingsGroupProps<Settings>) => {
    const handleToggle = useCallback(() => {
        toggle(group.name)
    }, [group.name])

    return (
        <Container>
            <GroupHeader name={group.name} isOpen={isOpen} toggle={handleToggle} />
            {isOpen && (
                <ControlsGroup
                    name={group.name}
                    flavors={flavors}
                    currentFlavor={currentFlavor}
                    controls={group.properties}
                    settings={settings}
                    onChange={onChange}
                />
            )}
        </Container>
    )
}

interface GroupHeaderProps {
    name: string
    isOpen: boolean
    toggle: () => void
}

const GroupHeader = ({ name, isOpen, toggle }: GroupHeaderProps) => {
    return (
        <HeaderContainer onClick={toggle}>
            <HeaderTitle isOpen={isOpen}>{name}</HeaderTitle>
            <HeaderIndicator isOpen={isOpen}>
                <FaChevronRight />
            </HeaderIndicator>
        </HeaderContainer>
    )
}

const Container = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.accentDarker};
    &:last-child {
        border-bottom-width: 0;
    }
`

const HeaderTitle = styled.span<{ isOpen: boolean }>`
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    color: white;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0.7)};
`

const HeaderIndicator = styled.span<{ isOpen: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    font-size: 12px;
    color: white;
    transform: ${({ isOpen }) => (isOpen ? `rotate(90deg)` : `rotate(0deg)`)};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0.6)};
`

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    padding: 0 16px 0 30px;
    background: ${({ theme }) => theme.colors.accent};
    background-image: linear-gradient(
        -90deg,
        ${({ theme }) => theme.colors.gradientColor0},
        ${({ theme }) => theme.colors.gradientColor1}
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: top left;
    cursor: pointer;
    user-select: none;

    &:hover {
        background: ${({ theme }) => theme.colors.gradientColor1};
        ${HeaderTitle} {
            opacity: 1;
        }
        ${HeaderIndicator} {
            opacity: 1;
        }
    }
`
