import { useState, useCallback, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import { Description } from './Description'

interface ControlProps {
    id: string
    isSingleRow: boolean
    description?: string
}

export const ControlContainer = ({
    id,
    isSingleRow,
    description,
    children,
}: PropsWithChildren<ControlProps>) => {
    const [showDescription, setShowDescription] = useState(false)
    const toggle = useCallback(() => setShowDescription(flag => !flag), [setShowDescription])

    return (
        <Container id={id} $isSingleRow={isSingleRow}>
            {description !== undefined && (
                <Toggle onClick={toggle}>
                    {showDescription && <MdKeyboardArrowDown size={18} />}
                    {!showDescription && <MdKeyboardArrowRight size={18} />}
                </Toggle>
            )}
            {children}
            {/*showFlavors && (
                <PropertyFlavors flavors={flavors} supportedFlavors={supportedFlavors!} />
            )*/}
            {description && showDescription && <Description description={description} />}
        </Container>
    )
}

const Container = styled.div<{
    $isSingleRow: boolean
}>`
    display: flex;
    flex-direction: ${({ $isSingleRow }) => ($isSingleRow ? 'row' : 'column')};
    justify-content: ${({ $isSingleRow }) => ($isSingleRow ? 'space-between' : 'flex-start')};
    align-items: ${({ $isSingleRow }) => ($isSingleRow ? 'center' : 'stretch')};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    padding: ${({ theme }) => theme.spacing.controlPaddingY}px
        ${({ theme }) => theme.spacing.controlPaddingX}px;

    &:last-child {
        border-bottom-width: 0;
    }

    & * {
        box-sizing: border-box;
    }
`

const Toggle = styled.span`
    user-select: none;
    display: block;
    position: absolute;
    width: 20px;
    top: 0;
    bottom: 0;
    left: 0;
    padding-top: 11px;
    padding-left: 1px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.borderLight};
`
