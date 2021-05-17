import { ReactNode, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ChartContext } from './contexts'

type ChartContainerProps = {
  children: ReactNode
}

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
        <Route
          path="bar"
          element={
            <button onClick={() => setIsCanvas((value) => !value)}>
              Use Canvas
            </button>
          }
        />
      </Routes>
      <div style={{ height: 400, margin: '0 auto', width: 500 }}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}
