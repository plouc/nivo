/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import media from '../../../theming/mediaQueries'
import PageContent from '../../PageContent'
import URLSearchParams from 'url-search-params'
import ComponentsSearch from './ComponentsSearch'
import ComponentsFilters from './ComponentsFilters'
import ComponentsGrid from './ComponentsGrid'

const ComponentsExplorer = ({ location, navigate }) => {
    const [term, filter] = useMemo(() => {
        const params = new URLSearchParams(location.search)
        return [params.get('q'), params.get('filter')]
    }, [location.search])
    const handleSearch = useCallback(
        term => {
            const params = new URLSearchParams()
            if (term) params.append('q', term)
            if (filter) params.append('filter', filter)

            navigate(`/components?${params.toString()}`, {
                replace: true,
            })
        },
        [filter, navigate]
    )
    const handleFilter = useCallback(
        filter => {
            const params = new URLSearchParams()
            if (term) params.append('q', term)
            if (filter) params.append('filter', filter)

            navigate(`/components?${params.toString()}`)
        },
        [term, navigate]
    )

    return (
        <PageContent>
            <Helmet title="Components" />
            <Header>
                <h1>Components</h1>
            </Header>
            <SearchAndFilters>
                <ComponentsSearch term={term || ''} onChange={handleSearch} />
                <ComponentsFilters onChange={handleFilter} filter={filter} />
            </SearchAndFilters>
            <ComponentsGrid term={term} filter={filter} />
        </PageContent>
    )
}

ComponentsExplorer.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
}

const Header = styled.div`
    height: 130px;
    color: white;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
`

const SearchAndFilters = styled.div`
    display: grid;
    align-items: center;
    margin-bottom: 30px;
    grid-template-columns: 1fr 2fr;

    ${media.desktopLarge`
        & {
            grid-column-gap: 30px;
        }
    `}

    ${media.desktop`
        & {
            grid-column-gap: 20px;
        }
    `}

    ${media.tablet`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 15px;
        }
    `}

    ${media.mobile`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 15px;
        }
    `}
`

export default ComponentsExplorer
