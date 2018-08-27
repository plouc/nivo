import React from 'react'
import {
    schemeCategory10,
    schemeAccent,
    schemeDark2,
    schemePaired,
    schemePastel1,
    schemePastel2,
    schemeSet1,
    schemeSet2,
    schemeSet3,
} from 'd3-scale-chromatic'
import { defaultCategoricalColors } from '@nivo/core'

const ColorsRanges = () => (
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
                        <code className="code-string">'nivo'</code>
                    </td>
                    <td>
                        <p>
                            looks familiar isn't it, obviously it's the categorical colors used on
                            this doc.
                        </p>
                        {defaultCategoricalColors()
                            .range()
                            .map(color => (
                                <span
                                    style={{
                                        display: 'inline-block',
                                        background: color,
                                        width: 18,
                                        height: 18,
                                    }}
                                />
                            ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'d310'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemeCategory10"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemeCategory10
                            </a>{' '}
                            color scale.
                        </p>
                        {schemeCategory10.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'accent'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemeAccent"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemeAccent
                            </a>{' '}
                            color scale.
                        </p>
                        {schemeAccent.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'dark2'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemeDark2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemeDark2
                            </a>{' '}
                            color scale.
                        </p>
                        {schemeDark2.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'paired'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemePaired"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemePaired
                            </a>{' '}
                            color scale.
                        </p>
                        {schemePaired.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'pastel1'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemePastel1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemePastel1
                            </a>{' '}
                            color scale.
                        </p>
                        {schemePastel1.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'pastel2'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemePastel2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemePastel2
                            </a>{' '}
                            color scale.
                        </p>
                        {schemePastel2.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'set1'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemeSet1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemeSet1
                            </a>{' '}
                            color scale.
                        </p>
                        {schemeSet1.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'set2'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemeSet2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemeSet2
                            </a>{' '}
                            color scale.
                        </p>
                        {schemeSet2.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>
                        <code className="code-string">'set3'</code>
                    </td>
                    <td>
                        <p>
                            <a
                                href="https://github.com/d3/d3-scale-chromatic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                d3-scale-chromatic
                            </a>{' '}
                            package{' '}
                            <a
                                href="https://github.com/d3/d3-scale-chromatic#schemeSet3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                schemeSet3
                            </a>{' '}
                            color scale.
                        </p>
                        {schemeSet3.map(color => (
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: color,
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        ))}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)

export default ColorsRanges
