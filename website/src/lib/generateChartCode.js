/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import forOwn from 'lodash/forOwn'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import dedent from 'dedent-js'

const indent = (content, spaces = 8) =>
    content
        .split('\n')
        .map((line, i) => {
            if (i === 0) return line
            return `${' '.repeat(spaces)}${line}`
        })
        .join('\n')

const toJson = value => {
    const jsonString = JSON.stringify(value, null, 4)
    const normalized = jsonString
        .replace(/^(\s+)"([a-z]{1}[a-z]*)"\: /gim, (match, space, key) => {
            return `${space}${key}: `
        })
        .replace(/"/gm, `'`)

    if (normalized.length < 120) {
        return normalized.replace(/\n/gm, ' ').replace(/\s{2,}/g, ' ')
    }

    return indent(normalized)
}

const generate = (
    name,
    props,
    { dataKey = 'data', children = [], defaults = {}, pkg = 'nivo' } = {}
) => {
    const properties = []
    let args = ''

    if (dataKey !== null) {
        properties.push(`${dataKey}={${dataKey}}`)
        args = `{ ${dataKey} /* see ${dataKey} tab */ }`
    }

    forOwn(props, (_value, key) => {
        if (_value === undefined) return
        if (defaults && defaults[key] === _value) return
        if (key === 'theme') return

        let value
        if (isPlainObject(_value)) {
            value = `{${toJson(_value)}}`
        } else if (isArray(_value)) {
            value = `{${toJson(_value)}}`
        } else if (isString(_value)) {
            value = `"${_value}"`
        } else if (isBoolean(_value)) {
            value = `{${_value ? 'true' : 'false'}}`
        } else if (isNumber(_value)) {
            value = `{${_value}}`
        } else if (typeof _value === 'function') {
            value = `{${indent(dedent(_value.toString()), 8)}}`
        } else if (_value === null) {
            value = `{null}`
        } else {
            value = _value
        }

        properties.push(`${key}=${value}`)
    })

    const install = `// yarn add @nivo/core ${pkg}`

    const imports = [name, ...children.map(([c]) => c)].map(i => `import { ${i} } from '${pkg}'`)

    let responsiveWarning = ''
    if (name.indexOf('Responsive') === 0) {
        responsiveWarning = [
            ``,
            `// make sure parent container have a defined height when using`,
            `// responsive component, otherwise height will be 0 and`,
            `// no chart will be rendered.`,
            `// website examples showcase many properties,`,
            `// you'll often use just a few of them.`,
        ].join('\n')
    }

    return `// install (please make sure versions match peerDependencies)
${install}
${imports.join('\n')}
${responsiveWarning}
const My${name} = (${args}) => (
    <${name}
        ${properties.join('\n        ')}
    />
)`
}

export default generate
