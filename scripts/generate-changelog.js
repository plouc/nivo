'use strict'

const exec = require('child_process').exec

const fetchTags = () =>
    new Promise((resolve, reject) => {
        exec('git log --tags --simplify-by-decoration --pretty="format:%cs,,%s"', (err, stdout) => {
            if (err) return reject(err)
            resolve(
                stdout
                    .trim()
                    .split('\n')
                    .filter(str => /,,v(\d)+\.(\d+)\.(\d+)$/.test(str))
                    .map(str => str.split(',,'))
                    .reverse()
            )
        })
    })

const changes = ({ version: [date, version], from, to }) =>
    new Promise((resolve, reject) => {
        exec(
            `./scripts/clog ${from ? ` --from ${from}` : ''}${
                to ? ` --to ${to}` : ''
            } --setversion ${version} --setdate ${date} -o CHANGELOG.md -r https://github.com/plouc/nivo`,
            (err, stdout) => {
                if (err) return reject(err)
                resolve(stdout.trim().split('\n'))
            }
        )
    })

const run = async () => {
    const tags = await fetchTags()
    for (let i = 0; i < tags.length; i++) {
        if (i === 0) await changes({ version: tags[i], to: tags[i][1] })
        else await changes({ version: tags[i], from: tags[i - 1][1], to: tags[i][1] })
    }
}

run()
