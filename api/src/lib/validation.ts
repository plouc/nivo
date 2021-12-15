import { omit } from 'lodash'
import joi from 'joi'

export const validate = (
    schema: joi.Schema,
    options: {
        omit?: string[]
    } = {}
) => {
    const { omit: omitProps } = options

    return (req, res, next) => {
        let data = req.body
        if (omit) {
            data = omit(data, omitProps)
        }

        try {
            req.payload = joi.attempt(data, schema, null, {
                abortEarly: true,
                convert: true,
            })
            next()
        } catch (err) {
            console.log('ERROR', err)
            return res.status(400).json({
                errors: err.details.map(({ message, path }) => {
                    return `${message}${path ? ` (${path})` : ''}`
                }),
            })
        }
    }
}
