import theme from '../../styles/nivoTheme'

export const sankey = {
    margin: {
        top: 40,
        right: 160,
        bottom: 40,
        left: 50,
    },

    align: 'justify',
    colors: 'category10',

    nodeOpacity: 1,
    nodeHoverOpacity: 1,
    nodeWidth: 18,
    nodePaddingX: 0,
    nodePaddingY: 12,
    nodeBorderWidth: 1,
    // nodeBorderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.8,
    // },

    linkOpacity: 0.25,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.1,
    linkContract: 0,
    linkBlendMode: 'multiply',
    enableLinkGradient: true,

    enableLabels: true,
    labelPosition: 'outside',
    labelOrientation: 'vertical',
    labelPadding: 16,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1,
    // },

    animate: true,
    motionStiffness: 120,
    motionDamping: 11,

    isInteractive: true,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 130,
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: 'right-to-left',
            itemsSpacing: 2,
            itemTextColor: '#999',
            symbolSize: 14,
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],

    theme,
}
