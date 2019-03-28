/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dedent from 'dedent-js'
import Markdown from '../Markdown'

const Description = styled.div`
    grid-column-start: 2;
    font-size: 0.8rem;
    margin-top: 12px;

    p {
        margin: 7px 0;
    }
`

const PropertyDescription = ({ description }) => {
    return (
        <Description>
            <Markdown source={dedent(description)} />
        </Description>
    )
}

PropertyDescription.propTypes = {
    description: PropTypes.string.isRequired,
}

export default PropertyDescription
