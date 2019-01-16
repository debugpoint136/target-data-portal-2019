import React from 'react';
import {DataSearch} from "@appbaseio/reactivesearch";

const SearchBar = () => {
    return (<DataSearch
        componentId="Search"
        dataField={["mouse", "accession", "status"]}
        categoryField="title"
        className="search-bar"
        queryFormat="and" //only results matching both “bat” and “man” will be returned
        placeholder="Search for experiments..."
        iconPosition="left"
        autosuggest={true}
        URLParams={true}
        filterLabel="search"/>);
}

export default SearchBar;