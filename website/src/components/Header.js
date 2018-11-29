import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GitHubIcon from 'react-icons/lib/fa/github'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import { miscItems } from '../SiteMap'

export default class Header extends Component {
    static propTypes = {
        onNavToggle: PropTypes.func.isRequired,
    }

    render() {
        const { onNavToggle } = this.props

        return (
            <header>
                <span className="nav_toggle" onClick={onNavToggle} />
                <Link className="brand" to="/" />
                <nav className="HeaderNav">
                    {miscItems.map(item => {
                        if (item.children && item.children.length > 0) {
                            return (
                                <span className="HeaderNav__Item" key={item.className}>
                                    {item.label}
                                    <span className="HeaderNav__Item__Sub">
                                        {item.children.map(child => (
                                            <Link
                                                className="HeaderNav__Item__Sub__Item"
                                                key={child.className}
                                                to={child.path}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </span>
                                </span>
                            )
                        }

                        return (
                            <Link
                                className={`HeaderNav__Item HeaderNav__Item--${item.className}`}
                                key={item.className}
                                to={item.path}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                    <a
                        className="HeaderNav__Item HeaderNav__Item--storybook"
                        href="https://nivo.rocks/storybook/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        storybook
                    </a>
                    <a
                        className="HeaderNav__Item"
                        href="https://github.com/plouc/nivo"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <GitHubIcon />
                    </a>
                    <a
                        className="HeaderNav__Item"
                        href="https://twitter.com/benitteraphael"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Twitter"
                    >
                        <TwitterIcon />
                    </a>
                </nav>
            </header>
        )
    }
}
