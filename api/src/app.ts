import express from 'express'
import { forOwn } from 'lodash'
import * as uuid from 'uuid'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import winston from 'winston'
import expressWinston from 'express-winston'
import { renderChart } from './lib/renderer'
import * as storage from './lib/storage'
import { validate } from './lib/validation'
import samples from './samples'
import { chartsMapping, ChartType } from './mapping'

const app = express()

app.enable('trust proxy')
app.set('json spaces', 4)
app.use(cors())
app.use(bodyParser.json())
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        meta: false,
        expressFormat: true,
        colorize: true,
    })
)
app.use(compression())

app.get('/status', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: `${process.uptime()} second(s)`,
        protocol: req.protocol,
        host: req.get('host'),
        env: {
            // @ts-ignore
            NODE_ENV: process.NODE_ENV,
        },
    })
})

forOwn(chartsMapping, ({ schema }, type: ChartType) => {
    app.post(`/charts/${type}`, validate(schema), (req, res) => {
        // @ts-ignore
        const props = req.payload
        const id = uuid.v4()
        const url = `${req.protocol}://${req.get('host')}/r/${id}`

        storage.set(id, {
            type,
            props,
            url,
        })

        res.status(201).json({ id, url })
    })
})

app.get('/r', (req, res) => {
    res.status(200).json(storage.dump())
})

app.get('/r/:id', (req, res) => {
    const { id } = req.params

    const config = storage.get(req.params.id)
    if (!config) {
        return res.status(404).send(`no chart found for id "${id}"`)
    }

    const rendered = renderChart(config, req.query)

    res.set('Content-Type', 'image/svg+xml').status(200).send(rendered)
})

app.get('/samples', (req, res) => {
    res.status(200).json({
        samples: Object.keys(samples).map(sample => {
            return `${req.protocol}://${req.get('host')}/samples/${sample}.svg`
        }),
    })
})

forOwn(samples, (config, id) => {
    app.get(`/samples/${id}.svg`, (req, res) => {
        const rendered = renderChart(config, req.query)

        res.set('Content-Type', 'image/svg+xml').status(200).send(rendered)
    })
})

const port = process.env.PORT || 3030
app.listen(port, () => {
    console.log(`nivo api listening on ${port}`)
})
