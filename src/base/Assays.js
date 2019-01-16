import React from 'react';
import {MultiList} from "@appbaseio/reactivesearch";

const Assays = () => {
    return (<MultiList
        componentId="Assay"
        dataField="Assay.keyword"
        className="genres-filter"
        size={20}
        sortBy="asc"
        queryFormat="or"
        // selectAllLabel="All Assays"
        showCheckbox={true}
        showCount={true}
        // showSearch={true}
        // placeholder="Select assay"
        react={{
            or: [
                "Age", "Tissue", "Exposure", "Lab", "Search", "Experiment", "Sex"
            ]
        }}
        // showFilter={true}
        filterLabel="Assay"
        URLParams={true}
        innerClass={{
        label: "list-item",
        input: "list-input"
    }}/>);
}

export default Assays;