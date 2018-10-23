import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const customStyles = {
    option: (base, state) => ({
        ...base,
    }),
    control: base => ({
        ...base,
        height: 28,
        minHeight: 28,
        borderRadius: 2,
    }),
    menu: base => ({
        ...base,
        zIndex: 2,
    }),
}

export default class ChoicesControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.node.isRequired,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    render() {
        const { id, label, value: _value, choices, onChange, help } = this.props

        const value = choices.find(({ value: v }) => v === _value)

        return (
            <div className="Control">
                <div className="ChoicesControl">
                    <label className="control_label" htmlFor={id}>
                        {label}
                    </label>
                    <Select
                        styles={customStyles}
                        options={choices}
                        value={value}
                        clearable={false}
                        onChange={onChange}
                    />
                </div>
                {/*
                <Select
                    id={id}
                    name={id}
                    value={get(settings, config.name)}
                    options={config.choices}
                    clearable={false}
                    onChange={this.handleSelectUpdate(config.name)}
                    {...omit(config, ['name', 'help', 'type', 'choices'])}
                />
                */}
                {/*<div className="control-help">{config.help}</div>*/}
            </div>
        )
    }
}
