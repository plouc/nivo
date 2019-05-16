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
        background: '#ffffff',
        axis: {
            domain: {
                line: {
                    strokeWidth: 0,
                    stroke: '#889eae',
                },
            },
            ticks: {
                line: {
                    strokeWidth: 1,
                    stroke: '#889eae',
                },
                text: {
                    fill: '#6a7c89',
                    fontSize: 11,
                },
            },
            legend: {
                text: {
                    fill: '#6f6f6f',
                    fontSize: 13,
                    fontWeight: 600,
                },
            },
        },
        legends: {
            text: {
                fontSize: 12,
            },
        },
        tooltip: {
            container: {
                fontSize: '13px',
            },
        },
        labels: {
            text: {
                fill: '#555555',
                fontWeight: 600,
            },
        },
        annotations: {
            text: {
                fill: '#333333',
                outlineWidth: 3,
                outlineColor: '#ffffff',
            },
            link: {
                stroke: '#333333',
                outlineWidth: 2,
                outlineColor: '#ffffff',
            },
            outline: {
                stroke: '#333333',
                outlineWidth: 2,
                outlineColor: '#ffffff',
            },
            symbol: {
                fill: '#333333',
                outlineWidth: 2,
                outlineColor: '#ffffff',
            },
        },
    },
    dark: {
        background: '#0e1317',
        axis: {
            domain: {
                line: {
                    strokeWidth: 0,
                    stroke: '#526271',
                },
            },
            ticks: {
                line: {
                    strokeWidth: 1,
                    stroke: '#526271',
                },
                text: {
                    fill: '#8d9cab',
                    fontSize: 11,
                },
            },
            legend: {
                text: {
                    fill: '#ccd7e2',
                    fontSize: 13,
                    fontWeight: 500,
                },
            },
        },
        grid: {
            line: {
                stroke: '#444',
            },
        },
        legends: {
            text: {
                fontSize: 12,
                fill: '#8d9cab',
            },
        },
        tooltip: {
            container: {
                fontSize: '13px',
                background: '#000',
                color: '#ddd',
            },
        },
        labels: {
            text: {
                fill: '#ddd',
                fontSize: 12,
                fontWeight: 500,
            },
        },
        dots: {
            text: {
                fill: '#bbb',
                fontSize: 12,
            },
        },
        annotations: {
            text: {
                fill: '#dddddd',
                outlineWidth: 3,
                outlineColor: '#0e1317',
            },
            link: {
                stroke: '#ffffff',
                outlineWidth: 2,
                outlineColor: '#0e1317',
            },
            outline: {
                stroke: '#ffffff',
                outlineWidth: 2,
                outlineColor: '#0e1317',
            },
            symbol: {
                fill: '#ffffff',
                outlineWidth: 2,
                outlineColor: '#0e1317',
            },
        },
    },
}
