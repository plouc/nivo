/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ClosedIcon from 'react-icons/lib/fa/caret-right'
import OpenedIcon from 'react-icons/lib/fa/caret-down'
import ChartControls from './ChartControls'

export default class ArrayControl extends PureComponent {
    static propTypes = {
        ns: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        help: PropTypes.node.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.array.isRequired,
        props: PropTypes.array.isRequired,
        shouldCreate: PropTypes.bool.isRequired,
        addLabel: PropTypes.string.isRequired,
        shouldRemove: PropTypes.bool.isRequired,
        removeLabel: PropTypes.string.isRequired,
        defaults: PropTypes.object.isRequired,
        getItemTitle: PropTypes.func,
    }

    static defaultProps = {
        shouldCreate: false,
        addLabel: 'add',
        shouldRemove: false,
        removeLabel: 'remove',
        defaults: {},
    }

    constructor(props) {
        super(props)

        this.state = {
            activeItems: [0],
        }
    }

    handleAppend = () => {
        const { value, defaults, onChange } = this.props
        onChange([...value, { ...defaults }])
        this.setState({ activeItems: [value.length] })
    }

    handleRemove = index => event => {
        event.stopPropagation()
        const { value, onChange } = this.props
        const items = value.filter((v, i) => i !== index)
        this.setState({ activeItems: [] })
        onChange(items)
    }

    handleChange = index => itemValue => {
        const { value, onChange } = this.props
        onChange(
            value.map((v, i) => {
                if (i === index) return itemValue
                return v
            })
        )
    }

    handleItemToggle = index => () => {
        const { activeItems } = this.state
        if (activeItems.includes(index)) {
            this.setState({
                activeItems: activeItems.filter(i => i !== index),
            })
        } else {
            this.setState({
                activeItems: [...activeItems, index],
            })
        }
    }

    render() {
        const {
            ns,
            label,
            help,
            value,
            props,
            shouldCreate,
            addLabel,
            shouldRemove,
            removeLabel,
            getItemTitle,
        } = this.props
        const { activeItems } = this.state

        return (
            <Fragment>
                <div className="chart-controls_header">
                    <div>
                        {label} ({value.length})<div className="control-help">{help}</div>
                    </div>
                    {shouldCreate && (
                        <span className="button" onClick={this.handleAppend}>
                            {addLabel}
                        </span>
                    )}
                </div>
                {value.map((item, index) => (
                    <Fragment key={index}>
                        <div
                            className={classNames('chart-controls_sub-header', {
                                '_is-active': activeItems.includes(index),
                            })}
                            onClick={this.handleItemToggle(index)}
                        >
                            <span>
                                {activeItems.includes(index) && <OpenedIcon />}
                                {!activeItems.includes(index) && <ClosedIcon />}{' '}
                                {getItemTitle !== undefined
                                    ? getItemTitle(index, item)
                                    : `${label}[${index}]`}
                            </span>
                            {shouldRemove && (
                                <span
                                    className="button button--small"
                                    onClick={this.handleRemove(index)}
                                >
                                    {removeLabel}
                                </span>
                            )}
                        </div>
                        {activeItems.includes(index) && (
                            <ChartControls
                                ns={ns}
                                name={label}
                                controls={props}
                                settings={item}
                                onChange={this.handleChange(index)}
                                isNested={true}
                            />
                        )}
                    </Fragment>
                ))}
            </Fragment>
        )
    }
}
