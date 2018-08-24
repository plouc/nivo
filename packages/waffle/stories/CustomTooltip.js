import React from 'react'

const CustomTooltip = node => (
    <div
        style={{
            color: node.color,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '12px',
        }}
    >
        <span style={{ fontWeight: 600 }}>label</span>
        <span>{node.label}</span>
        <span style={{ fontWeight: 600 }}>id</span>
        <span>{node.id}</span>
        <span style={{ fontWeight: 600 }}>value</span>
        <span>{node.value}</span>
        <span style={{ fontWeight: 600 }}>position</span>
        <span>{node.position}</span>
        <span style={{ fontWeight: 600 }}>groupIndex</span>
        <span>{node.groupIndex}</span>
        <span style={{ fontWeight: 600 }}>row</span>
        <span>{node.row}</span>
        <span style={{ fontWeight: 600 }}>column</span>
        <span>{node.column}</span>
        <span style={{ fontWeight: 600 }}>color</span>
        <span>{node.color}</span>
    </div>
)

export default CustomTooltip
