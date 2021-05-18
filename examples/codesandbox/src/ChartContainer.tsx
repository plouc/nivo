import { ChartContext, Flavor } from './contexts'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'

type ChartContainerProps = {
  children: ReactNode
}

const canvases = ['bar', 'calendar', 'chord', 'choropleth', 'circle-packing']
const htmls = ['circle-packing']

export default function ChartContainer({ children }: ChartContainerProps) {
  const [key, setKey] = useState(0)
  const [flavor, setFlavor] = useState<Flavor>('svg')
  const { pathname } = useLocation()

  useEffect(() => {
    setFlavor('svg')
  }, [pathname])

  return (
    <ChartContext.Provider value={[key, flavor]}>
      <Routes>
        <Route path="geo-map" />
        <Route
          path="*"
          element={
            <button onClick={() => setKey((k) => k + 1)}>Generate Data</button>
          }
        />
      </Routes>
      <Routes>
        {canvases.map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <button
                onClick={() =>
                  setFlavor((value) => (value !== 'canvas' ? 'canvas' : 'svg'))
                }>
                Use Canvas
              </button>
            }
          />
        ))}
      </Routes>
      <Routes>
        {htmls.map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <button
                onClick={() =>
                  setFlavor((value) => (value !== 'html' ? 'html' : 'svg'))
                }>
                Use HTML
              </button>
            }
          />
        ))}
      </Routes>
      <div style={{ height: 400, margin: '0 auto', padding: 30, width: 500 }}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}
