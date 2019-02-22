import React from 'react';
// import WaffleComponent from '../components/WaffleComponent';
import LineChartBasic from '../components/LineChartBasic';

const MappingDistributionAutosome = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        const formattedData = formatData(props.data);
        return (
            <LineChartBasic data={formattedData} xAxisLabel="Chromosome" yAxisLabel="Percentage" />
        );
    }
}

export default MappingDistributionAutosome;

function formatData(data) {
    const formattedData = [];
    const PERCENTAGE_MAPPED_AUTOSOME = data['mapping_distribution']['Percentage_of_non-redundant_uniquely_mapped_reads_in_autosome'];
    let tmp = {};
    tmp.id = "Mapping Distribution";
    tmp.data = [];
    Object
        .keys(PERCENTAGE_MAPPED_AUTOSOME)
        .forEach((elem, i) => {
            const value = Number((parseFloat(PERCENTAGE_MAPPED_AUTOSOME[elem]) * 100).toFixed(2));
            // let tmp = {
            //     id: elem,
            //     label: elem,
            //     value: value,
            //     x: parseInt(elem.replace('chr', ''), 10),
            //     y: value
            // };
            
            tmp.data.push({x: parseInt(elem.replace('chr', ''), 10), y: value});

        });
        formattedData.push(tmp);

        console.log(formattedData);
    return formattedData;

}