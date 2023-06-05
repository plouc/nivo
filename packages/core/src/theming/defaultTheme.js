/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * @type ThemeWithoutInheritance
 */
export const defaultTheme = {
    background: 'transparent',
    text: {
        fontFamily: 'sans-serif',
        fontSize: 11,
        fill: '#333333',
        outlineWidth: 0,
        outlineColor: 'transparent',
    },
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
            text: {
                fontSize: 12,
            },
        },
    },
    grid: {
        line: {
            stroke: '#dddddd',
            strokeWidth: 1,
        },
    },
    legends: {
        hidden: {
            symbol: {
                fill: '#333333',
                opacity: 0.6,
            },
            text: {
                fill: '#333333',
                opacity: 0.6,
            },
        },
        text: {},
        ticks: {
            line: {
                stroke: '#777777',
                strokeWidth: 1,
            },
            text: {
                fontSize: 10,
            },
        },
        title: {
            text: {},
        },
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
        chip: {
            marginRight: 7,
        },
        table: {},
        tableCell: {
            padding: '3px 5px',
        },
        tableCellValue: {
            fontWeight: 'bold',
        },
    },
    crosshair: {
        line: {
            stroke: '#000000',
            strokeWidth: 1,
            strokeOpacity: 0.75,
            strokeDasharray: '6 6',
        },
    },
    annotations: {
        text: {
            fontSize: 13,
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1,
        },
        link: {
            stroke: '#000000',
            strokeWidth: 1,
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1,
        },
        outline: {
            fill: 'none',
            stroke: '#000000',
            strokeWidth: 2,
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1,
        },
        symbol: {
            fill: '#000000',
            outlineWidth: 2,
            outlineColor: '#ffffff',
            outlineOpacity: 1,
        },
    },
}
