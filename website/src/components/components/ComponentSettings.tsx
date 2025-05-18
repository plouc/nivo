import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { RiCollapseDiagonalLine, RiExpandDiagonalLine } from 'react-icons/ri'
import { Flavor, ChartPropertiesGroup } from '../../types'
import { ComponentSettingsGroup } from './ComponentSettingsGroup'
import { PageProps } from 'gatsby'

interface ComponentSettingsProps<Settings = any> {
    flavors: Flavor[]
    currentFlavor: Flavor
    settings: Settings
    onChange: (settings: Settings) => void
    groups: ChartPropertiesGroup[]
    location?: PageProps['location']
}

const EXACT_SEARCH_PREFIX = '='

export function ComponentSettings<Settings = any>({
    flavors,
    currentFlavor,
    settings,
    onChange,
    groups,
    location,
}: ComponentSettingsProps<Settings>) {
    const [searchTerm, setSearchTerm] = React.useState(() => {
        const params = new URLSearchParams(location?.search)
        return params.get('q') || ''
    })
    const isSearching = searchTerm !== '' && searchTerm !== EXACT_SEARCH_PREFIX
    const isExactSearch = searchTerm.startsWith(EXACT_SEARCH_PREFIX)

    const handleSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value)
        },
        [setSearchTerm]
    )

    const clearSearch = useCallback(() => {
        setSearchTerm('')
    }, [setSearchTerm])

    const [openedGroups, setOpenedGroups] = React.useState<string[]>([])

    const toggleGroup = useCallback(
        (groupName: string) => {
            setOpenedGroups(current => {
                if (current.includes(groupName)) {
                    return current.filter(name => name !== groupName)
                } else {
                    return [...current, groupName]
                }
            })
        },
        [setOpenedGroups]
    )

    const collapseAll = useCallback(() => {
        setOpenedGroups([])
    }, [setOpenedGroups])

    const expandAll = useCallback(() => {
        setOpenedGroups(groups.map(group => group.name))
    }, [setOpenedGroups, groups])

    const filteredGroups = useMemo(() => {
        if (!isSearching) return groups

        return groups
            .map(group => {
                return {
                    ...group,
                    properties: group.properties.filter(property => {
                        const propName = (property.name || property.key).toLowerCase()

                        if (isExactSearch) {
                            return propName === searchTerm.substring(1).toLowerCase()
                        }

                        return propName.includes(searchTerm.toLowerCase())
                    }),
                }
            })
            .filter(group => group.properties.length > 0)
    }, [groups, isSearching, isExactSearch, searchTerm])

    return (
        <Container>
            <SearchContainer $isSearching={isSearching}>
                <SearchInputContainer $isSearching={isSearching}>
                    <SearchInput
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search properties..."
                    />
                    <SearchIcon>
                        <FaSearch />
                    </SearchIcon>
                    {isSearching && (
                        <SearchClearButton onClick={clearSearch}>
                            <FaTimes />
                        </SearchClearButton>
                    )}
                </SearchInputContainer>
                {!isSearching && (
                    <>
                        <ExpandAllButton onClick={expandAll}>
                            <RiExpandDiagonalLine />
                        </ExpandAllButton>
                        <CollapseAllButton onClick={collapseAll}>
                            <RiCollapseDiagonalLine />
                        </CollapseAllButton>
                    </>
                )}
            </SearchContainer>
            {isSearching && filteredGroups.length === 0 && (
                <EmptySearchResults>
                    No properties found for <strong>{searchTerm}</strong>.
                </EmptySearchResults>
            )}
            {filteredGroups.map(group => {
                return (
                    <ComponentSettingsGroup<Settings>
                        key={group.name}
                        group={group}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        settings={settings}
                        onChange={onChange}
                        isOpen={isSearching || openedGroups.includes(group.name)}
                        toggle={toggleGroup}
                        searchTerm={searchTerm}
                    />
                )
            })}
        </Container>
    )
}

const Container = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.text};
`

const SearchContainer = styled.div<{ $isSearching: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.colors.cardBackground};
    padding: 8px ${({ $isSearching }) => ($isSearching ? 30 : 16)}px 8px 30px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const SearchInputContainer = styled.div<{ $isSearching: boolean }>`
    flex: 1;
    position: relative;
    margin-right: ${({ $isSearching }) => ($isSearching ? 0 : 12)}px;
`

const SearchIcon = styled.span`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    aspect-ratio: 1/1;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.7;

    input:focus + & {
        opacity: 1;
    }
`

const SearchInput = styled.input`
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    background: ${({ theme }) => theme.colors.background};
    padding: 0 36px 0 36px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 3px;
    color: inherit;
    cursor: pointer;
    &:focus {
        outline: 0;
        cursor: auto;
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.text};
        box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.accent};
    }
`

const SearchClearButton = styled.span`
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    height: 100%;
    aspect-ratio: 1/1;
    cursor: pointer;
    opacity: 0.3;

    &:hover {
        opacity: 1;
    }
`

const EmptySearchResults = styled.div`
    padding: 16px 30px;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 14px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    strong {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.text};
    }
`

const ExpandAllButton = styled.span`
    width: 36px;
    height: 36px;
    display: flex;
    font-size: 26px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;
    color: ${({ theme }) => theme.colors.textLight};
    opacity: 0.7;

    &:hover {
        opacity: 1;
        color: ${({ theme }) => theme.colors.accent};
    }
`

const CollapseAllButton = styled(ExpandAllButton)`
    border-radius: 0 2px 2px 0;
    border-left-width: 0;
`
