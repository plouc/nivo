import styled from 'styled-components'

const debugColor = 'transparent'

export const XGapSpacer = styled.div`
    width: ${({ theme }) => theme.spacing.controlGapX}px;
    height: 10px;
    background: ${debugColor};
`

export const YGapSpacer = styled.div`
    width: 10px;
    height: ${({ theme }) => theme.spacing.controlGapY}px;
    background: ${debugColor};
`
