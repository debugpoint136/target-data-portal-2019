import React, {Component} from 'react';
import {ResponsiveBar} from '@nivo/bar';
const DATA = [
    {
        "country": "AD",
        "hot dog": 158,
        "hot dogColor": "hsl(305, 70%, 50%)",
        "burger": 89,
        "burgerColor": "hsl(261, 70%, 50%)",
        "sandwich": 195,
        "sandwichColor": "hsl(259, 70%, 50%)",
        "kebab": 132,
        "kebabColor": "hsl(39, 70%, 50%)",
        "fries": 110,
        "friesColor": "hsl(183, 70%, 50%)",
        "donut": 138,
        "donutColor": "hsl(224, 70%, 50%)"
    }, {
        "country": "AE",
        "hot dog": 27,
        "hot dogColor": "hsl(285, 70%, 50%)",
        "burger": 69,
        "burgerColor": "hsl(316, 70%, 50%)",
        "sandwich": 46,
        "sandwichColor": "hsl(182, 70%, 50%)",
        "kebab": 74,
        "kebabColor": "hsl(282, 70%, 50%)",
        "fries": 20,
        "friesColor": "hsl(188, 70%, 50%)",
        "donut": 63,
        "donutColor": "hsl(243, 70%, 50%)"
    }, {
        "country": "AF",
        "hot dog": 122,
        "hot dogColor": "hsl(94, 70%, 50%)",
        "burger": 167,
        "burgerColor": "hsl(7, 70%, 50%)",
        "sandwich": 132,
        "sandwichColor": "hsl(291, 70%, 50%)",
        "kebab": 94,
        "kebabColor": "hsl(155, 70%, 50%)",
        "fries": 150,
        "friesColor": "hsl(225, 70%, 50%)",
        "donut": 127,
        "donutColor": "hsl(221, 70%, 50%)"
    }, {
        "country": "AG",
        "hot dog": 134,
        "hot dogColor": "hsl(294, 70%, 50%)",
        "burger": 59,
        "burgerColor": "hsl(247, 70%, 50%)",
        "sandwich": 116,
        "sandwichColor": "hsl(353, 70%, 50%)",
        "kebab": 132,
        "kebabColor": "hsl(21, 70%, 50%)",
        "fries": 163,
        "friesColor": "hsl(282, 70%, 50%)",
        "donut": 174,
        "donutColor": "hsl(218, 70%, 50%)"
    }, {
        "country": "AI",
        "hot dog": 135,
        "hot dogColor": "hsl(40, 70%, 50%)",
        "burger": 10,
        "burgerColor": "hsl(203, 70%, 50%)",
        "sandwich": 99,
        "sandwichColor": "hsl(49, 70%, 50%)",
        "kebab": 39,
        "kebabColor": "hsl(31, 70%, 50%)",
        "fries": 29,
        "friesColor": "hsl(160, 70%, 50%)",
        "donut": 140,
        "donutColor": "hsl(342, 70%, 50%)"
    }, {
        "country": "AL",
        "hot dog": 187,
        "hot dogColor": "hsl(256, 70%, 50%)",
        "burger": 97,
        "burgerColor": "hsl(182, 70%, 50%)",
        "sandwich": 47,
        "sandwichColor": "hsl(274, 70%, 50%)",
        "kebab": 17,
        "kebabColor": "hsl(46, 70%, 50%)",
        "fries": 123,
        "friesColor": "hsl(250, 70%, 50%)",
        "donut": 111,
        "donutColor": "hsl(315, 70%, 50%)"
    }, {
        "country": "AM",
        "hot dog": 136,
        "hot dogColor": "hsl(104, 70%, 50%)",
        "burger": 117,
        "burgerColor": "hsl(111, 70%, 50%)",
        "sandwich": 141,
        "sandwichColor": "hsl(170, 70%, 50%)",
        "kebab": 64,
        "kebabColor": "hsl(214, 70%, 50%)",
        "fries": 53,
        "friesColor": "hsl(313, 70%, 50%)",
        "donut": 93,
        "donutColor": "hsl(140, 70%, 50%)"
    }
];

const ToyGraph = () => {
    return (
    <ResponsiveBar
        data={DATA}
        keys={[
        "hot dog",
        "burger",
        "sandwich",
        "kebab",
        "fries",
        "donut"
    ]}
        indexBy="country"
        margin={{
        "top": 50,
        "right": 130,
        "bottom": 50,
        "left": 60
    }}
        padding={0.3}
        colors="nivo"
        colorBy="id"
        defs={[
        {
            "id": "dots",
            "type": "patternDots",
            "background": "inherit",
            "color": "#38bcb2",
            "size": 4,
            "padding": 1,
            "stagger": true
        }, {
            "id": "lines",
            "type": "patternLines",
            "background": "inherit",
            "color": "#eed312",
            "rotation": -45,
            "lineWidth": 6,
            "spacing": 10
        }
    ]}
        fill={[
        {
            "match": {
                "id": "fries"
            },
            "id": "dots"
        }, {
            "match": {
                "id": "sandwich"
            },
            "id": "lines"
        }
    ]}
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
        "tickRotation": 0,
        "legend": "food",
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
            "translateX": 120,
            "itemWidth": 100,
            "itemHeight": 20,
            "itemsSpacing": 2,
            "symbolSize": 20
        }
    ]}
        theme={{
        "tooltip": {
            "container": {
                "fontSize": "13px"
            }
        },
        "labels": {
            "textColor": "#555"
        }
    }}/>);
}

export default ToyGraph;
