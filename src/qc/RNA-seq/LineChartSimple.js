import React from 'react';
import LineChartComponent from '../components/LineChartComponent';

const LineChartSimple = (props) => {
    const { xAxisData, yAxisData, xAxisLabel, yAxisLabel } = props;
    const formattedData = formatData(xAxisData, yAxisData);
    return (
        <LineChartComponent data={formattedData} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel}/>
    );
}

export default LineChartSimple;

function formatData(xAxisData, yAxisData) {
    const formattedData = [];    
    let tmp = {};
    tmp.id = '';
    tmp.data = [];
    yAxisData.forEach((d, i) => {
        if (i % 10 === 0) {
        tmp.data.push({x: xAxisData[i], y: d});
        }
    });
    formattedData.push(tmp);
        
    return formattedData;
}