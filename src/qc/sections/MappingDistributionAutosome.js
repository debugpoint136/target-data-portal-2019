import React from 'react';
import WaffleComponent from '../components/WaffleComponent';

const MappingDistributionAutosome = (props) => {
    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        const formattedData = formatData(props.data);
        return (
            <WaffleComponent data={formattedData}/>
        );
    }
}

export default MappingDistributionAutosome;

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

/**
 * const DATA = [
    {
      "id": "men",
      "label": "men",
      "value": 17.539367369764047,
      "color": "#468df3"
    }
  ];
 */