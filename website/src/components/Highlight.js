/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { useTheme } from '../theming/context'

export default ({ code, language }) => {
    const theme = useTheme()

    return (
        <Highlight {...defaultProps} theme={theme.highlight} code={code} language={language}>
            {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    style={{
                        ...style,
                        margin: 0,
                        fontSize: '0.8rem',
                        lineHeight: '1.7',
                        padding: '12px 20px',
                    }}
                >
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}
