import { PartialTheme } from '@nivo/theming'

export const axesCustomStyles: Record<'top' | 'right' | 'bottom' | 'left', PartialTheme['axis']> = {
    top: {
        domain: {
            line: {
                stroke: '#9c3f41',
                strokeWidth: 2,
                strokeDasharray: '6 4',
            },
        },
        legend: {
            text: {
                fontSize: 14,
                fontWeight: 600,
                fill: '#9c3f41',
            },
        },
        ticks: {
            line: {
                stroke: '#9c3f41',
                strokeWidth: 2,
            },
            text: {
                fontSize: 14,
                fill: '#9c3f41',
            },
        },
    },
    right: {
        domain: {
            line: {
                stroke: '#bf5d00',
            },
        },
        legend: {
            text: {
                fontSize: 10,
                fontWeight: 600,
                fill: '#bf5d00',
            },
        },
        ticks: {
            line: {
                stroke: '#bf5d00',
            },
            text: {
                fontSize: 8,
                fontWeight: 600,
                fill: '#bf5d00',
            },
        },
    },
    bottom: {
        domain: {
            line: {
                stroke: '#886e29',
                strokeDasharray: '2 3',
            },
        },
        legend: {
            text: {
                fontSize: 10,
                fontWeight: 600,
                fill: '#886e29',
            },
        },
        ticks: {
            line: {
                stroke: '#886e29',
            },
            text: {
                fontSize: 10,
                fill: '#886e29',
            },
        },
    },
    left: {
        domain: {
            line: {
                stroke: '#681f22',
            },
        },
        legend: {
            text: {
                fontSize: 10,
                fontWeight: 600,
                fill: '#ffffff',
                outlineWidth: 1,
                outlineColor: '#681f22',
            },
        },
        ticks: {
            line: {
                stroke: '#681f22',
            },
            text: {
                fontSize: 10,
                fontWeight: 600,
                fill: '#ffffff',
                outlineWidth: 1,
                outlineColor: '#681f22',
            },
        },
    },
}
