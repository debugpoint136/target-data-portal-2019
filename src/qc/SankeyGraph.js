import React, {Component} from 'react';
import {ResponsiveSankey} from '@nivo/sankey'

const DATA = {
    "nodes": [
        {
            "id": "John",
            "color": "hsl(145, 70%, 50%)"
        }, {
            "id": "Raoul",
            "color": "hsl(331, 70%, 50%)"
        }, {
            "id": "Jane",
            "color": "hsl(305, 70%, 50%)"
        }, {
            "id": "Marcel",
            "color": "hsl(47, 70%, 50%)"
        }, {
            "id": "Ibrahim",
            "color": "hsl(18, 70%, 50%)"
        }, {
            "id": "Junko",
            "color": "hsl(40, 70%, 50%)"
        }, {
            "id": "Lyu",
            "color": "hsl(62, 70%, 50%)"
        }, {
            "id": "André",
            "color": "hsl(246, 70%, 50%)"
        }, {
            "id": "Maki",
            "color": "hsl(347, 70%, 50%)"
        }, {
            "id": "Véronique",
            "color": "hsl(226, 70%, 50%)"
        }, {
            "id": "Thibeau",
            "color": "hsl(359, 70%, 50%)"
        }, {
            "id": "Josiane",
            "color": "hsl(186, 70%, 50%)"
        }, {
            "id": "Raphaël",
            "color": "hsl(317, 70%, 50%)"
        }
    ],
    "links": [
        {
            "source": "Jane",
            "target": "André",
            "value": 189
        }, {
            "source": "Junko",
            "target": "Maki",
            "value": 118
        }, {
            "source": "Junko",
            "target": "Jane",
            "value": 32
        }, {
            "source": "Lyu",
            "target": "Raphaël",
            "value": 6
        }, {
            "source": "Lyu",
            "target": "Thibeau",
            "value": 134
        }, {
            "source": "André",
            "target": "Thibeau",
            "value": 134
        }, {
            "source": "Ibrahim",
            "target": "Jane",
            "value": 183
        }, {
            "source": "Ibrahim",
            "target": "Véronique",
            "value": 181
        }, {
            "source": "Marcel",
            "target": "Josiane",
            "value": 120
        }, {
            "source": "Marcel",
            "target": "Maki",
            "value": 18
        }, {
            "source": "Josiane",
            "target": "André",
            "value": 137
        }, {
            "source": "Véronique",
            "target": "Lyu",
            "value": 34
        }, {
            "source": "Véronique",
            "target": "Raoul",
            "value": 140
        }, {
            "source": "John",
            "target": "Jane",
            "value": 198
        }, {
            "source": "John",
            "target": "Raphaël",
            "value": 33
        }, {
            "source": "Raoul",
            "target": "Raphaël",
            "value": 81
        }, {
            "source": "Maki",
            "target": "Jane",
            "value": 146
        }, {
            "source": "Thibeau",
            "target": "Raoul",
            "value": 12
        }
    ]
}
class SankeyGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<ResponsiveSankey
            data={DATA}
            margin={{
            "top": 40,
            "right": 160,
            "bottom": 40,
            "left": 50
        }}
            align="justify"
            colors="d320b"
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
            legends={[{
                "anchor": "bottom-right",
                "direction": "column",
                "translateX": 130,
                "itemWidth": 100,
                "itemHeight": 14,
                "itemDirection": "right-to-left",
                "itemsSpacing": 2,
                "symbolSize": 14
            }
        ]}/>);
    }
}

export default SankeyGraph;
