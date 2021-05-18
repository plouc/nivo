import { ChartContext } from './contexts'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'

type ChartContainerProps = {
  children: ReactNode
}

const canvases = ['bar', 'calendar', 'chord', 'choropleth']

export default function ChartContainer({ children }: ChartContainerProps) {
  const [key, setKey] = useState(0)
  const [isCanvas, setIsCanvas] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setIsCanvas(false)
  }, [pathname])

  return (
    <ChartContext.Provider value={[key, isCanvas]}>
      <button onClick={() => setKey((k) => k + 1)}>Generate Data</button>
      <Routes>
        {canvases.map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <button onClick={() => setIsCanvas((value) => !value)}>
                Use Canvas
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
