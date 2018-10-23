import range from 'lodash/range'

const generateSites = () =>
    range(100).map(id => ({ id, x: Math.random() * 500, y: Math.random() * 500 }))

export const voronoi = () => ({
    data: generateSites(),
})
