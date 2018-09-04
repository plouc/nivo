import React from 'react'
import { colorSchemeIds, colorSchemes } from '@nivo/core'

const ColorsRanges = () => (
    <div className="guide__table">
        <table>
            <tbody>
                {colorSchemeIds.map(id => (
                    <tr key={id}>
                        <td>
                            <code className="code-string">{id}</code>
                        </td>
                        <td>
                            {colorSchemes[id].map(color => (
                                <span
                                    key={color}
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
                ))}
            </tbody>
        </table>
    </div>
)

export default ColorsRanges
