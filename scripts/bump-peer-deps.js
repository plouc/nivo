const fs = require('fs')
const { join } = require('path')

function parseFile(file) {
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

fs.readdirSync('./packages', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => join('packages', dirent.name, 'package.json'))
    .map(file => [file, parseFile(file)])
    .forEach(([file, package]) => {
        for (const [dependency, version] of Object.entries(package.devDependencies || {})) {
            if (
                !dependency.startsWith('@nivo/') ||
                !(
                    dependency in (package.peerDependencies || {}) &&
                    version !== package.peerDependencies[dependency]
                )
            ) {
                continue
            }

            package.peerDependencies[dependency] = version

            console.log(
                `Bumping peerDependency of '${dependency}' in '${package.name}' to ${version}.`
            )
        }

        fs.writeFileSync(file, JSON.stringify(package, null, 2) + '\n', { encoding: 'utf-8' })
    })
