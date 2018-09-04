import React from 'react'

const ColorsColor = () => (
    <div className="guide__table">
        <table>
            <thead>
                <tr>
                    <th>directive</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <code className="code-string">inherit</code>
                    </td>
                    <td>will use color from parent context/component</td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">inherit:darker(.5)</code>
                    </td>
                    <td>
                        will use parent context/component color, and apply{' '}
                        <a
                            href="https://github.com/mbostock/d3/wiki/Colors#rgb_darker"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <code>darker</code>
                        </a>{' '}
                        function on it with an amount of <code className="code-number">.5</code>
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">inherit:brighter(1)</code>
                    </td>
                    <td>
                        will use parent context/component color, and apply{' '}
                        <a
                            href="https://github.com/mbostock/d3/wiki/Colors#rgb_brighter"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <code>brighter</code>
                        </a>{' '}
                        function on it with an amount of <code className="code-number">1</code>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)

export default ColorsColor
