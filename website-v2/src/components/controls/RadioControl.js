/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import className from 'classnames'
import RadioIcon from './RadioIcon'

export default class RadioControl extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.node.isRequired,
        choices: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    render() {
        const { label, value, onChange, choices, help } = this.props

        const style = {
            gridTemplateColumns: range(choices.length)
                .map(() => '1fr')
                .join(' '),
        }

        return (
            <div className="Control">
                <div className="RadioControl">
                    <span className="control_label">{label}</span>
                    <div className="RadioControl_Choices" style={style}>
                        {choices.map(choice => {
                            if (choice.icon) {
                                return (
                                    <RadioIcon
                                        key={choice.value}
                                        icon={choice.icon}
                                        size={28}
                                        isSelected={value === choice.value}
                                    />
                                )
                            }

                            return (
                                <label
                                    className={className('control-radio-item', {
                                        '_is-active': value === choice.value,
                                    })}
                                    key={choice.value}
                                >
                                    <input
                                        type="radio"
                                        value={choice.value}
                                        checked={value === choice.value}
                                        onChange={onChange}
                                    />
                                    {choice.label}
                                </label>
                            )
                        })}
                    </div>
                </div>
                {/*<div className="control-help">{help}</div>*/}
            </div>
        )
    }
}
