export const darkTheme = {
    background: '#222',
    axis: {
        domain: {
            line: {
                strokeWidth: 0,
                stroke: '#bbb',
            },
        },
        ticks: {
            line: {
                stroke: '#bbb',
            },
            text: {
                fill: '#F00',
                fontSize: 11,
            },
        },
        legend: {
            text: {
                fill: '#eee',
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
            fill: '#eee',
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
            fontWeight: 500,
        },
    },
    dots: {
        text: {
            fill: '#bbb',
        },
    },
}

export const lightTheme = {
    fontFamily: 'consolas, sans-serif',
    fontSize: 12,
    textColor: '#555',
    axis: {
        domain: {
            line: {
                strokeWidth: 0,
                stroke: '#889eae',
            },
        },
        ticks: {
            line: {
                stroke: '#889eae',
            },
            text: {
                fill: '#6a7c89',
                fontSize: 11,
            },
        },
    },
    legends: {
        text: {
            fill: '#6a7c89',
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
            fontWeight: 500,
        },
    },
}

export default lightTheme
