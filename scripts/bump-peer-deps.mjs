import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const files = {}
const packages = {}
const versions = {}

readdirSync('./packages', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => join('packages', dirent.name, 'package.json'))
    .forEach(file => {
        const pkg = JSON.parse(readFileSync(file, 'utf-8'))
        files[pkg.name] = file
        packages[pkg.name] = pkg
        versions[pkg.name] = pkg.version
    })

for (const [pkgName, pkg] of Object.entries(packages)) {
    for (const [peerDep, currentVersion] of Object.entries(pkg.peerDependencies || {})) {
        if (!peerDep.startsWith('@nivo/')) continue

        if (!(peerDep in versions)) {
            throw new Error(`Unable to find ${peerDep} in packages`)
        }

        const version = versions[peerDep]
        pkg.peerDependencies[peerDep] = version

        console.log(
            `Bumping peerDependency ${peerDep} in ${pkgName} to ${version} (was ${currentVersion})`
        )
    }

    writeFileSync(
        files[pkgName],
        JSON.stringify(pkg, null, 4) + '\n',
        { encoding: 'utf-8' }
    )
}
