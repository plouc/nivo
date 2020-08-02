'use strict'

const exec = require('child_process').exec

const fetchTags = () =>
    new Promise((resolve, reject) => {
        exec('git tag --list "v*"', (err, stdout) => {
            if (err) return reject(err)
            resolve(stdout.trim().split('\n'))
        })
    })

const changes = ({ version, from, to }) =>
    new Promise((resolve, reject) => {
        exec(
            `./node_modules/.bin/clog ${from ? ` --from ${from}` : ''}${to
                ? ` --to ${to}`
                : ''} --setversion ${version} -o CHANGELOG.md -r https://github.com/plouc/nivo`,
            (err, stdout) => {
                if (err) return reject(err)
                resolve(stdout.trim().split('\n'))
            }
        )
    })

const run = async () => {
    const tags = await fetchTags()
    for (let i = 0; i < tags.length; i++) {
        if (i === 0) await changes({ version: tags[0], to: tags[0] })
        else await changes({ version: tags[i], from: tags[i - 1], to: tags[i] })
    }
}

run()
