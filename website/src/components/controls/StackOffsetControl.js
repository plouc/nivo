import React, { Component } from 'react'
import PropTypes from 'prop-types'

const offsets = ['zero', 'wiggle', 'silhouette', 'expand']

class StackOffsetControl extends Component {
    constructor(props) {
        super(props)

        this.handleOffsetChange = this.handleOffsetChange.bind(this)
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    handleOffsetChange(e) {
        const { onChange } = this.props
        onChange(e.target.value)
    }

    render() {
        const { value } = this.props

        return (
            <div className="control control-stack-offset">
                <label>
                    offset: <code className="code code-string">"{value}"</code>
                </label>
                <div className="control-help">Stacking offset type.</div>
                <div>
                    <select value={value} onChange={this.handleOffsetChange}>
                        {offsets.map(offset => (
                            <option key={offset} value={offset}>
                                {offset}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

const { func, oneOf } = PropTypes

StackOffsetControl.propTypes = {
    onChange: func.isRequired,
    value: oneOf(offsets).isRequired,
}

export default StackOffsetControl
