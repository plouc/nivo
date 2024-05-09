const fs = require('fs')
const path = require('path')

const packagesDir = './packages'

const entryPoints = []

fs.readdirSync(packagesDir).forEach(pkgName => {
    const pkgPath = path.join(packagesDir, pkgName)
    const pkgSrcPath = path.join(pkgPath, 'src')
    const pkgTypeScriptEntryPoint = path.join(pkgSrcPath, 'index.ts')

    if (fs.existsSync(pkgTypeScriptEntryPoint)) {
        if (pkgName !== 'parallel-coordinates') {
            entryPoints.push(pkgTypeScriptEntryPoint)
        }
    }
})

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    tsconfig: "./tsconfig.monorepo.json",
    entryPoints,
    out: "doc",
};