/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import RightIcon from 'react-icons/lib/md/keyboard-arrow-right'
import DownIcon from 'react-icons/lib/md/keyboard-arrow-down'
import PropertyDescription from './PropertyDescription'
import { Cell } from './styled'

const Container = styled(Cell)`
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }
`

const Toggle = styled.span`
    display: block;
    position: absolute;
    background: red;
    width: 20px;
    top: 0;
    bottom: 0;
    left: 0;
    padding-top: 11px;
    padding-left: 1px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.borderLight};
`

const Control = ({ description, children, id }) => {
    const [showDescription, setShowDescription] = useState(false)
    const toggle = useCallback(() => setShowDescription(flag => !flag), [setShowDescription])

    return (
        <Container id={id ? `${id}-prop` : ''}>
            {description !== undefined && (
                <Toggle onClick={toggle}>
                    {showDescription && <DownIcon size={18} />}
                    {!showDescription && <RightIcon size={18} />}
                </Toggle>
            )}
            {children}
            {showDescription && <PropertyDescription description={description} />}
        </Container>
    )
}

export default Control
