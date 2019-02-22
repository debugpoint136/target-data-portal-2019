import React from 'react';     
import {ResponsiveLine} from '@nivo/line';
import * as d3 from 'd3';

const LineChartBasic= (props) => {
    // const bottomTickValues = getBottomTickValues(props.data);
    // console.log(bottomTickValues);

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
            "tickSize": 0,
            "tickPadding": 10,
            // "tickValues": bottomTickValues,
            // "tickValues": [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
            // "tickCount": 11,
            "tickRotation": -45,
            "legend": props.xAxisLabel,
            "legendOffset": 46,
            "legendPosition": "center"
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "tickCount": 5,
            "legend": props.yAxisLabel,
            "legendOffset": -30,
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

export default LineChartBasic;

function split(min, max, parts) {
    const difference = max - min;
    const oneBit = difference / parts;

    const arrayToReturn = [min];

    for (let index = 0; index < parts; index++) {
        const item = min + oneBit * (index + 1);
        const itemRounded = Math.round(item / 10) * 10;
        arrayToReturn.push(itemRounded);
    }

    return arrayToReturn;
}

function getBottomTickValues(input) {
    const DATA = input[0].data;
    const xValues = Object.values(DATA).map(d => parseInt(d.x, 10));
    // console.log(xValues);
    const [min, max] = d3.extent(xValues);
    // console.log(min, max);
    const MIN = parseInt(min, 10);
    const MAX = parseInt(max, 10);
    const tickValues = split(MIN, MAX, 5);
    // console.log(tickValues);

    return tickValues;
}
