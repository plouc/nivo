/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const store = {}

exports.set = (key, value) => {
    store[key] = value
}

exports.get = key => {
    return store[key]
}

exports.dump = () => store
