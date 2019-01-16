import React from 'react';
// import GroupedBarChartComponent from '../components/GroupedBarChartComponent';
import SANITIZED_LABELS from './sanitized_labels.json';
import LineChartComponent from '../components/LineChartComponent';

const Saturation = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        const formattedData = formatData(props.data, props.show);
    return (
            <LineChartComponent data={formattedData}/>
    );
    }
}

export default Saturation;

function formatData(data, key) {
    const formattedData = [];
    const SATURATION = data['saturation'];
    let PEAKS_NUMBER = SATURATION['peaks_number'];

    switch (key) {
        case 'Number of Peaks':
            PEAKS_NUMBER = SATURATION['peaks_number'];
            break;
        case 'Number of Peaks Recaptured':
            PEAKS_NUMBER = SATURATION['percentage_of_peak_region_recaptured'];
            break;
        default:
            break;
    }
    const SEQUENCING_DEPTH = SATURATION['sequence_depth'];
    // const PEAKS_NUMBER = SATURATION['peaks_number'];

    let tmp = {};
    tmp.id = SANITIZED_LABELS['sequence_depth'];
    tmp.data = [];
    SEQUENCING_DEPTH.forEach((d, i) => {
        tmp.data.push({x: d, y: PEAKS_NUMBER[i]});
    });
    formattedData.push(tmp);

    return formattedData;
}