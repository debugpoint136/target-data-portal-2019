import React from 'react';
import {MultiList} from "@appbaseio/reactivesearch";

const Sex = () => {
    return (
        <MultiList
        componentId="Sex"
        dataField="Sex.keyword"
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
        filterLabel="Sex"
        URLParams={true}
        innerClass={{
        label: "list-item",
        input: "list-input"
        }}
    />);
}

export default Sex;