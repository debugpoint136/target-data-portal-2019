import React, { Component } from 'react';
import {ResponsiveBar} from '@nivo/bar';

class BarGroupChartSimple extends Component {
    state = {}
    render() {
        return (<ResponsiveBar
            data={this.props.data}
            keys={this.props.keys}
            indexBy="type"
            margin={{
            "top": 50,
            "right": 170,
            "bottom": 50,
            "left": 60
        }}
            padding={0.1}
            groupMode="grouped"
            colors="nivo"
            borderColor="inherit:darker(1.6)"
            axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "country",
            "legendPosition": "center",
            "legendOffset": 36
        }}
            axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0, // "legend": "food", 
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
                "anchor": "bottom-right",
                "direction": "column",
                "justify": false,
                "translateX": 120,
                "translateY": 0,
                "itemsSpacing": 2,
                "itemWidth": 140,
                "itemHeight": 20,
                "itemDirection": "left-to-right",
                "itemOpacity": 0.85,
                "symbolSize": 20,
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemOpacity": 1
                        }
                    }
                ]
            }
        ]}/>);
    }
}

export default BarGroupChartSimple;