import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'

export default class SwitchableSliderControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        disabledValue: PropTypes.any.isRequired,
        unit: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.node.isRequired,
        defaultValue: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number,
    }

    constructor(props) {
        super(props)

        const { value, disabledValue, defaultValue } = this.props
        this.state = {
            isSliderEnabled: value !== disabledValue,
            sliderValue: value === disabledValue ? defaultValue : value,
        }
    }

    handleSwitchUpdate = e => {
        const { onChange, disabledValue } = this.props
        const { sliderValue } = this.state
        if (e.target.checked === false) {
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
        const { id, disabledValue, label, value, unit, help } = this.props
        const { isSliderEnabled, sliderValue } = this.state

        return (
            <div className="chart-controls_item">
                <span className="control_label">
                    {label}
                    :&nbsp;
                    {isSliderEnabled && <code className="code code-number">{value}</code>}
                    {isSliderEnabled && unit && (
                        <span className="unit">
                            &nbsp;
                            {unit}
                        </span>
                    )}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', marginBottom: 7 }}>
                    <span className="control-switch">
                        <input
                            className="cmn-toggle"
                            id={`${id}.switch`}
                            type="checkbox"
                            checked={!isSliderEnabled}
                            onChange={this.handleSwitchUpdate}
                        />
                        <label htmlFor={`${id}.switch`} />
                    </span>
                    <span style={{ marginLeft: 7, color: isSliderEnabled ? '#bbb' : 'inherit' }}>
                        {disabledValue}
                    </span>
                </span>
                {isSliderEnabled && (
                    <input
                        id={`${id}.slider`}
                        type="range"
                        value={sliderValue}
                        onChange={this.handleSliderUpdate}
                        {...pick(this.props, ['min', 'max', 'step'])}
                    />
                )}
                <div className="control-help">{help}</div>
            </div>
        )
    }
}
