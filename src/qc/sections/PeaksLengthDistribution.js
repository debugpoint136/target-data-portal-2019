import React from 'react';
import LineChartBasic from '../components/LineChartBasic';
import SANITIZED_LABELS from './sanitized_labels.json';

const PeaksLengthDistribution = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        const formattedData = formatData(props.data);
        return (
            <LineChartBasic data={formattedData}/>
        );
    }
}

export default PeaksLengthDistribution;

function formatData(data) {
    const formattedData = [];
    const PEAK_LENGTH_DISTRIBUTION_DATA = data['peak_length_distribution'];
    const PEAK_LENGTH = PEAK_LENGTH_DISTRIBUTION_DATA['peak_length'];
    const DENSITY = PEAK_LENGTH_DISTRIBUTION_DATA['density'];

    let tmp = {};
    tmp.id = SANITIZED_LABELS['peak_length_distribution'];
    tmp.data = [];
    
    PEAK_LENGTH.forEach((d, i) => {
        if (i % 50 === 0) {
            const peak_length_val = parseFloat(d.toFixed(2));
            tmp.data.push({x: peak_length_val, y: parseFloat(DENSITY[i].toFixed(2))});
        }
    });
    formattedData.push(tmp);
    console.log(formattedData);

    return formattedData;
}