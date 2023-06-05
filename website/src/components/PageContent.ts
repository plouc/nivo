import styled from 'styled-components'
import media from '../theming/mediaQueries'

export default styled.div`
    margin: 0 50px;
    position: relative;

    ${media.tablet`
        & {
            margin: 0 30px;
        }
    `}

    ${media.mobile`
        & {
            margin: 0 15px;
        }
    `}
`
