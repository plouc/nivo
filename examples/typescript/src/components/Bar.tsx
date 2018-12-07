import * as React from 'react'
import { ResponsiveBar } from '@nivo/bar'

interface BarDatum {
    id: string
    a: number
    b: number
    c: number
}

export default class Bar extends React.Component {
    public render() {
        return (
            <div
                style={{
                    height: 400,
                }}
            >
                <ResponsiveBar<BarDatum>
                    data={[
                        {
                            id: 'thing A',
                            a: 1.1,
                            b: 1.2,
                            c: 1.4,
                        },
                    ]}
                    indexBy="id"
                    keys={['a', 'b', 'c']}
                />
            </div>
        )
    }
}
