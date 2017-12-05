/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getSectionItems } from '../../../SiteMap'

const extras = getSectionItems('extras')

export default class MobileNavExtras extends Component {
    static propTypes = {
        close: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div>
                <div className="mobile-nav__title">Extras</div>
                {extras.map(extra => {
                    return <div key={extra.className}>{extra.label}</div>
                })}
            </div>
        )
    }
}
