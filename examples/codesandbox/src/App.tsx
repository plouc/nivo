import {
  AreaBump,
  Bar,
  Bullet,
  Bump,
  Calendar,
  Chord,
  Choropleth,
  CirclePacking,
  Funnel,
  GeoMap,
  HeatMap,
  Line,
  Marimekko,
  Network,
  ParallelCoordinates,
  Pie,
  Radar,
  Sankey,
  ScatterPlot,
  Stream,
  Sunburst,
  SwarmPlot,
  TreeMap,
  Voronoi,
  Waffle,
} from './charts'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { css } from 'otion'
import { useChart } from './hooks'
import ChartContainer from './ChartContainer'
import Navigation from './Navigation'

console.clear()

function Title() {
  const [, flavor] = useChart()
  const { pathname } = useLocation()
  const title = pathname
    .slice(1)
    .split('-')
    .concat(flavor === 'svg' ? '' : flavor)
    .map((text) =>
      text.replace(/((^| )(.))/g, (letter) => letter.toUpperCase())
    )

  return <h1 className={css({ textAlign: 'center' })}>{title}</h1>
}

function Welcome() {
  return (
    <div className={css({ fontSize: '1.2em', textAlign: 'center' })}>
      <div>
        Welcome to <strong>nivo</strong>'s CodeSandbox examples!
      </div>
      <br />
      <div>
        Here would be a great starting point to fork and create a reproduction
        for your bug report.
      </div>
      <br />
      <div>
        This example will also be built with every PR and make it easier to
        verify a bugfix or new feature.
      </div>
      <br />
      <div>
        You can get started by selecting the chart from the left side menu. You
        can find the charts in <code>src/charts</code> to modify to your needs.
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className={css({ display: 'flex', height: '100vh' })}>
        <Navigation />
        <div
          className={css({
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          })}>
          <ChartContainer title={<Title />}>
            <Routes>
              <Route path="" element={<Welcome />} />
              <Route path="area-bump" element={<AreaBump />} />
              <Route path="bar" element={<Bar />} />
              <Route path="bullet" element={<Bullet />} />
              <Route path="bump" element={<Bump />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="chord" element={<Chord />} />
              <Route path="choropleth" element={<Choropleth />} />
              <Route path="circle-packing" element={<CirclePacking />} />
              <Route path="funnel" element={<Funnel />} />
              <Route path="geomap" element={<GeoMap />} />
              <Route path="heatmap" element={<HeatMap />} />
              <Route path="line" element={<Line />} />
              <Route path="marimekko" element={<Marimekko />} />
              <Route path="network" element={<Network />} />
              <Route
                path="parallel-coordinates"
                element={<ParallelCoordinates />}
              />
              <Route path="pie" element={<Pie />} />
              <Route path="radar" element={<Radar />} />
              <Route path="sankey" element={<Sankey />} />
              <Route path="scatterplot" element={<ScatterPlot />} />
              <Route path="stream" element={<Stream />} />
              <Route path="sunburst" element={<Sunburst />} />
              <Route path="swarmplot" element={<SwarmPlot />} />
              <Route path="treemap" element={<TreeMap />} />
              <Route path="voronoi" element={<Voronoi />} />
              <Route path="waffle" element={<Waffle />} />
            </Routes>
          </ChartContainer>
        </div>
      </div>
    </Router>
  )
}
