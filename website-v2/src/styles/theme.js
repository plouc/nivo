export default {
    light: {
        headerHeight: 60,
        colors: {
            background: '#f7fafb',

            text: '#000000',
            textLight: '#666666',

            border: '#e3e3e3',

            accent: '#e25d47',
            accentLight: '#f88d81',
            accentDark: '#b44230',

            cardBackground: '#ffffff',
            cardAltBackground: '#f7fafb',

            inputBackground: '#f7fafb',
            inputBorder: '#cccccc',

            /*
            $main-background-color: #f7fafb;

            $mini-nav-background-color: #fff;
            $header-background-color: $accent-color;
            $sidebar-background-color: #e1ebff;
            $title-text-color: $accent-color;
            $button-background-color: $accent-color;
            $table-odd-background-color: #f5f5f5;
            $chart-meta-color: #889eae;
            $links-color: #e25d47;

            $code-background-color: #fff;
            $code-text-color: #222;
            $code-number-color: #eb8404;
            $code-string-color: #199384;
            $code-boolean-color: #257493;
            */
        },

        cardShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        topCardShadow: '0 16px 30px rgba(0, 0, 0, 0.1)',

        nivo: {
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
                },
            },
        },
    },
    dark: {
        headerHeight: 60,
        colors: {
            background: '#2e2e2e',

            text: '#eee',
            textLight: '#aaaaaa',

            border: '#141414',

            accent: '#e25d47',
            accentLight: '#f88d81',
            accentDark: '#b44230',

            cardBackground: '#222222',
            cardAltBackground: '#292929',

            inputBackground: '#333333',
            inputBorder: '#111111',
        },

        cardShadow: '0 2px 6px rgba(0, 0, 0, 0.17)',
        topCardShadow: '0 16px 30px rgba(0, 0, 0, 0.17)',

        nivo: {
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
                        fill: '#bbb',
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
        },
    },
}
