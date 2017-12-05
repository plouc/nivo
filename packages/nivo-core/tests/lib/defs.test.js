/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import partial from 'lodash/partial'
import { isMatchingDef, bindDefs } from '../../src/lib/defs'

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

describe('bindDefs()', () => {
    it('should return an empty array if def list is empty', () => {
        expect(bindDefs([], [{}], [{}])).toEqual([])
    })

    it('should return an empty array if node list is empty', () => {
        expect(bindDefs([{}], [], [{}])).toEqual([])
    })

    it('should return input defs if rule list is empty', () => {
        const defs = [{ type: 'whatever' }]
        expect(bindDefs(defs, [{}], [])).toEqual(defs)
    })

    it('should ignore subsequent rules if some already matched', () => {
        const defs = [
            { id: 'gradient', type: 'linearGradient', colors: [] },
            { id: 'pattern', type: 'patternLines' },
        ]
        const nodes = [{ id: 'test' }]
        expect(
            bindDefs(defs, nodes, [
                { match: { id: 'test' }, id: 'gradient' },
                { match: '*', id: 'pattern' },
            ])
        ).toEqual(defs)
        expect(nodes).toEqual([{ id: 'test', fill: 'url(#gradient)' }])
    })

    describe('using patterns', () => {
        it('should apply def ID to all matching nodes and returns original defs if no inheritance involved', () => {
            const defs = [{ id: 'lines', type: 'patternLines' }]
            const nodes = [{}, {}]

            const boundDefs = bindDefs(defs, nodes, [{ match: '*', id: 'lines' }])

            expect(boundDefs).toEqual(defs)
            expect(nodes).toEqual([{ fill: 'url(#lines)' }, { fill: 'url(#lines)' }])
        })

        it('should allow targetKey to be customized', () => {
            const defs = [{ id: 'lines', type: 'patternLines' }]
            const nodes = [{}, {}]

            const boundDefs = bindDefs(defs, nodes, [{ match: '*', id: 'lines' }], {
                targetKey: 'style.fill',
            })

            expect(boundDefs).toEqual(defs)
            expect(nodes).toEqual([
                { style: { fill: 'url(#lines)' } },
                { style: { fill: 'url(#lines)' } },
            ])
        })

        it('should support inheritance', () => {
            const defs = [
                { id: 'lines.inheritBackground', type: 'patternLines', background: 'inherit' },
                { id: 'lines.inheritColor', type: 'patternLines', color: 'inherit' },
            ]
            const nodes = [
                { id: 'inheritBackground', color: '#000' },
                { id: 'inheritColor', color: '#F00' },
            ]

            const boundDefs = bindDefs(defs, nodes, [
                { match: { id: 'inheritBackground' }, id: 'lines.inheritBackground' },
                { match: { id: 'inheritColor' }, id: 'lines.inheritColor' },
            ])

            expect(boundDefs).toEqual([
                ...defs,
                { id: 'lines.inheritBackground.bg.#000', type: 'patternLines', background: '#000' },
                { id: 'lines.inheritColor.fg.#F00', type: 'patternLines', color: '#F00' },
            ])
            expect(nodes).toEqual([
                {
                    id: 'inheritBackground',
                    color: '#000',
                    fill: 'url(#lines.inheritBackground.bg.#000)',
                },
                { id: 'inheritColor', color: '#F00', fill: 'url(#lines.inheritColor.fg.#F00)' },
            ])
        })
    })

    describe('using gradients', () => {
        it('should apply def ID to all matching nodes and returns original defs if no inheritance involved', () => {
            const defs = [{ id: 'gradient', type: 'linearGradient', colors: [] }]
            const nodes = [{}, {}]

            const boundDefs = bindDefs(defs, nodes, [{ match: '*', id: 'gradient' }])

            expect(boundDefs).toEqual(defs)
            expect(nodes).toEqual([{ fill: 'url(#gradient)' }, { fill: 'url(#gradient)' }])
        })

        it('should allow targetKey to be customized', () => {
            const defs = [{ id: 'gradient', type: 'linearGradient', colors: [] }]
            const nodes = [{}, {}]

            const boundDefs = bindDefs(defs, nodes, [{ match: '*', id: 'gradient' }], {
                targetKey: 'style.fill',
            })

            expect(boundDefs).toEqual(defs)
            expect(nodes).toEqual([
                { style: { fill: 'url(#gradient)' } },
                { style: { fill: 'url(#gradient)' } },
            ])
        })

        it('should support inheritance', () => {
            const defs = [
                {
                    id: 'gradient',
                    type: 'linearGradient',
                    colors: [
                        { offset: 0, color: 'inherit', opacity: 0 },
                        { offset: 100, color: 'inherit' },
                    ],
                },
            ]
            const nodes = [{ color: '#000' }, { color: '#F00' }]

            const boundDefs = bindDefs(defs, nodes, [{ match: '*', id: 'gradient' }])

            expect(boundDefs).toEqual([
                ...defs,
                {
                    id: 'gradient.0.#000.1.#000',
                    type: 'linearGradient',
                    colors: [
                        { offset: 0, color: '#000', opacity: 0 },
                        { offset: 100, color: '#000' },
                    ],
                },
                {
                    id: 'gradient.0.#F00.1.#F00',
                    type: 'linearGradient',
                    colors: [
                        { offset: 0, color: '#F00', opacity: 0 },
                        { offset: 100, color: '#F00' },
                    ],
                },
            ])
            expect(nodes).toEqual([
                { color: '#000', fill: 'url(#gradient.0.#000.1.#000)' },
                { color: '#F00', fill: 'url(#gradient.0.#F00.1.#F00)' },
            ])
        })
    })
})
