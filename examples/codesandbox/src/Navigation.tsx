import { NavLink } from 'react-router-dom'
import { css } from 'otion'

const activeStyles = {
  background: 'rgb(0 0 0 / 10%)',
  borderLeft: '3px solid #f47560',
  paddingLeft: 9,
}
const active = css(activeStyles)
const link = css({
  color: '#2b2b2b',
  padding: '6px 12px',
  textDecoration: 'none',
  transition: 'all 0.2s linear',
  transitionProperty: 'background',

  ':hover': activeStyles,
})

export default function Navigation() {
  return (
    <div
      className={css({
        background: 'rgb(0 0 0 / 5%)',
        boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 6px',
        display: 'flex',
        flexDirection: 'column',
      })}>
      <NavLink activeClassName={active} className={link} end to="/">
        Home
      </NavLink>
      {[
        ['area-bump', 'AreaBump'],
        ['bar', 'Bar'],
        ['bullet', 'Bullet'],
        ['bump', 'Bump'],
        ['calendar', 'Calendar'],
        ['chord', 'Chord'],
        ['choropleth', 'Choropleth'],
        ['circle-packing', 'CirclePacking'],
        ['funnel', 'Funnel'],
        ['geomap', 'GeoMap'],
        ['heatmap', 'HeatMap'],
        ['line', 'Line'],
        ['marimekko', 'Marimekko'],
        ['network', 'Network'],
        ['parallel-coordinates', 'ParallelCoordinates'],
        ['pie', 'Pie'],
        ['radar', 'Radar'],
        ['sankey', 'Sankey'],
        ['scatterplot', 'ScatterPlot'],
        ['stream', 'Stream'],
        ['sunburst', 'Sunburst'],
        ['swarmplot', 'SwarmPlot'],
        ['treemap', 'TreeMap'],
        ['voronoi', 'Voronoi'],
        ['waffle', 'Waffle'],
      ].map(([to, children]) => (
        <NavLink key={to} activeClassName={active} className={link} to={to}>
          {children}
        </NavLink>
      ))}
    </div>
  )
}
