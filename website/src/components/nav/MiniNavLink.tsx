import React, { memo, useCallback } from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'
import { ChartNavData } from '../../types'

export const MiniNavLink = memo(({ id }: ChartNavData) => {
    const theme = useTheme()
    const themeId = theme.id

    const getProps = useCallback(
        ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }) => ({
            children: (
                <Icon
                    className={`sprite-icons-${id}-${themeId}-${
                        isPartiallyCurrent ? 'colored' : 'neutral'
                    }`}
                />
            ),
        }),
        [id, themeId]
    )

    return <Item to={`/${id}/`} getProps={getProps} />
})

const Item = styled(Link)`
    display: block;
    cursor: pointer;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    height: ${({ theme }) => theme.dimensions.miniNavItemSize}px;
    position: relative;
    text-decoration: none;
`

const Icon = styled.span`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
    transform: scale(0.74);
    transform-origin: top left;
    z-index: 2;
    pointer-events: none;
`
