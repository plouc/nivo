import React from 'react'
import HighlightBase, { defaultProps, Language } from 'prism-react-renderer'
import { useTheme } from '../theming/context'

interface HighlightProps {
    code: string
    language: Language
}

export const Highlight = ({ code, language }: HighlightProps) => {
    const theme = useTheme()

    return (
        <HighlightBase {...defaultProps} theme={theme.highlight} code={code} language={language}>
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
        </HighlightBase>
    )
}
