import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'

const defaultValue = value => {
    if (isPlainObject(value)) {
        return `${JSON.stringify(value)}`
    } else if (isArray(value)) {
        const elements = value.reduce((acc, v, i) => {
            acc.push(React.cloneElement(defaultValue(v), { key: i }))
            if (i + 1 < value.length) {
                acc.push(<span key={`${i}.comma`}>, </span>)
            }
            return acc
        }, [])

        return <span>[{elements}]</span>
    } else if (isString(value)) {
        return <code className="code-string">'{value}'</code>
    } else if (isNumber(value)) {
        return <code className="code-number">{value}</code>
    } else if (isBoolean(value)) {
        return <code className="code-boolean">{value ? 'true' : 'false'}</code>
    } else if (isFunction(value)) {
        return `{${value.toString()}}`
    }

    return value
}

export default class ComponentPropsList extends PureComponent {
    static propTypes = {
        properties: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                type: PropTypes.string,
                required: PropTypes.bool,
                description: PropTypes.node.isRequired,
            })
        ).isRequired,
        compact: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        compact: false,
    }

    render() {
        const { properties, compact } = this.props

        return (
            <div>
                {properties.map(prop => {
                    const meta = (
                        <div className="component-properties__item__meta">
                            {prop.required ? (
                                <span className="component-properties__item__required">
                                    required
                                </span>
                            ) : (
                                <span className="component-properties__item__optional">
                                    optional
                                </span>
                            )}{' '}
                            | default:&nbsp;
                            {prop.default !== undefined ? defaultValue(prop.default) : '—'}
                        </div>
                    )

                    return (
                        <div
                            key={prop.key}
                            id={`prop-${prop.key}`}
                            className={`component-properties__item${
                                compact ? ' component-properties__item--compact' : ''
                            }`}
                        >
                            <div className="component-properties__item__header">
                                <span className="component-properties__item__key">
                                    {prop.key}
                                    {prop.required ? (
                                        <span className="component-properties__item__required-symbol">
                                            *
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </span>
                                {prop.type && <code>{prop.type}</code>}
                                {compact && meta}
                            </div>
                            {!compact && meta}
                            <div className="component-properties__item__body">
                                {prop.description}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
