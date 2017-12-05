/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

export default class MiniNavLink extends Component {
    state = {
        isHover: false,
    }

    handleClick = e => {
        const { onClick } = this.props
        if (onClick) {
            e.preventDefault()
            onClick()
        }
    }

    handleMouseEnter = () => {
        this.setState({ isHover: true })
    }

    handleMouseLeave = () => {
        this.setState({ isHover: false })
    }

    render() {
        const { path, className, label, style, exact } = this.props
        const { isHover } = this.state

        return (
            <Route
                path={path}
                exact={!!exact}
                children={({ match }) => (
                    <Link
                        className={`mini-nav_item${match ? ' active' : ''}`}
                        to={path}
                        style={style}
                        onClick={this.handleClick}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                    >
                        <span className="mini-nav_item_feedback" />
                        <span
                            className={`mini-nav_icon sprite-icons-${className}-${
                                match || isHover ? 'red' : 'grey'
                            }`}
                        />
                        <span className="mini-nav_item_label">{label}</span>
                    </Link>
                )}
            />
        )
    }
}
