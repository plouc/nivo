/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { interpolateColor, getInterpolatedColor } from '../src'

describe('interpolateColor()', () => {
    it('should return decomposed color', () => {
        expect(interpolateColor('#F00')).toEqual({
            colorR: 255,
            colorG: 0,
            colorB: 0,
        })
    })

    it('should return decomposed color with corresponding spring if config provided', () => {
        expect(interpolateColor('#F0F', { stifness: 120, damping: 15 })).toEqual({
            colorR: {
                damping: 15,
                precision: 1,
                stiffness: 170,
                stifness: 120,
                val: 255,
            },
            colorG: {
                damping: 15,
                precision: 1,
                stiffness: 170,
                stifness: 120,
                val: 0,
            },
            colorB: {
                damping: 15,
                precision: 1,
                stiffness: 170,
                stifness: 120,
                val: 255,
            },
        })
    })
})

describe('getInterpolatedColor()', () => {
    it('should return corresponding color string', () => {
        expect(
            getInterpolatedColor({
                colorR: 255,
                colorG: 0,
                colorB: 122,
            })
        ).toBe('rgb(255,0,122)')
    })
})
