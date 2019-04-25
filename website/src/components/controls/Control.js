/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import intersection from 'lodash/intersection'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RightIcon from 'react-icons/lib/md/keyboard-arrow-right'
import DownIcon from 'react-icons/lib/md/keyboard-arrow-down'
import PropertyDescription from './PropertyDescription'
import PropertyFlavors from './PropertyFlavors'
import { Cell } from './styled'

const Control = ({ id, description, flavors, currentFlavor, supportedFlavors, children }) => {
    const [showDescription, setShowDescription] = useState(false)
    const toggle = useCallback(() => setShowDescription(flag => !flag), [setShowDescription])

    let isPropertySupported = true
    let showFlavors = false
    if (Array.isArray(supportedFlavors)) {
        if (intersection(flavors, supportedFlavors).length < flavors.length) {
            showFlavors = true
        }
        if (!supportedFlavors.includes(currentFlavor)) {
            isPropertySupported = false
        }
    }

    return (
        <Container id={id} isPropertySupported={isPropertySupported}>
            {description !== undefined && (
                <Toggle onClick={toggle}>
                    {showDescription && <DownIcon size={18} />}
                    {!showDescription && <RightIcon size={18} />}
                </Toggle>
            )}
            {children}
            {showFlavors && (
                <PropertyFlavors flavors={flavors} supportedFlavors={supportedFlavors} />
            )}
            {showDescription && <PropertyDescription description={description} />}
        </Container>
    )
}

Control.propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.node,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    supportedFlavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])),
}

export default Control

const Container = styled(Cell)`
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    // opacity: ${({ isPropertySupported }) => (isPropertySupported ? 1 : 0.5)};

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
