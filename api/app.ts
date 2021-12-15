import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import winston from 'winston'
import expressWinston from 'express-winston'
import { nivo } from '@nivo/express'

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

app.use('/nivo', nivo)

const port = process.env.PORT || 3030
app.listen(port, () => {
    console.log(`nivo api listening on ${port}`)
})
