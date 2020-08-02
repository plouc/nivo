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

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Name = styled.span`
    font-weight: 500;
    font-size: 0.8rem;
    margin-right: 14px;
    width: 130px;
`

const Sample = styled.div`
    display: block;
    width: 12px;
    height: 12px;
`

const ColorsControlItem = ({ id, colors }) => {
    return (
        <Container>
            <Name>{id}</Name>
            {colors.map(color => (
                <Sample key={color} style={{ background: color }} />
            ))}
        </Container>
    )
}

ColorsControlItem.propTypes = {
    id: PropTypes.string.isRequired,
    colors: PropTypes.array.isRequired,
}

export default ColorsControlItem
