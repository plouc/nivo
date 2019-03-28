/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export default {
    light: {
        plain: {
            color: '#cccccc',
            backgroundColor: '#222222',
        },
        styles: [
            {
                types: ['prolog'],
                style: {
                    color: 'rgb(0, 0, 128)',
                },
            },
            {
                types: ['comment'],
                style: {
                    color: '#999999',
                },
            },
            {
                types: ['builtin', 'tag', 'changed', 'punctuation', 'keyword'],
                style: {
                    color: '#e25d47',
                },
            },
            {
                types: ['number', 'inserted'],
                style: {
                    color: '#e25d47',
                    fontWeight: 600,
                },
            },
            {
                types: ['constant'],
                style: {
                    color: 'rgb(100, 102, 149)',
                },
            },
            {
                types: ['attr-name', 'variable'],
                style: {
                    color: '#aceacf',
                },
            },
            {
                types: ['deleted', 'string'],
                style: {
                    color: '#f88d81',
                },
            },
            {
                types: ['selector'],
                style: {
                    color: 'rgb(215, 186, 125)',
                },
            },
            {
                types: ['operator'],
                style: {
                    color: '#777777',
                },
            },
            {
                types: ['function'],
                style: {
                    color: '#aceacf',
                },
            },
            {
                types: ['class-name'],
                style: {
                    color: 'rgb(78, 201, 176)',
                },
            },
            {
                types: ['char'],
                style: {
                    color: 'rgb(209, 105, 105)',
                },
            },
        ],
    },
    dark: {
        plain: {
            color: '#bcc5ce',
            backgroundColor: '#0e1317',
        },
        styles: [
            {
                types: ['prolog'],
                style: {
                    color: 'rgb(0, 0, 128)',
                },
            },
            {
                types: ['comment'],
                style: {
                    color: '#4d5f69',
                },
            },
            {
                types: ['builtin', 'tag', 'changed', 'punctuation', 'keyword'],
                style: {
                    color: '#73b7fd',
                },
            },
            {
                types: ['number', 'inserted'],
                style: {
                    color: '#73b7fd',
                    fontWeight: 600,
                },
            },
            {
                types: ['constant'],
                style: {
                    color: 'rgb(100, 102, 149)',
                },
            },
            {
                types: ['attr-name', 'variable'],
                style: {
                    color: 'rgb(156, 220, 254)',
                },
            },
            {
                types: ['deleted', 'string'],
                style: {
                    color: '#3c91e8',
                },
            },
            {
                types: ['selector'],
                style: {
                    color: 'rgb(215, 186, 125)',
                },
            },
            {
                types: ['operator'],
                style: {
                    color: '#666666',
                },
            },
            {
                types: ['function'],
                style: {
                    color: '#6ccbdc',
                },
            },
            {
                types: ['class-name'],
                style: {
                    color: 'rgb(78, 201, 176)',
                },
            },
            {
                types: ['char'],
                style: {
                    color: 'rgb(209, 105, 105)',
                },
            },
        ],
    },
}
