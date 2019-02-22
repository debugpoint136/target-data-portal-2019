import React from 'react';
import GroupedBarChartComponentSimple from '../components/GroupedBarChartComponentSimple';

const PeakNumbers = (props) => {

    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        // const formattedData = formatData(props.data);
        return (
            <GroupedBarChartComponentSimple data={DATA} keys={KEYS} />
        );
    }
}

export default PeakNumbers;

// "reads_number_under_peaks":int28446521
// "peaks_number_in_promoter_regions":int18373
// "peaks_number_in_non-promoter_regions":int102326

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

// "reads_number_under_peaks":int28446521
// "peaks_number_in_promoter_regions":int18373
// "peaks_number_in_non-promoter_regions":int102326



const DATA = [
    {
        "Dataset": ".",
        // "Reads under peaks": 28446521,
        "Peaks in promoter regions": 18373,
        "Peaks in non-promoter regions": 102326
    }
]


const KEYS = [
    "Peaks in promoter regions",
    "Peaks in non-promoter regions"
];
