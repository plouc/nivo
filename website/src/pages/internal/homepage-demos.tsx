import React from 'react'
import styled from 'styled-components'
import {
    HomeBarDemo,
    HomeCalendarDemo,
    HomeChordDemo,
    HomeCirclePackingDemo,
    HomeLineDemo,
    HomePieDemo,
    HomeRadarDemo,
    HomeSankeyDemo,
    HomeStreamDemo,
    HomeSunburstDemo,
    HomeSwarmPlotDemo,
    HomeTreeMapDemo,
    HomeVoronoiDemo,
} from '../../components/home'

const HomepageDemosPage = () => (
    <Container>
        <div>
            <HomeBarDemo isHorizontal={false} />
        </div>
        <div>
            <HomeBarDemo isHorizontal={true} />
        </div>
        <div>
            <HomeCalendarDemo />
        </div>
        <div>
            <HomeChordDemo />
        </div>
        <div>
            <HomeCirclePackingDemo />
        </div>
        <div>
            <HomeLineDemo />
        </div>
        <div>
            <HomePieDemo />
        </div>
        <div>
            <HomeRadarDemo />
        </div>
        <div>
            <HomeSankeyDemo />
        </div>
        <div>
            <HomeStreamDemo />
        </div>
        <div>
            <HomeSunburstDemo />
        </div>
        <div>
            <HomeSwarmPlotDemo />
        </div>
        <div>
            <HomeTreeMapDemo />
        </div>
        <div>
            <HomeVoronoiDemo />
        </div>
    </Container>
)

const Container = styled.div`
    background: ${({ theme }) => theme.colors.coloredRange[2]};
    // background: transparent;
    display: flex;
    flex-wrap: wrap;

    & > * {
        width: 300px;
        height: 200px;
    }

    & > * > * {
        transform-origin: top left;
        transform: scale3d(0.5, 0.5, 1);
    }
`

export default HomepageDemosPage
