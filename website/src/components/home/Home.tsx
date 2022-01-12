import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { FiArrowRight } from 'react-icons/fi'
import media from '../../theming/mediaQueries'
import areaBump from '../../assets/captures/home/area-bump.png'
import barHorizontal from '../../assets/captures/home/bar-horizontal.png'
import barVertical from '../../assets/captures/home/bar-vertical.png'
import bump from '../../assets/captures/home/bump.png'
import chord from '../../assets/captures/home/chord.png'
import choropleth from '../../assets/captures/home/choropleth.png'
import line from '../../assets/captures/home/line.png'
import circlePacking from '../../assets/captures/home/circle-packing.png'
import stream from '../../assets/captures/home/stream.png'
import pie from '../../assets/captures/home/pie.png'
import calendar from '../../assets/captures/home/calendar.png'
import radar from '../../assets/captures/home/radar.png'
import radialBar from '../../assets/captures/home/radial-bar.png'
import voronoi from '../../assets/captures/home/voronoi.png'
import treemap from '../../assets/captures/home/treemap.png'
import sunburst from '../../assets/captures/home/sunburst.png'
import sankey from '../../assets/captures/home/sankey.png'
import swarmplot from '../../assets/captures/home/swarmplot.png'
import marimekko from '../../assets/captures/home/marimekko.png'
import logoImg from '../../assets/nivo-logo.png'

const Home = () => {
    return (
        <Container>
            <Item name="Chord Diagram" to="/chord/" image={chord} />
            <Item name="Line Chart" to="/line/" image={line} />
            <Item name="Circle Packing Layout" to="/circle-packing/" image={circlePacking} />
            <Item name="Area Bump Chart" to="/area-bump/" image={areaBump} />
            <Item name="Bar Chart" to="/bar/" image={barHorizontal} />
            <Item name="Stream Chart" to="/stream/" image={stream} />
            <Item name="Pie Chart" to="/pie/" image={pie} />
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
            <Item name="Radar Chart" to="/radar/" image={radar} />
            <Item name="Voronoi Tesselation" to="/voronoi/" image={voronoi} />
            <Item name="Tree Map" to="/treemap/" image={treemap} />
            <Item name="Sunburst Chart" to="/sunburst/" image={sunburst} />
            <Item name="Sankey" to="/sankey/" image={sankey} />
            <Item name="Swarm Plot" to="/swarmplot/" image={swarmplot} />
            <Item name="Marimekko Chart" to="/marimekko/" image={marimekko} />
            <Item name="Bump Chart" to="/bump/" image={bump} />
            <Item name="Radial Bar Chart" to="/radial-bar/" image={radialBar} />
            <Item name="Choropleth Map" to="/choropleth/" image={choropleth} />
            <Item name="Bar Chart" to="/bar/" image={barVertical} />
            <Item name="Tree Map" to="/treemap/" image={treemap} />
            <Item name="Chord Diagram" to="/chord/" image={chord} />
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    background: ${({ theme }) => theme.colors.coloredRange[2]};
    width: 100%;
    height: 100%;
    display: grid;

    ${media.desktopLarge`
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-column-gap: 16px;
        grid-row-gap: 9px;
        padding: 16px;
    `}

    ${media.desktop`
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-column-gap: 12px;
        grid-row-gap: 9px;
        padding: 12px;
    `}

    ${media.tablet`
        grid-template-columns: repeat(3, 1fr);
        overflow-y: auto;
        grid-column-gap: 16px;
        grid-row-gap: 9px;
        padding: 16px;
    `}

    ${media.mobile`
        grid-template-columns: repeat(2, 1fr);
        overflow-y: auto;
        grid-column-gap: 12px;
        grid-row-gap: 9px;
        padding: 12px;
    `}
`

const Item = ({ name, to, image }: { name: string; to: string; image: string }) => (
    <ItemContainer to={to}>
        <Illustration image={image} />
        <ItemLabel>
            <span>{name}</span>
            <FiArrowRight />
        </ItemLabel>
    </ItemContainer>
)

const ItemLabel = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.coloredRange[3]}77;
    border-bottom: 1px solid ${({ theme }) => theme.colors.coloredRange[3]}77;
    padding: 7px 0;
    font-size: 14px;
    line-height: 1em;

    svg {
        font-size: 16px;
        opacity: 0;
    }
`

const Illustration = styled.div<{ image: string }>`
    flex: 1;
    background-repeat: no-repeat;
    background-image: url('${({ image }) => image}');
    background-size: contain;
    background-position: center bottom;
`

const ItemContainer = styled(Link)`
    position: relative;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.coloredRange[4]};

    &:hover {
        background-color: ${({ theme }) => theme.colors.coloredRange[1]}55;
        ${ItemLabel} {
            color: ${({ theme }) => theme.colors.coloredRange[0]};
            border-top-color: ${({ theme }) => theme.colors.coloredRange[1]};
            border-bottom-color: transparent;
            padding-left: 9px;
            padding-right: 9px;
        }

        svg {
            opacity: 1;
        }
    }

    ${media.desktop`
        &:nth-child(6),
        &:nth-child(n+21) {
            display: none;
        }
    `}

    ${media.tablet`
        height: 240px;
    `}

    ${media.mobile`
        height: 170px;
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

    ${media.desktopLarge`
        background-size: 70%;
    `}

    ${media.desktop`
        background-size: 70%;
    `}
    
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
        height: 80px;
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
    max-width: 380px;

    ${media.desktopLarge`
        grid-column: 3 / span 2;
    `}

    ${media.desktop`
        grid-column: 3 / span 2;
    `}

    ${media.tablet`
        grid-column: 2 / span 2;
        grid-row-start: 1;
    `}

    ${media.mobile`
        grid-column: 1 / span 2;
        grid-row-start: 2;
        height: auto;
        max-width: unset;
        padding: 0 20px 20px;
        justify-content: center;
        text-align: center;
    `}
`

export default Home
