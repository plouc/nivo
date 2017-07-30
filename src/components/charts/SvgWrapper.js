import React from 'react'

const SvgWrapper = ({ width, height, margin, children }) =>
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
            {children}
        </g>
    </svg>

export default SvgWrapper
