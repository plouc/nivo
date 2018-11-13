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
            },
        },
        legend: {
            text: {
                fill: '#eee',
                fontSize: 12,
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
}

export const lightTheme = {
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
            },
        },
        legend: {
            fill: '#889eae',
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
            fill: '#555',
            fontSize: 12,
            fontWeight: 500,
        },
    },
}

export default lightTheme
