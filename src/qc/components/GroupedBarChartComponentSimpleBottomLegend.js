import React from 'react';
import {ResponsiveBar} from '@nivo/bar';


const GroupedBarChartComponentSimpleBottomLegend = (props) => {
    return (<ResponsiveBar
        data={props.data}
        keys={props.keys}
        indexBy="Dataset"
        margin={{
        "top": 10,
        "right": 220,
        "bottom": 75,
        "left": 60
    }}
        padding={0.1}
        innerPadding={4}
        groupMode="grouped"
        colors="nivo"
        borderColor="inherit:darker(1.6)"
        axisBottom={{
            "orient": "bottom",
            "tickSize": 0,
            "tickPadding": 5,
            "tickRotation": 0,
            "format": () => null,
        }}
        // axisBottom={{
        // "orient": "bottom",
        // "tickSize": 5,
        // "tickPadding": 5,
        // "tickRotation": 0,
        // "legend": "Dataset",
        // "legendPosition": "center",
        // "legendOffset": 36
        // }}
        axisLeft={{
        "orient": "left",
        "tickSize": 5,
        "padding": 0.8,
        "tickRotation": 0,
        "tickCount": 3,
        "legend": "",
        "legendPosition": "center",
        "legendOffset": -40
    }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[{
            "dataFrom": "keys",
            "anchor": "bottom-left",
            "direction": "column",
            "justify": false,
            "translateX": -20,
            "translateY": 60,
            "itemsSpacing": 2,
            "itemWidth": 120,
            "itemHeight": 20,
            "itemDirection": "left-to-right",
            "itemOpacity": 0.85,
            "symbolSize": 10,
            "effects": [
                {
                    "on": "hover",
                    "style": {
                        "itemOpacity": 1
                    }
                }
            ]
        }
    ]}
        theme={{
        "tooltip": {
            "container": {
                "fontSize": "8px"
            }
        },
        "labels": {
            "textColor": "#555",
            "fontSize": "4"
        }
    }}/>);
}

export default GroupedBarChartComponentSimpleBottomLegend;