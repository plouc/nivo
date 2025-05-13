import forOwn from 'lodash/forOwn.js'
import isPlainObject from 'lodash/isPlainObject.js'
import isArray from 'lodash/isArray.js'
import isString from 'lodash/isString.js'
import isBoolean from 'lodash/isBoolean.js'
import isEqual from 'lodash/isEqual.js'
import dedent from 'dedent-js'

const compactArrays = (str: string) => {
    let out = ''
    let inString = false
    let quoteChar = ''

    for (let i = 0; i < str.length; i++) {
        const c = str[i]

        // enter/exit string literal
        if (!inString && (c === '"' || c === "'")) {
            inString = true
            quoteChar = c
            out += c
            continue
        }
        if (inString && c === quoteChar && str[i - 1] !== '\\') {
            inString = false
            quoteChar = ''
            out += c
            continue
        }

        // handle [ outside strings
        if (!inString && c === '[') {
            out += '['
            // skip any spaces immediately after
            while (str[i + 1] === ' ') i++
            continue
        }

        // handle ] outside strings
        if (!inString && c === ']') {
            // remove any spaces we just output
            while (out.endsWith(' ')) {
                out = out.slice(0, -1)
            }
            out += ']'
            continue
        }

        // default: copy character
        out += c
    }

    return out
}

const indent = (content: string, spaces: number = 8) =>
    content
        .split('\n')
        .map((line, i) => {
            if (i === 0) return line
            return `${' '.repeat(spaces)}${line}`
        })
        .join('\n')

const toJson = (value: any) => {
    const jsonString = JSON.stringify(value, null, 4)
    const normalized = jsonString
        .replace(/^(\s+)"([a-z]{1}[a-z]*)"\: /gim, (_match, space, key) => {
            return `${space}${key}: `
        })
        .replace(/"/gm, `'`)

    const compacted = compactArrays(normalized.replace(/\n/gm, ' ').replace(/\s{2,}/g, ' '))
    if (compacted.length <= 100) return compacted

    return indent(normalized)
}

export const generateChartCode = (
    name: string,
    props: any,
    {
        dataKey,
        children = [],
        defaults = {},
        pkg = 'nivo',
    }: {
        dataKey?: string
        children?: any[]
        defaults?: any
        pkg?: string
    } = {}
) => {
    const properties = []
    let args = ''

    if (dataKey !== undefined) {
        properties.push(`${dataKey}={${dataKey}}`)
        args = `{ ${dataKey} /* see ${dataKey} tab */ }`
    }

    forOwn(props, (_value, key) => {
        if (_value === undefined) return
        if (defaults && isEqual(defaults[key], _value)) return
        // Ignore the theme property as it's customized for the website.
        if (key === 'theme') return

        let value: string | undefined
        if (isPlainObject(_value)) {
            value = `{${toJson(_value)}}`
        } else if (isArray(_value)) {
            value = `{${toJson(_value)}}`
        } else if (isString(_value)) {
            value = `"${_value}"`
        } else if (isBoolean(_value)) {
            value = `{${_value ? 'true' : 'false'}}`
        } else if (typeof _value === 'function') {
            value = `{${indent(dedent(_value.toString()), 8)}}`
        } else if (_value === null) {
            value = `{null}`
        } else {
            value = `{${_value}}`
        }

        if (!value) return

        properties.push(`${key}=${value}`)
    })

    const imports = [name, ...children.map(([c]) => c)].map(i => `import { ${i} } from '${pkg}'`)

    return `${imports.join('\n')}\n
const My${name} = (${args}) => (
    <${name}
        ${properties.join('\n        ')}
    />
)`
}
