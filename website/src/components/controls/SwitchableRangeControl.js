import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pick from 'lodash/pick'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'
import TextInput from './TextInput'
import Switch from './Switch'

const SwitchRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    & > *:first-child {
        margin-right: 9px;
    }
`

const RangeRow = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    align-items: center;
    max-width: 240px;
    margin-bottom: 5px;
`

export default class SwitchableRangeControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        property: PropTypes.object.isRequired,
        flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
        currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        options: PropTypes.shape({
            unit: PropTypes.string,
            defaultValue: PropTypes.number.isRequired,
            disabledValue: PropTypes.any.isRequired,
            min: PropTypes.number.isRequired,
            max: PropTypes.number.isRequired,
            step: PropTypes.number,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)

        const {
            value,
            options: { disabledValue, defaultValue },
        } = this.props
        this.state = {
            isSliderEnabled: value !== disabledValue,
            sliderValue: value === disabledValue ? defaultValue : value,
        }
    }

    handleSwitchUpdate = checked => {
        const {
            onChange,
            options: { disabledValue },
        } = this.props
        const { sliderValue } = this.state
        if (checked === false) {
            this.setState({ isSliderEnabled: true })
            onChange(Number(sliderValue))
        } else {
            this.setState({ isSliderEnabled: false })
            onChange(disabledValue)
        }
    }

    handleSliderUpdate = e => {
        const { onChange } = this.props
        this.setState({ sliderValue: Number(e.target.value) })
        onChange(Number(e.target.value))
    }

    render() {
        const {
            id,
            property,
            flavors,
            currentFlavor,
            options: { disabledValue, unit },
            value,
        } = this.props
        const { isSliderEnabled, sliderValue } = this.state

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader {...property} />
                <SwitchRow>
                    <Switch
                        id={`${id}.switch`}
                        value={!isSliderEnabled}
                        onChange={this.handleSwitchUpdate}
                    />
                    <span
                        style={{
                            color: isSliderEnabled ? '#bbbbbb' : 'inherit',
                        }}
                    >
                        {disabledValue}
                    </span>
                </SwitchRow>
                {isSliderEnabled && (
                    <RangeRow>
                        <TextInput value={value} unit={unit} isNumber={true} disabled={true} />
                        <input
                            id={`${id}.slider`}
                            type="range"
                            value={sliderValue}
                            onChange={this.handleSliderUpdate}
                            {...pick(this.props.options, ['min', 'max', 'step'])}
                        />
                    </RangeRow>
                )}
                <Help>{property.help}</Help>
            </Control>
        )
    }
}
