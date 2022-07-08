import React from 'react'
import styled from 'styled-components'
import {
    HomeAreaBumpDemo,
    HomeBarDemo,
    HomeBumpDemo,
    HomeCalendarDemo,
    HomeChordDemo,
    HomeChoroplethDemo,
    HomeCirclePackingDemo,
    HomeLineDemo,
    HomeMarimekkoDemo,
    HomePieDemo,
    HomeRadarDemo,
    HomeRadialBarDemo,
    HomeSankeyDemo,
    HomeStreamDemo,
    HomeIciclesDemo,
    HomeSwarmPlotDemo,
    HomeTreeMapDemo,
    HomeVoronoiDemo,
} from '../../components/home'

const HomeDemosPage = () => (
    <Container>
        <HomeChoroplethDemo />
        <HomeRadialBarDemo />
        <HomeAreaBumpDemo />
        <HomeBarDemo isHorizontal={false} />
        <HomeBarDemo isHorizontal={true} />
        <HomeBumpDemo />
        <HomeMarimekkoDemo />
        <HomeCalendarDemo />
        <HomeChordDemo />
        <HomeCirclePackingDemo />
        <HomeLineDemo />
        <HomePieDemo />
        <HomeRadarDemo />
        <HomeSankeyDemo />
        <HomeStreamDemo />
        <HomeIciclesDemo />
        <HomeSwarmPlotDemo />
        <HomeTreeMapDemo />
        <HomeVoronoiDemo />
    </Container>
)

const Container = styled.div`
    background: ${({ theme }) => theme.colors.coloredRange[2]};
    background: transparent;
    display: flex;
    flex-wrap: wrap;
    transform-origin: top left;
    // transform: scale3d(0.5, 0.5, 1);
    width: 1800px;

    & > * {
        width: 600px;
        height: 400px;
        display: flex;
    }
`

export default HomeDemosPage
