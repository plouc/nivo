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

class ColorPickerControl extends Component {
    handleChange = e => {
        this.props.onChange(e.target.value)
    }

    render() {
        const { value, label, help } = this.props

        return (
            <div className="control control-color">
                <label className="control_label">
                    {label}: <code className="code code-string">'{value}'</code>
                </label>
                <div>
                    <input type="color" onChange={this.handleChange} value={value} />
                </div>
                <div className="control-help">{help}</div>
            </div>
        )
    }
}

ColorPickerControl.propTypes = {
    label: PropTypes.string.isRequired,
    help: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

ColorPickerControl.defaultProps = {
    label: 'color',
    help: 'Color.',
}

export default ColorPickerControl
