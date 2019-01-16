import React from 'react';
import {MultiList} from "@appbaseio/reactivesearch";

const Age = () => {
    return (
        <MultiList
        componentId="Age"
        dataField="Age.keyword"
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
                "Tissue", "Exposure", "Lab", "Search", "Experiment", "Sex"
            ]
        }}
        // showFilter={true}
        filterLabel="Age"
        URLParams={true}
        innerClass={{
        label: "list-item",
        input: "list-input"
        }}
    />);
}

export default Age;