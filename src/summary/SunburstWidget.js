import React from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst'
// const DATA = require('./sunburst.data.json');
const DATA = require('../json/all.json');

const SunburstWidget = () => {
    return ( 
        <ResponsiveSunburst
        data={DATA}
        margin={{
            "top": 40,
            "right": 20,
            "bottom": 20,
            "left": 20
        }}
        // identity="name"
        identity="key"
        // value="loc"
        value="value"
        cornerRadius={2}
        borderWidth={1}
        borderColor="white"
        colors="paired"
        colorBy="id"
        childColor="inherit"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
    />
    );
}

export default SunburstWidget;