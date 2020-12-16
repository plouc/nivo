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
