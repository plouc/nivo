export const textPropsByEngine = {
    svg: {
        align: {
            left: 'start',
            center: 'middle',
            right: 'end',
            start: 'start',
            middle: 'middle',
            end: 'end',
        },
        baseline: {
            top: 'text-before-edge',
            center: 'central',
            bottom: 'alphabetic',
        },
    },
    canvas: {
        align: {
            left: 'left',
            center: 'center',
            right: 'right',
            start: 'left',
            middle: 'center',
            end: 'right',
        },
        baseline: {
            top: 'top',
            center: 'middle',
            bottom: 'bottom',
        },
    },
}
