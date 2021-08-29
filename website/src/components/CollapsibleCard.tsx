import React, { useState, PropsWithChildren, useCallback } from 'react'
import styled from 'styled-components'
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md'
import { Card } from './styled'

export const CollapsibleCard = ({
    title,
    expandedByDefault = false,
    children,
}: PropsWithChildren<{ title: string; expandedByDefault?: boolean }>) => {
    const [expanded, setExpanded] = useState(expandedByDefault)
    const handleToggle = useCallback(() => {
        setExpanded(prev => !prev)
    }, [setExpanded])

    return (
        <Wrapper isExpanded={expanded}>
            <Header className="no-select" onClick={handleToggle}>
                <Title>{title}</Title>
                {expanded ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </Header>
            {expanded && <div className="card_body">{children}</div>}
        </Wrapper>
    )
}

const Wrapper = styled(Card)<{ isExpanded: boolean }>`
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
