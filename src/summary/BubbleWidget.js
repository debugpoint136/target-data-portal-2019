import React from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
// const DATA = require('../json/all.json');
const DATA = require('../json/all.formatted.json');
// const DATA = require('./bubble.data.json');

const BubbleWidget = () => {
    function onClick(input) {
        const { height, r, y, path } = input;
        if (height === 0 && r === y) {
            console.log(path);
            const list = splitPath(path);
            const redirectLink = constructCellRedirectLink(list);
            window.location.href = redirectLink;
        }
    }
    return ( 
        <ResponsiveBubble
            root={DATA}
            margin={{
                "top": 20,
                "right": 20,
                "bottom": 20,
                "left": 20
            }}
            identity="key"
            value="value"
            // colors="purple_blue"
            colors="yellow_green_blue"
            colorBy="key"
            padding={6}
            labelTextColor="inherit:darker(0.8)"
            borderWidth={2}
            defs={[
                {
                    "id": "lines",
                    "type": "patternLines",
                    "background": "none",
                    "color": "inherit",
                    "rotation": -45,
                    "lineWidth": 5,
                    "spacing": 8
                }
            ]}
            fill={[
                {
                    "match": {
                        "depth": 1
                    },
                    "id": "lines"
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={12}
            onClick={onClick}
        />
    );
}

export default BubbleWidget;


function splitPath(path) {
    const cleanPath = path.replace('PM2.5 ENVO:01000415', 'pm2_5+envo%3A01000415');
    // PM2.5 ENVO:01000415.RNA-seq.Liver.3 weeks.Mutlu Lab.all
    const parts = cleanPath.split('.');
    const filtered_parts_str = parts.slice(0,-1).join('%20');
    return filtered_parts_str.replace("_",".");
}

// https://dcc.dev-targetepigenomics.org/?Search=%22pm2.5+envo%3A01000415+rna-seq%22

const URLBASE = 'https://dcc.dev-targetepigenomics.org';

function constructCellRedirectLink(str) {
    const urlConstructed = `${URLBASE}/?Search="${str.toLowerCase()}"`;
    return urlConstructed;    
}