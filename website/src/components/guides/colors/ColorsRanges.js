import React from 'react'
import {
    categoricalColorSchemeIds,
    divergingColorSchemeIds,
    sequentialColorSchemeIds,
    colorSchemes,
} from '@nivo/colors'
import { Card } from '../../styled'

const ColorsRanges = () => (
    <Card className="guide__table">
        <table>
            <tbody>
                <tr>
                    <th colSpan={2}>Categorical colors</th>
                </tr>
                {categoricalColorSchemeIds.map(scheme => (
                    <tr key={scheme}>
                        <td>{scheme}</td>
                        <td>
                            {colorSchemes[scheme].map(color => (
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
                <tr>
                    <th colSpan={2}>Diverging colors</th>
                </tr>
                {divergingColorSchemeIds.map(scheme => (
                    <tr key={scheme}>
                        <td>{scheme}</td>
                        <td>
                            {colorSchemes[scheme][11].map(color => (
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
                <tr>
                    <th colSpan={2}>Sequential colors</th>
                </tr>
                {sequentialColorSchemeIds.map(scheme => (
                    <tr key={scheme}>
                        <td>{scheme}</td>
                        <td>
                            {colorSchemes[scheme][9].map(color => (
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
    </Card>
)

export default ColorsRanges
