import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SwitchControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.node.isRequired,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    render() {
        const { id, label, value, onChange, help } = this.props

        return (
            <div className="Control">
                <div className="SwitchControl no-select">
                    <label className="control_label" htmlFor={id}>
                        {label}
                    </label>
                    <span className="control-switch">
                        <input
                            className="cmn-toggle"
                            id={id}
                            type="checkbox"
                            checked={value}
                            onChange={onChange}
                        />
                        <label htmlFor={id} />
                    </span>
                </div>
                {/*<div className="control-help">{help}</div>*/}
            </div>
        )
    }
}
