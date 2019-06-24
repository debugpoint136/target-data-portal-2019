import React from 'react';
import {DataSearch} from "@appbaseio/reactivesearch";

const SearchBar = () => {
    return (<DataSearch
        componentId="Search"
        dataField={["mouse", "accession", "status", "biosample", "assay", "Exposure", "Assay", "Tissue", "Age", "uuid", "Lab", "submission", "experiment", "experiment_set"]}
        categoryField="title"
        // className="search-bar"
        queryFormat="and" //only results matching both “bat” and “man” will be returned
        placeholder="Search by Assay, Tissue, UUID, Lab, or Exposure etc..."
        iconPosition="left"
        autosuggest={true}
        URLParams={true}
        filterLabel="search"/>);
}

export default SearchBar;