import styled from 'styled-components'
import media from '../../theming/mediaQueries'

export const ComponentPage = styled.div`
    margin-right: 55%;

    &:after {
        content: ' ';
        position: fixed;
        top: ${({ theme }) => theme.dimensions.headerHeight}px;
        box-shadow: ${({ theme }) => theme.topCardShadow};
        right: 0;
        bottom: 0;
        --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
        width: calc(var(--innerWidth) * 0.55);
        background: rgba(0, 0, 0, 0);
    }

    ${media.tablet`
        & {
            margin-right: 55%;
            &:after {
                width: 55%;
            }
        }
    `}

    ${media.mobile`
        & {
            margin: 0;
            &:after {
                display: none;
            }
        }
    `}
`
