import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const positions = ['center', 'top', 'right', 'bottom', 'left']

class LabelPositionControl extends Component {
    constructor(props) {
        super(props)

        this.handlePositionChange = this.handlePositionChange.bind(this)
    }

    handlePositionChange(e) {
        const { onChange } = this.props
        onChange(e.target.value === '' ? null : e.target.value)
    }

    render() {
        const { value, onChange } = this.props

        return (
            <div className="control control-label-position">
                <span className="control-label-position_illustration">
                    {positions.map(position => (
                        <span
                            key={position}
                            onClick={() => onChange(position)}
                            className={classNames(
                                `control-label-position_item control-label-position_item-${position}`,
                                {
                                    '_is-current': position === value,
                                }
                            )}
                        />
                    ))}
                </span>
                <select value={value === null ? '' : value} onChange={this.handlePositionChange}>
                    <option value="">auto</option>
                    {positions.map(position => (
                        <option key={position} value={position}>
                            {position}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

const { func, oneOf } = PropTypes

LabelPositionControl.propTypes = {
    onChange: func.isRequired,
    value: oneOf(positions),
}

LabelPositionControl.defaultProps = {}

export default LabelPositionControl
