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
import ChartControls from './ChartControls'

export default class ObjectControl extends PureComponent {
    static propTypes = {
        ns: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        help: PropTypes.node.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.object.isRequired,
        props: PropTypes.array.isRequired,
    }

    static defaultProps = {
        defaults: {},
    }

    state = {
        isOpened: true,
    }

    handleToggle = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        })
    }

    render() {
        const { ns, label, help, value, props, onChange } = this.props
        const { isOpened } = this.state

        return (
            <Fragment>
                <div
                    className={classNames('object-control_header', {
                        '_is-opened': isOpened,
                    })}
                    onClick={this.handleToggle}
                >
                    <div>
                        {label}
                        <div className="control-help">{help}</div>
                    </div>
                </div>
                {isOpened && (
                    <ChartControls
                        ns={ns}
                        name={label}
                        controls={props}
                        settings={value}
                        onChange={onChange}
                        isNested={true}
                    />
                )}
            </Fragment>
        )
    }
}
