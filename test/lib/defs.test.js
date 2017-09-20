/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import partial from 'lodash/partial'
import { isMatchingDef } from '../../src/lib/defs'

describe('isMatchingDef()', () => {
    it('should support wildcard', () => {
        const matcher = partial(isMatchingDef, '*')

        expect(matcher()).toBe(true)
        expect(matcher(null)).toBe(true)
        expect(matcher({})).toBe(true)
    })

    it('should support predicate function', () => {
        const matcher = partial(isMatchingDef, node => node.id === 'test')

        expect(matcher({})).toBe(false)
        expect(matcher({ id: 'other' })).toBe(false)
        expect(matcher({ id: 'test' })).toBe(true)
    })

    describe('using query object', () => {
        it('should allow to check multiple fields at once', () => {
            const matcher = partial(isMatchingDef, { id: 'test', isFake: true })

            expect(matcher({})).toBe(false)
            expect(matcher({ id: 'other', isFake: true })).toBe(false)
            expect(matcher({ id: 'test', isFake: true })).toBe(true)
        })

        it('should allow to use customize path to access node data', () => {
            const matcher = partial(isMatchingDef, { id: 'test' })

            expect(matcher({}, 'custom')).toBe(false)
            expect(matcher({ id: 'test' }, 'custom')).toBe(false)
            expect(matcher({ custom: { id: 'other' } }, 'custom')).toBe(false)
            expect(matcher({ custom: { id: 'test' } }, 'custom')).toBe(true)
        })
    })

    it('should return false otherwise', () => {
        expect(isMatchingDef()).toBe(false)
        expect(isMatchingDef(2)).toBe(false)
    })
})
