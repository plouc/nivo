const fs = require('fs')
const { join } = require('path')

function parseFile(file) {
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

const packages = fs
    .readdirSync('./packages', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'core')
    .map(dirent => join('packages', dirent.name, 'package.json'))

packages
    .map(file => [file, parseFile(file)])
    .filter(
        ([, { devDependencies, peerDependencies }]) =>
            '@nivo/core' in (peerDependencies || {}) &&
            '@nivo/core' in (devDependencies || {}) &&
            peerDependencies['@nivo/core'] !== devDependencies['@nivo/core']
    )
    .forEach(([file, package]) => {
        const version = package.devDependencies['@nivo/core']

        package.peerDependencies['@nivo/core'] = version

        console.log(`Bumping peerDependency of '@nivo/core' in '${package.name}' to ${version}.`)

        fs.writeFileSync(file, JSON.stringify(package, null, 2) + '\n', { encoding: 'utf-8' })
    })
