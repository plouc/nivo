import countries from './world_countries'

const exclude = ['BRA', 'AUS', 'SWE', 'GRL', 'COD']

export const generateChoroplethData = () =>
    countries.features
        .filter(feature => !exclude.includes(feature.id))
        .map(feature => ({
            id: feature.id,
            value: Math.round(Math.random() * 1000000),
        }))
