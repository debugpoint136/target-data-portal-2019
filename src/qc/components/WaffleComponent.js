import React from 'react';
import {ResponsiveWaffle} from '@nivo/waffle';

const WaffleComponent = (props) => {
    return <ResponsiveWaffle data={props.data} total={100} rows={10} columns={10} margin={{
        "top": 10,
        "right": 10,
        "bottom": 40,
        "left": 120
    }} 
    borderColor="inherit:darker(0.3)" 
    colors={'d320b'} 
    animate={true} 
    motionStiffness={90} 
    motionDamping={11} 
    fillDirection={'top'} 
    legends={[{
            "anchor": "top-left",
            "direction": "column",
            "justify": false,
            "translateX": -50,
            "translateY": 0,
            "itemsSpacing": 4,
            "itemWidth": 50,
            "itemHeight": 10,
            "itemDirection": "left-to-right",
            "itemOpacity": 1,
            "itemTextColor": "#777",
            "symbolSize": 10,
            "effects": [
                {
                    "on": "hover",
                    "style": {
                        "itemTextColor": "#000",
                        "itemBackground": "#f7fafb"
                    }
                }
            ]
        }
    ]} theme={{
        "tooltip": {
            "container": {
                "fontSize": "13px"
            }
        },
        "labels": {
            "textColor": "#555"
        }
    }}/>;
}

export default WaffleComponent;
