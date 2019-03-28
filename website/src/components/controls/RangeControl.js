import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pick from 'lodash/pick'
import Control from './Control'
import TextInput from './TextInput'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    max-width: 240px;
    margin-bottom: 5px;
`

export default class RangeControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        property: PropTypes.object.isRequired,
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.shape({
            unit: PropTypes.string,
            min: PropTypes.number.isRequired,
            max: PropTypes.number.isRequired,
            step: PropTypes.number,
        }).isRequired,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    handleChange = e => {
        this.props.onChange(Number(e.target.value))
    }

    render() {
        const { id, property, options, value } = this.props

        return (
            <Control description={property.description}>
                <PropertyHeader id={id} {...property} />
                <Row>
                    <TextInput
                        id={id}
                        value={value}
                        unit={options.unit}
                        isNumber={true}
                        onChange={this.handleChange}
                    />
                    <input
                        type="range"
                        value={value}
                        onChange={this.handleChange}
                        {...pick(options, ['min', 'max', 'step'])}
                    />
                </Row>
                <Help>{property.help}</Help>
            </Control>
        )
    }
}
