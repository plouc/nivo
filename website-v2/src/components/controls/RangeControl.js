import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import Label from './Label'
import TextInput from './TextInput'

export default class RangeControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.string.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    handleChange = e => {
        this.props.onChange(Number(e.target.value))
    }

    render() {
        const { id, label, value, unit, help } = this.props

        // /*unit && <span className="unit">{unit}</span>*/

        return (
            <div className="Control">
                <div className="RangeControl">
                    <Label className="control_label" htmlFor={id}>
                        {label}
                    </Label>
                    <div className="RangeControl_Input">
                        <TextInput id={id} value={value} onChange={this.handleChange} />
                        {unit && <span className="RangeControl_Unit">{unit}</span>}
                    </div>
                    <input
                        type="range"
                        value={value}
                        onChange={this.handleChange}
                        {...pick(this.props, ['min', 'max', 'step'])}
                    />
                </div>
                {/*<div className="control-help">{help}</div>*/}
            </div>
        )
    }
}
