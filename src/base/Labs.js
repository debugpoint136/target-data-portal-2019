import React from 'react';
import {MultiList} from "@appbaseio/reactivesearch";

const Labs = () => {
    return (<MultiList
        componentId="Lab"
        dataField="Lab.keyword"
        className="genres-filter"
        size={20}
        sortBy="asc"
        queryFormat="or"
        // selectAllLabel="All labs"
        showCheckbox={true}
        showCount={true}
        showSearch={true}
        placeholder="Search for Lab"
        react={{
            or: [
                "Age", "Assay", "Tissue", "Exposure", "Search", "Experiment", "Sex"
            ]
        }}
        showFilter={true}
        filterLabel="Lab"
        URLParams={true}
        innerClass={{
        label: "list-item",
        input: "list-input"
    }}/>);
}

export default Labs;