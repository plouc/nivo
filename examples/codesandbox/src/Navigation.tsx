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
    </div>
  )
}
