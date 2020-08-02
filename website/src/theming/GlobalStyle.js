/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createGlobalStyle as create } from 'styled-components'

export default isCapturing => create`
    html,
    body {
        font-size: 100%;
        line-height: 1.6;
        font-family: ${({ theme }) => theme.fontFamily};
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        background: ${({ theme }) => (isCapturing ? 'transparent' : theme.colors.background)};
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
    }

    svg {
        shape-rendering: auto; /* optimizeSpeed */
    }
    
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    code, .code {
        color: ${({ theme }) => theme.colors.codeText};
    }

    a {
        color: ${({ theme }) => theme.colors.link};
        text-decoration: underline;
    }
    a code {
        color: ${({ theme }) => theme.colors.link};
    }
    
    h1 {
        font-size: 1.9rem;
        margin: 0 0 20px 0;
        padding: 0;
        font-weight: 300;
    }
    h2, h3, h4, h5, h6 {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.titleText};
    }
    h2 {
        font-size: 1.4rem;
    }
    h3 {
        font-size: 1.2rem;
    }

    p {
        margin: 15px 0;
    }
    p:first-child {
        margin-top: 0;
    }

    code,
    pre,
    svg text {
        font-family: ${({ theme }) => theme.fontFamilyMono};
    }

    th {
        padding: 7px 12px;
        text-align: left;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.accent};
        text-transform: uppercase;
        font-size: 14px;
    }
    
    td {
        padding: 5px 12px;
    }
    
`
