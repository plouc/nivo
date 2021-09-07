const commonDefaultProps = {
    layers: ['links', 'nodes'],

    linkDistance: 30,
    repulsivity: 10,
    distanceMin: 1,
    distanceMax: Infinity,
    iterations: 90,

    nodeBorderWidth: 0,
    nodeBorderColor: { from: 'color' },

    linkThickness: 1,
    linkColor: { from: 'source.color' },

    isInteractive: true,

    animate: true,
    motionConfig: 'gentle' as const,

    role: 'img',
}

export const NetworkDefaultProps = {
    ...commonDefaultProps,
}

export const svgDefaultProps = NetworkDefaultProps

export const NetworkCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}

export const canvasDefaultProps = NetworkCanvasDefaultProps
