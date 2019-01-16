import React from 'react';
import GroupedBarChartComponent from '../components/GroupedBarChartComponent';

const LibraryComplexity = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        // const formattedData = formatData(props.data);
        return (
                <GroupedBarChartComponent/>
        );
    }
}

export default LibraryComplexity;
/*
function formatData(data) {
    const formattedData = [];
    const PERCENTAGE_MAPPED_AUTOSOME = data['mapping_distribution']['Percentage_of_non-redundant_uniquely_mapped_reads_in_autosome'];

    Object
        .keys(PERCENTAGE_MAPPED_AUTOSOME)
        .forEach((elem, i) => {
            const value = Number((parseFloat(PERCENTAGE_MAPPED_AUTOSOME[elem]) * 100).toFixed(2));
            let tmp = {
                id: elem,
                label: elem,
                value: value
            };

            formattedData.push(tmp);
        });

    return formattedData;
}
*/