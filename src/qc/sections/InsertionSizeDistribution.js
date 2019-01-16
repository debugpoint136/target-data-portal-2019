import React from 'react';
import LineChartComponent from '../components/LineChartComponent';
import SANITIZED_LABELS from './sanitized_labels.json';

const InsertionSizeDistribution = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        const formattedData = formatData(props.data);
        return (
            <LineChartComponent data={formattedData}/>
        );
    }
}

export default InsertionSizeDistribution;

function formatData(data) {
    const formattedData = [];
    const INSERT_SIZE_DISTRIBUTION_DATA = data['insertion_size_distribution'];
    const INSERTION_SIZE = INSERT_SIZE_DISTRIBUTION_DATA['insertion_size'];
    const DENSITY = INSERT_SIZE_DISTRIBUTION_DATA['density'];

    let tmp = {};
    tmp.id = SANITIZED_LABELS['insertion_size'];
    tmp.data = [];
    INSERTION_SIZE.forEach((d, i) => {
        if (i % 50 === 0) {
            const insertion_size_val = parseFloat(d).toFixed(2);
            tmp.data.push({x: insertion_size_val, y: DENSITY[i]});
        }
    });
    formattedData.push(tmp);

    return formattedData;
}