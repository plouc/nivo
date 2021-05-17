import { AreaBump, Bar, Bullet } from './charts'
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
            </Routes>
          </ChartContainer>
        </div>
      </div>
    </Router>
  )
}
