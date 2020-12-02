'use strict'

const { exec } = require('child_process')

/**
 * This parses tags from git metadata and returns a tuple of the tag and version.
 * You can see a list of all available format options here: https://www.git-scm.com/docs/git-log#_pretty_formats
 * We use `%cs` which is a formatted date of `YYYY-MM-DD`, then `,.,` as a delimeter, and
 * finally `%s` which gets us the subject (first line of commit).
 *
 * @return {Promise<[date: string, version: string][]>}
 */
const fetchTags = () =>
    new Promise((resolve, reject) => {
        exec(
            'git log --tags --simplify-by-decoration --pretty="format:%cs,.,%s"',
            (err, stdout) => {
                if (err) return reject(err)
                resolve(
                    stdout
                        .trim()
                        .split('\n')
                        .filter(str => /,\.,v(\d)+\.(\d+)\.(\d+)(-\d+)?$/.test(str))
                        .map(str => str.split(',.,'))
                        .reverse()
                )
            }
        )
    })

/**
 * Send tag information to clog to generate our changelog entry
 *
 * @param {Object} info - Information needed to build a changelog entry
 * @param {[date: string, version: string]} info.tag - Tag tuple with date and version
 * @param {string | undefined} info.from - Beginning tag version range
 * @param {string | undefined} info.to - End tag version range
 * @return {Promise<string>}
 */
const changes = ({ tag: [date, version], from, to }) =>
    new Promise((resolve, reject) => {
        exec(
            `clog ${from ? ` --from ${from}` : ''}${
                to ? ` --to ${to}` : ''
            } --setversion ${version} --setdate ${date} -o CHANGELOG.md`,
            (err, stdout) => {
                if (err) return reject(err)
                resolve(stdout.trim().split('\n'))
            }
        )
    })

/**
 * This runs and fetches all the tags in the following format:
 *
 * Array<[date: string, version: string]>
 *
 * Then we loop over this structure and send it to clog to build our changelog.
 * We use `0.31.0` as the first entry before the tag structure switched to a `v` prefix.
 */
const run = async () => {
    const tags = await fetchTags()
    for (let i = 0; i < tags.length; i++) {
        if (i === 0) await changes({ tag: tags[i], from: '0.31.0', to: tags[i][1] })
        else await changes({ tag: tags[i], from: tags[i - 1][1], to: tags[i][1] })
    }

    await new Promise((resolve, reject) => {
        exec('git add --all', err => {
            if (err) return reject(err)
            resolve()
        })
    })
}

run()
