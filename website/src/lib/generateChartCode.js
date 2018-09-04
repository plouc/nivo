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
import isFunction from 'lodash/isFunction'

const indent = (content, spaces = 8) =>
    content
        .split('\n')
        .map((line, i) => {
            if (i === 0) return line
            return `${' '.repeat(spaces)}${line}`
        })
        .join('\n')

const generate = (
    name,
    props,
    { dataKey = 'data', children = [], defaults = {}, pkg = 'nivo' } = {}
) => {
    const properties = [`${dataKey}={/* see data tab */}`]
    forOwn(props, (_value, key) => {
        if (_value === undefined) return
        if (defaults && defaults[key] === _value) return
        if (key === 'theme') return

        let value
        if (isPlainObject(_value)) {
            value = `{${indent(JSON.stringify(_value, null, 4))}}`
        } else if (isArray(_value)) {
            value = `{${indent(JSON.stringify(_value, null, 4))}}`
        } else if (isString(_value)) {
            value = `"${_value}"`
        } else if (isBoolean(_value)) {
            value = `{${_value ? 'true' : 'false'}}`
        } else if (isNumber(_value)) {
            value = `{${_value}}`
        } else if (isFunction(_value)) {
            value = `{${_value.toString()}}`
        } else {
            value = _value
        }

        properties.push(`${key}=${value}`)
    })

    const imports = [name, ...children.map(([c]) => c)].map(i => `import { ${i} } from '${pkg}'`)

    let responsiveWarning = ''
    if (name.indexOf('Responsive') === 0) {
        responsiveWarning = [
            ``,
            `// make sure parent container have a defined height when using responsive component,`,
            `// otherwise height will be 0 and no chart will be rendered.`,
            `// website examples showcase many properties, you'll often use just a few of them.`,
        ].join('\n')
    }

    return `import { render } from 'react-dom'
${imports.join('\n')}
${responsiveWarning}
render((
    <${name}
        ${properties.join('\n        ')}
    />
), document.getElementById('chart'))`
}

export default generate
