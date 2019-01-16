import React from 'react';
import BarGroupChartSimple from '../components/BarGroupChartSimple';
// import SANITIZED_LABELS from './sanitized_labels.json';

const MappingSummary = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        const formattedData = formatData(props.data);
        return (
            <BarGroupChartSimple data={formattedData} keys={KEYS} />
        );
    }
}

export default MappingSummary;

function formatData(data) {
    const MAPPING_STATS_DATA = data['mapping_stats'];
    const { total_reads, mapped_reads, uniquely_mapped_reads, useful_single_ends } = MAPPING_STATS_DATA;
    const non_redundant_mapped_reads = MAPPING_STATS_DATA['non-redundant_mapped_reads'];

    let tmp = [{
        'type': 'Reads stats',
        'Total Reads': total_reads,
        'Mapped Reads': mapped_reads,
        'Uniquely Mapped Reads': uniquely_mapped_reads,
        'Useful Single Reads': useful_single_ends,
        'Non redundant mapped': non_redundant_mapped_reads
    }];    

    return tmp;
}


const KEYS = [
    'Total Reads',
    'Mapped Reads',
    'Uniquely Mapped Reads',
    'Useful Single Reads',
    'Non redundant mapped'
];