import Joi from 'joi'

export const custom = Joi.extend(
    {
        type: 'array',
        base: Joi.array(),
        coerce: {
            from: 'string',
            method: (value: any) => {
                if (typeof value !== 'string') return {}

                try {
                    return { value: JSON.parse(value) }
                } catch (ignoreErr) {
                    return {}
                }
            },
        },
    },
    {
        type: 'object',
        base: Joi.object(),
        coerce: {
            from: 'string',
            method: (value: any) => {
                if (typeof value !== 'string') return {}

                try {
                    return { value: JSON.parse(value) }
                } catch (ignoreErr) {
                    return {}
                }
            },
        },
    }
)

export const axis = Joi.object()
    .keys({
        orient: Joi.any().valid('top', 'right', 'bottom', 'left'),

        tickSize: Joi.number().min(0),
        tickPadding: Joi.number(),
        tickRotation: Joi.number(),

        legend: Joi.string().empty(''),
        legendPosition: Joi.any().valid('start', 'middle', 'end'),
        legendOffset: Joi.number(),
    })
    .allow(null)

export const axes = {
    axisTop: axis,
    axisRight: axis,
    axisBottom: axis,
    axisLeft: axis,
}

export const blendMode = Joi.valid(
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
)
