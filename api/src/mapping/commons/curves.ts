import Joi from 'joi'

export const closedCurve = Joi.valid(
    'basisClosed',
    'cardinalClosed',
    'catmullRomClosed',
    'linearClosed'
)
