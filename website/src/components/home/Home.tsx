import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import media from '../../theming/mediaQueries'
import barHorizontal from '../../assets/captures/home/bar-horizontal.png'
import barVertical from '../../assets/captures/home/bar-vertical.png'
import chord from '../../assets/captures/home/chord.png'
import line from '../../assets/captures/home/line.png'
import circlePacking from '../../assets/captures/home/circle-packing.png'
import stream from '../../assets/captures/home/stream.png'
import pie from '../../assets/captures/home/pie.png'
import calendar from '../../assets/captures/home/calendar.png'
import radar from '../../assets/captures/home/radar.png'
import voronoi from '../../assets/captures/home/voronoi.png'
import treemap from '../../assets/captures/home/treemap.png'
import sunburst from '../../assets/captures/home/sunburst.png'
import sankey from '../../assets/captures/home/sankey.png'
import swarmplot from '../../assets/captures/home/swarmplot.png'
import logoImg from '../../assets/nivo-logo.png'

const Home = () => {
    // const theme = useTheme()

    return (
        <Container>
            <Item name="Chord" to="/chord/" image={chord} />
            <Item name="Line" to="/line/" image={line} />
            <Item name="Circle Packing" to="/circle-packing/" image={circlePacking} />
            <Item name="Bar" to="/bar/" image={barVertical} />
            <Item name="Bar" to="/bar/" image={barHorizontal} />
            <Item name="Stream" to="/stream/" image={stream} />
            <Item name="Pie" to="/pie/" image={pie} />
            <Logo
                to="/components"
                style={{
                    backgroundImage: `url(${logoImg})`,
                }}
            />
            <Baseline>
                nivo provides a rich set of dataviz components, built on top of D3 and React.
            </Baseline>
            <Item name="Calendar" to="/calendar/" image={calendar} />
            <Item name="Radar" to="/radar/" image={radar} />
            <Item name="Voronoi" to="/voronoi/" image={voronoi} />
            <Item name="TreeMap" to="/treemap/" image={treemap} />
            <Item name="Sunburst" to="/sunburst/" image={sunburst} />
            <Item name="Sankey" to="/sankey/" image={sankey} />
            <Item name="SwarmPlot" to="/swarnplot/" image={swarmplot} />
            <Item name="Chord" to="/chord/" image={chord} />
            <Item name="Line" to="/line/" image={line} />
            <Item name="Circle Packing" to="/circle-packing/" image={circlePacking} />
            <Item name="Bar" to="/bar/" image={barVertical} />
            <Item name="Bar" to="/bar/" image={barHorizontal} />
            <Item name="Stream" to="/stream/" image={stream} />
            <Item name="Pie" to="/pie/" image={pie} />
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    background: ${({ theme }) => theme.colors.coloredRange[2]};
    width: 100%;
    height: 100%;
    padding: 10px;
    display: grid;

    ${media.desktopLarge`
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, 1fr);
    `}

    ${media.desktop`
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(4, 1fr);
    `}

    ${media.tablet`
        grid-template-columns: repeat(3, 1fr);
        overflow-y: auto;
    `}

    ${media.mobile`
        grid-template-columns: repeat(2, 1fr);
        overflow-y: auto;
    `}
`

const Item = ({ name, to, image }: { name: string; to: string; image: string }) => (
    <ItemContainer to={to} image={image}>
        <ItemLabel>
            <span>{name} Documentation</span>
        </ItemLabel>
    </ItemContainer>
)

const ItemLabel = styled.span`
    display: block;
    position: absolute;
    text-align: center;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -12px;
    opacity: 0;
    transform: translate(0, 15px);
    transition: all 400ms;

    & span {
        background: #fff;
        color: ${({ theme }) => theme.colors.accent};
        font-size: 14px;
        line-height: 1em;
        padding: 5px 9px;
        border-radius: 2px;
    }
`

const ItemContainer = styled(Link)<{
    image: string
}>`
    position: relative;
    border-radius: 2px;
    background-repeat: no-repeat;
    background-image: url('${({ image }) => image}');
    background-size: contain;
    background-position: center center;

    &:hover {
        background-color: ${({ theme }) => theme.colors.coloredRange[1]};

        ${ItemLabel} {
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    ${media.desktop`
        &:nth-child(6) {
            display: none;
        }
    `}
    
    ${media.tablet`
        height: 240px;
    `}

    ${media.mobile`
        height: 180px;
    `}
`

const Logo = styled(Link)`
    background-position: center center;
    background-size: 60%;
    background-repeat: no-repeat;
    border-radius: 2px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.coloredRange[1]};
    }

    ${media.tablet`
        grid-column-start: 1;
        grid-row-start: 1;
        height: 120px;
        background-size: 60%;
    `}

    ${media.mobile`
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        height: 90px;
        padding: 0 50px;
        background-size: 30%;
    `}
`

const Baseline = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-weight: 300;
    font-size: 18px;
    justify-content: flex-start;
    line-height: 28px;

    ${media.desktopLarge`
        grid-column: 3 / span 2;
        padding: 0 20px;
    `}

    ${media.tablet`
        grid-column: 2 / span 2;
        grid-row-start: 1;
        height: 120px;
        padding: 0 20px;
    `}

    ${media.mobile`
        grid-column: 1 / span 2;
        grid-row-start: 2;
        height: auto;
        padding: 20px 50px 30px;
    `}
`

export default Home
