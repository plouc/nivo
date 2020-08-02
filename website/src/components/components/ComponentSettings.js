/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ControlsGroup from '../controls/ControlsGroup'
import media from '../../theming/mediaQueries'

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

const ComponentSettings = ({ component, flavors, currentFlavor, settings, onChange, groups }) => {
    return (
        <Container>
            {groups.map(group => {
                return (
                    <Group key={group.name}>
                        <Title>{group.name}</Title>
                        <ControlsGroup
                            component={component}
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

ComponentSettings.propTypes = {
    component: PropTypes.string.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
}

export default ComponentSettings
