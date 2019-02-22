import React from 'react';
import LineChartBasic from '../components/LineChartBasic';
import SANITIZED_LABELS from './sanitized_labels.json';

const InsertionSizeDistribution = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        const formattedData = formatData(props.data);
        return (
            <LineChartBasic data={formattedData}/>
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
            const insertion_size_val = Number.parseFloat(d.toFixed(2)) ;
            tmp.data.push({x: insertion_size_val, y: Number.parseFloat(DENSITY[i].toFixed(2))});
        }
    });
    formattedData.push(tmp);

    return formattedData;
}