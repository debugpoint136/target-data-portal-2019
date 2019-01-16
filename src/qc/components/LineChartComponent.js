import React from 'react';     
import {ResponsiveLine} from '@nivo/line'

const LineChartComponent = (props) => {
    return <ResponsiveLine
        data={props.data}
        margin={{
            "top": 10,
            "right": 40,
            "bottom": 75,
            "left": 70
        }}
        minY="auto"
        colors="set2"
        stacked={false}
        // enableArea={true}
        enableDots={false}
        // enableLegend={true}
        curve="monotoneX"
        axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": -45,
            
            "legend": props.yAxisLabel,
            "legendOffset": 46,
            "legendPosition": "center"
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "tickCount": 5,
            "legend": props.xAxisLabel,
            "legendOffset": -60,
            "legendPosition": "center"
        }}
        // dotSize={2}
        // dotColor="inherit:darker(0.3)"
        // dotBorderWidth={2}
        // dotBorderColor="#ffffff"
        // enableDotLabel={true}
        // dotLabel="y"
        // dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[{
            "anchor": "bottom-right",
            "direction": "column",
            "justify": false,
            "translateX": 100,
            "translateY": 0,
            "itemsSpacing": 0,
            "itemDirection": "left-to-right",
            "itemWidth": 80,
            "itemHeight": 20,
            "itemOpacity": 0.75,
            "symbolSize": 12,
            "symbolShape": "circle",
            "symbolBorderColor": "rgba(0, 0, 0, .5)",
            "effects": [
                {
                    "on": "hover",
                    "style": {
                        "itemBackground": "rgba(0, 0, 0, .03)",
                        "itemOpacity": 1
                    }
                }
            ]
        }
    ]}/>
}

export default LineChartComponent;

/**
 * 
const DATA = [
    {
        "id": "whisky",
        "color": "hsl(192, 70%, 50%)",
        "data": [
            {
                "color": "hsl(101, 70%, 50%)",
                "x": "LU",
                "y": 32
            }, {
                "color": "hsl(190, 70%, 50%)",
                "x": "LB",
                "y": 46
            }, {
                "color": "hsl(218, 70%, 50%)",
                "x": "PF",
                "y": 36
            }, {
                "color": "hsl(196, 70%, 50%)",
                "x": "SY",
                "y": 24
            }, {
                "color": "hsl(9, 70%, 50%)",
                "x": "BB",
                "y": 13
            }, {
                "color": "hsl(88, 70%, 50%)",
                "x": "IL",
                "y": 54
            }, {
                "color": "hsl(99, 70%, 50%)",
                "x": "HR",
                "y": 50
            }, {
                "color": "hsl(82, 70%, 50%)",
                "x": "MO",
                "y": 49
            }, {
                "color": "hsl(305, 70%, 50%)",
                "x": "RW",
                "y": 45
            }
        ]
    }, {
        "id": "rhum",
        "color": "hsl(344, 70%, 50%)",
        "data": [
            {
                "color": "hsl(286, 70%, 50%)",
                "x": "LU",
                "y": 46
            }, {
                "color": "hsl(343, 70%, 50%)",
                "x": "LB",
                "y": 56
            }, {
                "color": "hsl(226, 70%, 50%)",
                "x": "PF",
                "y": 51
            }, {
                "color": "hsl(254, 70%, 50%)",
                "x": "SY",
                "y": 56
            }, {
                "color": "hsl(55, 70%, 50%)",
                "x": "BB",
                "y": 42
            }, {
                "color": "hsl(294, 70%, 50%)",
                "x": "IL",
                "y": 27
            }, {
                "color": "hsl(205, 70%, 50%)",
                "x": "HR",
                "y": 37
            }, {
                "color": "hsl(41, 70%, 50%)",
                "x": "MO",
                "y": 19
            }, {
                "color": "hsl(215, 70%, 50%)",
                "x": "RW",
                "y": 35
            }
        ]
    }, {
        "id": "gin",
        "color": "hsl(318, 70%, 50%)",
        "data": [
            {
                "color": "hsl(299, 70%, 50%)",
                "x": "LU",
                "y": 58
            }, {
                "color": "hsl(329, 70%, 50%)",
                "x": "LB",
                "y": 31
            }, {
                "color": "hsl(199, 70%, 50%)",
                "x": "PF",
                "y": 21
            }, {
                "color": "hsl(7, 70%, 50%)",
                "x": "SY",
                "y": 4
            }, {
                "color": "hsl(115, 70%, 50%)",
                "x": "BB",
                "y": 56
            }, {
                "color": "hsl(135, 70%, 50%)",
                "x": "IL",
                "y": 20
            }, {
                "color": "hsl(352, 70%, 50%)",
                "x": "HR",
                "y": 36
            }, {
                "color": "hsl(223, 70%, 50%)",
                "x": "MO",
                "y": 42
            }, {
                "color": "hsl(97, 70%, 50%)",
                "x": "RW",
                "y": 29
            }
        ]
    }, {
        "id": "vodka",
        "color": "hsl(290, 70%, 50%)",
        "data": [
            {
                "color": "hsl(227, 70%, 50%)",
                "x": "LU",
                "y": 39
            }, {
                "color": "hsl(230, 70%, 50%)",
                "x": "LB",
                "y": 45
            }, {
                "color": "hsl(270, 70%, 50%)",
                "x": "PF",
                "y": 8
            }, {
                "color": "hsl(221, 70%, 50%)",
                "x": "SY",
                "y": 7
            }, {
                "color": "hsl(290, 70%, 50%)",
                "x": "BB",
                "y": 51
            }, {
                "color": "hsl(155, 70%, 50%)",
                "x": "IL",
                "y": 34
            }, {
                "color": "hsl(177, 70%, 50%)",
                "x": "HR",
                "y": 60
            }, {
                "color": "hsl(69, 70%, 50%)",
                "x": "MO",
                "y": 8
            }, {
                "color": "hsl(183, 70%, 50%)",
                "x": "RW",
                "y": 6
            }
        ]
    }, {
        "id": "cognac",
        "color": "hsl(29, 70%, 50%)",
        "data": [
            {
                "color": "hsl(318, 70%, 50%)",
                "x": "LU",
                "y": 60
            }, {
                "color": "hsl(76, 70%, 50%)",
                "x": "LB",
                "y": 2
            }, {
                "color": "hsl(269, 70%, 50%)",
                "x": "PF",
                "y": 26
            }, {
                "color": "hsl(341, 70%, 50%)",
                "x": "SY",
                "y": 52
            }, {
                "color": "hsl(226, 70%, 50%)",
                "x": "BB",
                "y": 53
            }, {
                "color": "hsl(184, 70%, 50%)",
                "x": "IL",
                "y": 30
            }, {
                "color": "hsl(141, 70%, 50%)",
                "x": "HR",
                "y": 58
            }, {
                "color": "hsl(175, 70%, 50%)",
                "x": "MO",
                "y": 24
            }, {
                "color": "hsl(194, 70%, 50%)",
                "x": "RW",
                "y": 45
            }
        ]
    }
]
 */