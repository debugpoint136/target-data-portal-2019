import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey'
// const DATA = require('./sankey-data.json');
// const DATA = require('./sankey-test.json');
const DATA = require('./distribution-all.json');

const SankeyWidget = () => {

    function onClick(inp) {
        // console.log('reaching here' + inp.source.id + inp.target.id);
        console.log('reaching here' + Object.keys(inp));
    }
    return ( 
        <ResponsiveSankey
            data={DATA}
            margin={{
                "top": 40,
                "right": 160,
                "bottom": 40,
                "left": 50
            }}
            align="justify"
            colors="category10"
            nodeOpacity={1}
            nodeWidth={18}
            nodeBorderColor="inherit:darker(0.8)"
            linkHoverOthersOpacity={0.1}
            enableLinkGradient={true}
            labelPosition="outside"
            labelOrientation="vertical"
            labelPadding={16}
            labelTextColor="inherit:darker(1)"
            animate={true}
            motionStiffness={120}
            motionDamping={11}
            onClick={onClick}
            legends={[
                {
                    "anchor": "bottom-right",
                    "direction": "column",
                    "translateX": 130,
                    "itemWidth": 100,
                    "itemHeight": 14,
                    "itemDirection": "right-to-left",
                    "itemsSpacing": 2,
                    "itemTextColor": "#999",
                    "symbolSize": 14,
                    "effects": [
                        {
                            "on": "hover",
                            "style": {
                                "itemTextColor": "#000"
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default SankeyWidget;