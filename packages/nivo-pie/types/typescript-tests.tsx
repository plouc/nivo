import { Pie, ResponsivePie } from "@nivo/pie";

const data = [
    {
        id: "stylus",
        label: "stylus",
        value: 38,
        color: "hsl(26, 70%, 50%)"
    },
    {
        id: "javascript",
        label: "javascript",
        value: 159,
        color: "hsl(94, 70%, 50%)"
    },
    {
        id: "go",
        label: "go",
        value: 120,
        color: "hsl(36, 70%, 50%)"
    }
];
const PieComponent = (
    <Pie
        height={150}
        width={150}
        data={[]}
        margin={{
            "top": 40,
            "right": 80,
            "bottom": 80,
            "left": 80
        }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors="d320c"
        colorBy="id"
        borderColor="inherit:darker(0.6)"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={null}
        theme={{
            "tooltip": {
                "container": {
                    "fontSize": "13px"
                }
            },
            "labels": {
                "textColor": "#555"
            }
        }}
        legends={
            [
                {
                    "anchor": "bottom",
                    "direction": "row",
                    "translateY": 56,
                    "itemWidth": 100,
                    "itemHeight": 14,
                    "symbolSize": 14,
                    "symbolShape": "circle"
                }
            ]}
    />
);

const ResponsivePieComponent = <ResponsivePie
    data={data}
    margin={{
        "top": 40,
        "right": 80,
        "bottom": 80,
        "left": 80
    }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors="d320c"
    colorBy="id"
    borderColor="inherit:darker(0.6)"
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor="inherit"
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    tooltip={null}
    theme={{
        "tooltip": {
            "container": {
                "fontSize": "13px"
            }
        },
        "labels": {
            "textColor": "#555"
        }
    }}
    legends={[
        {
            "anchor": "bottom",
            "direction": "row",
            "translateY": 56,
            "itemWidth": 100,
            "itemHeight": 14,
            "symbolSize": 14,
            "symbolShape": "circle"
        }
    ]}
/>