import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to="/">Home</Link>
      <Link to="area-bump">AreaBump</Link>
      <Link to="bar">Bar</Link>
      <Link to="bullet">Bullet</Link>
      <Link to="bump">Bump</Link>
      <Link to="calendar">Calendar</Link>
      <Link to="chord">Chord</Link>
      <Link to="choropleth">Choropleth</Link>
      <Link to="circle-packing">CirclePacking</Link>
      <Link to="funnel">Funnel</Link>
      <Link to="geomap">GeoMap</Link>
      <Link to="heatmap">HeatMap</Link>
      <Link to="line">Line</Link>
      <Link to="marimekko">Marimekko</Link>
      <Link to="network">Network</Link>
      <Link to="parallel-coordinates">ParallelCoordinates</Link>
      <Link to="pie">Pie</Link>
      <Link to="radar">Radar</Link>
      <Link to="sankey">Sankey</Link>
      <Link to="scatterplot">ScatterPlot</Link>
      <Link to="stream">Stream</Link>
      <Link to="sunburst">Sunburst</Link>
    </div>
  )
}
