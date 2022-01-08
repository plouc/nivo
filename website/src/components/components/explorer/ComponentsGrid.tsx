import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ComponentsGridItem } from './ComponentsGridItem'
import * as nav from '../../../data/nav'
import media from '../../../theming/mediaQueries'
import { ChartNavData } from '../../../types'

type FilterFunction = (item: ChartNavData) => boolean

const getFilterFunction = (term?: string | null, filter?: string | null): FilterFunction => {
    let predicates: FilterFunction[] = []
    if (term && term.length > 0) {
        predicates.push(({ name }) => name.toLowerCase().includes(term.toLowerCase()))
    }
    if (filter) {
        predicates.push(({ flavors }) => flavors[filter.toLowerCase()] === true)
    }

    return item => predicates.every(predicate => predicate(item))
}

interface ComponentsGridProps {
    filter?: string | null
    term?: string | null
}

export const ComponentsGrid = ({ filter, term }: ComponentsGridProps) => {
    let items = nav.components

    if (term || filter) {
        const filterFunction = getFilterFunction(term, filter)
        items = items.filter(filterFunction)
    }

    if (items.length === 0) {
        return (
            <Empty>
                <EmptyIcon>{`¯\\_(ツ)_/¯`}</EmptyIcon>
                <div>no result, sorry…</div>
            </Empty>
        )
    }

    return (
        <Grid>
            {items.map(item => (
                <ComponentsGridItem key={item.id} {...item} />
            ))}
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-row-gap: 15px;
    margin-bottom: 30px;

    ${media.desktopLarge`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 30px;
        }
    `}

    ${media.desktop`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 20px;
        }
    `}

    ${media.tablet`
        & {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-column-gap: 20px;
        }
    `}

    ${media.mobile`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 0;
            box-shadow: ${({ theme }) => theme.cardShadow};
        }
    `}
`

const Empty = styled.div`
    margin-top: 120px;
    text-align: center;
`

const EmptyIcon = styled.span`
    font-size: 64px;
    display: block;
    margin-bottom: 50px;
    white-space: pre;
    color: ${({ theme }) => theme.colors.accent};
`
