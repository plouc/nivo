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
} from './charts'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChartContainer from './ChartContainer'
import Navigation from './Navigation'

console.clear()

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navigation />
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}>
          <h1 style={{ textAlign: 'center' }}>nivo</h1>
          <ChartContainer>
            <Routes>
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
            </Routes>
          </ChartContainer>
        </div>
      </div>
    </Router>
  )
}
