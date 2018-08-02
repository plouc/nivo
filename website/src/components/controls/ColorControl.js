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
import Select from 'react-select'
import { mapInheritedColor } from '../../lib/settings'

const hasGammaModifier = type => ['inherit:darker', 'inherit:brighter'].includes(type)

class ColorControl extends Component {
    constructor(props) {
        super(props)

        this.state = {
            color: props.value.color || props.defaultCustomColor,
            gamma: props.value.gamma !== undefined ? props.value.gamma : props.defaultGammaValue,
        }
    }

    handleTypeChange = ({ value: type }) => {
        const { onChange } = this.props
        if (type === 'custom') {
            onChange({ type, color: this.state.color })
        } else if (hasGammaModifier(type)) {
            onChange({ type, gamma: this.state.gamma })
        } else {
            onChange({ type })
        }
    }

    handleCustomColorChange = e => {
        const color = e.target.value

        this.setState({ color })
        this.props.onChange({ type: 'custom', color })
    }

    handleGammaChange = e => {
        const {
            onChange,
            value: { type },
        } = this.props
        const gamma = e.target.value

        this.setState({ gamma })
        onChange({ type, gamma })
    }

    render() {
        const {
            value: { type, ...config },
            label,
            help,
            withTheme,
            withCustomColor,
        } = this.props
        const { gamma, color } = this.state

        const options = [
            { value: 'inherit', label: 'inherit' },
            { value: 'inherit:darker', label: 'inherit:darker' },
            { value: 'inherit:brighter', label: 'inherit:brighter' },
        ]

        if (withTheme) options.unshift({ value: 'theme', label: 'theme' })
        if (withCustomColor) options.unshift({ value: 'custom', label: 'custom' })

        return (
            <div className="control control-color">
                <label className="control_label">
                    {label}:{' '}
                    <code className="code code-string">
                        '{mapInheritedColor({ type, ...config })}'
                    </code>
                </label>
                <div>
                    <Select
                        options={options}
                        onChange={this.handleTypeChange}
                        value={type}
                        clearable={false}
                    />
                </div>
                {type === 'custom' && (
                    <div>
                        <div className="control-help">Color</div>
                        <input type="color" onChange={this.handleCustomColorChange} value={color} />
                    </div>
                )}
                {hasGammaModifier(type) && (
                    <div>
                        <div className="control-help">Adjust gamma.</div>
                        <input
                            ref="gamma"
                            type="range"
                            min="0"
                            max="4"
                            step="0.1"
                            value={gamma}
                            onChange={this.handleGammaChange}
                        />
                    </div>
                )}
                <div className="control-help">{help}</div>
            </div>
        )
    }
}

ColorControl.propTypes = {
    label: PropTypes.string.isRequired,
    help: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultGammaValue: PropTypes.number.isRequired,
    withTheme: PropTypes.bool.isRequired,
    withCustomColor: PropTypes.bool.isRequired,
    defaultCustomColor: PropTypes.string.isRequired,
    value: PropTypes.shape({
        type: PropTypes.oneOf(['inherit', 'inherit:darker', 'inherit:brighter', 'theme', 'custom'])
            .isRequired,
    }).isRequired,
}

ColorControl.defaultProps = {
    label: 'color',
    help: 'Color directive.',
    defaultGammaValue: 1.2,
    withTheme: false,
    withCustomColor: false,
    defaultCustomColor: '#000000',
}

export default ColorControl
