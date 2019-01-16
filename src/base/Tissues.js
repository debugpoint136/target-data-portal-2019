import React from 'react';
import {MultiList} from "@appbaseio/reactivesearch";

const Tissues = () => {
    return (<MultiList
        componentId="Tissue"
        dataField="Tissue.keyword"
        className="genres-filter"
        size={20}
        sortBy="asc"
        queryFormat="or"
        // selectAllLabel="All tissues"
        showCheckbox={true}
        showCount={true}
        // showSearch={true}
        // placeholder="Search tissue"
        react={{
            or: [
                "Age", "Assay", "Exposure", "Lab", "Search", "Experiment", "Sex"
            ]
        }}
        showFilter={true}
        filterLabel="Tissue"
        URLParams={true}
        innerClass={{
        label: "list-item",
        input: "list-input"
    }}/>);
}

export default Tissues;