import React from 'react';
// import SANITIZED_LABELS from './sanitized_labels.json';
import LineChartComponent from '../components/LineChartComponent';

const YieldDistribution = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        const formattedData = formatData(props.data, props.show);
        return (
            <LineChartComponent data={formattedData}/>
        );
    }
}

export default YieldDistribution;

function formatData(data, key) {
    const formattedData = [];
    const YIELD_DISTRIBUTION = data['yield_distribution'];
    let YaxisData = undefined;
    switch (key) {
        case 'Expected Distinction':
            YaxisData = YIELD_DISTRIBUTION['expected_distinction'];
            break;
        case 'CI: Lower 0.95':
            YaxisData = YIELD_DISTRIBUTION['lower_0.95_confidnece_interval'];
            break;
        case 'CI: Upper 0.95':
            YaxisData = YIELD_DISTRIBUTION['upper_0.95_confidnece_interval'];
            break;
    
        default:
            break;
    }
    const TOTAL_READS = YIELD_DISTRIBUTION['total_reads'];

    
            let tmp = {};
            // tmp.id = `${SANITIZED_LABELS['expected_distinction']}-vs-${SANITIZED_LABELS['total_reads']}`;
            tmp.id = '';
            tmp.data = [];
            YaxisData.forEach((d, i) => {
                if (i % 10 === 0) {
                tmp.data.push({x: TOTAL_READS[i], y: d});
                }
            });
            formattedData.push(tmp);
        
    return formattedData;
}