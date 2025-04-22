import ChoroplethTooltip from './ChoroplethTooltip'

const commonDefaultProps = {
    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    enableGraticule: false,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#999999',

    fillColor: '#dddddd',
    borderWidth: 0,
    borderColor: '#000000',

    isInteractive: true,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseMove: () => {},
    onClick: () => {},

    layers: ['graticule', 'features'],
    legends: [],

    fill: [],
    defs: [],
}

export const GeoMapDefaultProps = {
    ...commonDefaultProps,
    role: 'img',
}

export const GeoMapCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}

const commonChoroplethDefaultProps = {
    match: 'id',
    label: 'id',
    value: 'value',
    colors: 'PuBuGn',
    unknownColor: '#999',
    tooltip: ChoroplethTooltip,
    layers: ['graticule', 'features', 'legends'],
}

export const ChoroplethDefaultProps = {
    ...GeoMapDefaultProps,
    ...commonChoroplethDefaultProps,
    role: 'img',
}

export const ChoroplethCanvasDefaultProps = {
    ...GeoMapCanvasDefaultProps,
    ...commonChoroplethDefaultProps,
}
