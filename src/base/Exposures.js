import React from 'react';
import {MultiList} from "@appbaseio/reactivesearch";

const Exposures = () => {
    return (<MultiList
        componentId="Exposure"
        dataField="Exposure.keyword"
        className="genres-filter"
        size={10}
        sortBy="asc"
        queryFormat="or"
        // selectAllLabel="All exposures"
        showCheckbox={true}
        showCount={true}
        showSearch={true}
        placeholder="Search for exposure type"
        react={{
            or: [
                "Age", "Assay", "Tissue",  "Lab", "Search", "Experiment", "Sex"
            ]
        }}
        showFilter={true}
        filterLabel="Exposure type"
        URLParams={true}
        innerClass={{
        label: "list-item",
        input: "list-input"
    }}/>);
}

export default Exposures;