/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import ComponentsIcon from 'react-icons/lib/md/widgets'
import GuidesIcon from 'react-icons/lib/md/book'
import GitHubIcon from 'react-icons/lib/fa/github'
import ExtrasIcon from 'react-icons/lib/md/more-vert'
import MobileNavComponents from './MobileNavComponents'
import MobileNavGuides from './MobileNavGuides'
import MobileNavExtras from './MobileNavExtras'

export default class MobileNav extends Component {
    state = {
        currentTab: 'components',
    }

    setCurrentTab = tab => {
        if (this.state.currentTab === tab) {
            this.setState({ currentTab: null })
        } else {
            this.setState({ currentTab: tab })
        }
    }

    close = () => {
        this.setState({ currentTab: null })
    }

    render() {
        const { currentTab } = this.state

        return (
            <div className="mobile-nav">
                <div className="mobile-tabs__menu">
                    <div
                        className="mobile-tabs__menu__item"
                        onClick={() => this.setCurrentTab('components')}
                    >
                        <span className="mobile-tabs__menu__item__icon">
                            <ComponentsIcon />
                        </span>
                        <span className="mobile-tabs__menu__item__label">components</span>
                    </div>
                    <div
                        className="mobile-tabs__menu__item"
                        onClick={() => this.setCurrentTab('guides')}
                    >
                        <span className="mobile-tabs__menu__item__icon">
                            <GuidesIcon />
                        </span>
                        <span className="mobile-tabs__menu__item__label">Guides</span>
                    </div>
                    <a
                        className="mobile-tabs__menu__item"
                        href="https://github.com/plouc/nivo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="mobile-tabs__menu__item__icon">
                            <GitHubIcon />
                        </span>
                        <span className="mobile-tabs__menu__item__label">GitHub</span>
                    </a>
                    <div
                        className="mobile-tabs__menu__item"
                        onClick={() => this.setCurrentTab('extras')}
                    >
                        <span className="mobile-tabs__menu__item__icon">
                            <ExtrasIcon />
                        </span>
                        <span className="mobile-tabs__menu__item__label">Extras</span>
                    </div>
                </div>
                {currentTab !== null && (
                    <div className="mobile-nav__content">
                        {currentTab === 'components' && <MobileNavComponents close={this.close} />}
                        {currentTab === 'guides' && <MobileNavGuides close={this.close} />}
                        {currentTab === 'extras' && <MobileNavExtras close={this.close} />}
                    </div>
                )}
            </div>
        )
    }
}
