import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'

export default class SliderControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.node.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    render() {
        const { id, label, value, unit, onChange, help } = this.props

        return (
            <div className="chart-controls_item">
                <label className="control_label" htmlFor={id}>
                    {label}
                    :&nbsp;
                    <code className="code code-number">
                        {value}
                        {unit && <span className="unit">{unit}</span>}
                    </code>
                </label>
                <input
                    id={id}
                    type="range"
                    value={value}
                    onChange={onChange}
                    {...pick(this.props, ['min', 'max', 'step'])}
                />
                <div className="control-help">{help}</div>
            </div>
        )
    }
}
