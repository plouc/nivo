/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export const defaultTheme = {
    axis: {
        textColor: '#000',
        fontSize: '11px',
        tickColor: '#000',
        legendColor: '#000',
        legendFontSize: '11px',
    },
    grid: {
        stroke: '#ddd',
        strokeWidth: 1,
        strokeDasharray: '',
    },
    markers: {
        lineColor: '#000',
        lineStrokeWidth: 1,
        textColor: '#000',
        fontSize: '11px',
    },
    dots: {
        textColor: '#000',
        fontSize: '11px',
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
    labels: {
        textColor: '#000',
    },
    sankey: {
        label: {},
    },
}
