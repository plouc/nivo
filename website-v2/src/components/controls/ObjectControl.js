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
import styled from 'styled-components'
import ControlsGroup from './ControlsGroup'

const Header = styled.div`
    padding: 5px 12px 7px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.accent};
    user-select: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    opacity: ${({ isOpened }) => (isOpened ? 1 : 0.6)};

    &:hover {
    }

    p {
        margin: 0;
    }
`

export default class ObjectControl extends PureComponent {
    static propTypes = {
        component: PropTypes.string.isRequired,
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
        const { component, label, help, value, props, onChange } = this.props
        const { isOpened } = this.state

        return (
            <Fragment>
                <Header isOpened={isOpened} onClick={this.handleToggle}>
                    <div>
                        {label}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: help,
                            }}
                            className="control-help"
                        />
                    </div>
                </Header>
                {isOpened && (
                    <ControlsGroup
                        component={component}
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
