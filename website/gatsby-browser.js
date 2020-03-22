/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PageWrapper from './src/components/PageWrapper'

export const wrapPageElement = ({ element }) => {
    return (
        <PageWrapper>
            {element}
        </PageWrapper>
    )
}

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm([
        `The documentation has been updated,`,
        `would you like to reload to display the latest version?`
    ].join(''))
  
    if (answer === true) window.location.reload()
}

const anchorScroll = (location) => {
    // Check for location so build does not fail
    if (location && location.hash) {
        setTimeout(() => {
            const item = document.querySelector(`${location.hash}`)
            if (item) {
                const mainNav = document.querySelector(`header`)
                window.scrollTo({
                    top: item.offsetTop - (mainNav ? mainNav.offsetHeight : 0),
                    left: 0,
                    behavior: 'auto'
                })
            }
        }, 0)
    }
}

export const onRouteUpdate = ({location}) => {
    anchorScroll(location);
    return true
}

export const shouldUpdateScroll = ({
  routerProps: { location }
}) => {
    anchorScroll(location)
    return true
}
