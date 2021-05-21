import { ChartContext, Flavor } from './contexts'
import { ReactNode, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { css } from 'otion'

type ChartContainerProps = {
  children: ReactNode
  title: ReactNode
}

type ButtonProps = {
  children: ReactNode
  onClick: () => void
}

const canvases = [
  'bar',
  'calendar',
  'chord',
  'choropleth',
  'circle-packing',
  'geomap',
  'heatmap',
  'line',
  'network',
  'parallel-coordinates',
  'pie',
  'scatterplot',
  'swarmplot',
  'treemap',
  'waffle',
]
const htmls = ['circle-packing', 'treemap', 'waffle']

function Button({ children, onClick }: ButtonProps) {
  const [isPressing, setIsPressing] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPressing(false)
    }, 250)

    return () => clearTimeout(timeout)
  }, [isPressing])

  return (
    <button
      className={css({
        border: '2px solid #f47560',
        borderRadius: 5,
        color: '#f47560',
        cursor: 'pointer',
        padding: 10,
        transition: 'all 0.2s linear',
        transitionProperty: 'background border-color color opacity',
        width: 150,

        ...(isPressing ? { opacity: 0.8 } : {}),

        ':hover': {
          background: '#f47560',
          borderColor: '#ffffff',
          color: '#ffffff',
        },
      })}
      onClick={() => {
        setIsPressing(true)
        onClick()
      }}>
      {children}
    </button>
  )
}

export default function ChartContainer({
  children,
  title,
}: ChartContainerProps) {
  const [key, setKey] = useState(0)
  const [flavor, setFlavor] = useState<Flavor>('svg')
  const { pathname } = useLocation()

  useEffect(() => {
    setFlavor('svg')
  }, [pathname])

  return (
    <ChartContext.Provider value={[key, flavor]}>
      {title}
      <div
        className={css({ display: 'flex', gap: 10, justifyContent: 'center' })}>
        <Routes>
          <Route path="geomap" />
          <Route path="" />
          <Route
            path="*"
            element={
              <Button onClick={() => setKey((state) => state + 1)}>
                Generate Data
              </Button>
            }
          />
        </Routes>
        <Routes>
          {canvases.map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <Button
                  onClick={() =>
                    setFlavor((value) =>
                      value !== 'canvas' ? 'canvas' : 'svg'
                    )
                  }>
                  Use {flavor !== 'canvas' ? 'Canvas' : 'SVG'}
                </Button>
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
                <Button
                  onClick={() =>
                    setFlavor((value) => (value !== 'html' ? 'html' : 'svg'))
                  }>
                  Use {flavor !== 'html' ? 'HTML' : 'SVG'}
                </Button>
              }
            />
          ))}
        </Routes>
      </div>
      <div
        className={css({
          height: 400,
          margin: '0 auto',
          padding: 30,
          width: 500,
        })}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}
