import theme from '../../styles/nivoTheme'

export const calendar = {
    from: '2015-03-01',
    to: '2016-07-12',

    domain: 'auto',
    emptyColor: '#eeeeee',
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],

    margin: {
        top: 100,
        right: 30,
        bottom: 60,
        left: 30,
    },
    direction: 'horizontal',

    yearSpacing: 40,
    yearLegendOffset: 10,

    monthBorderWidth: 2,
    monthBorderColor: '#ffffff',
    monthLegendOffset: 10,

    daySpacing: 0,
    dayBorderWidth: 2,
    dayBorderColor: '#ffffff',

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 34,
            itemHeight: 36,
            itemDirection: 'top-to-bottom',
        },
    ],

    theme,
}
