/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export const defaultTheme = {
    background: 'transparent',
    fontFamily: 'sans-serif',
    fontSize: 11,
    textColor: '#333333',
    axis: {
        domain: {
            line: {
                stroke: 'transparent',
                strokeWidth: 1,
            },
        },
        ticks: {
            line: {
                stroke: '#777777',
                strokeWidth: 1,
            },
            text: {},
        },
        legend: {
            text: {},
        },
    },
    grid: {
        line: {
            stroke: '#dddddd',
            strokeWidth: 1,
        },
    },
    legends: {
        text: {},
    },
    labels: {
        text: {},
    },
    markers: {
        lineColor: '#000000',
        lineStrokeWidth: 1,
        text: {},
    },
    dots: {
        text: {},
    },
    tooltip: {
        container: {
            background: 'white',
            color: 'inherit',
            fontSize: 'inherit',
            borderRadius: '2px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
            padding: '5px 9px',
        },
        basic: {
            whiteSpace: 'pre',
            display: 'flex',
            alignItems: 'center',
        },
        table: {},
        tableCell: {
            padding: '3px 5px',
        },
    },
}
