import React, { Component } from 'react';
import RowNeatDisplay from './RowNeatDisplay';

const KeyQCmetrics = (props) => {
    const entries = Object.entries(props.data);
    return ( 
        <div className="m-2 p-2">
            <RowNeatDisplay data={entries[0]}/>
            <RowNeatDisplay data={entries[1]}/>
            <RowNeatDisplay data={entries[2]}/>
        </div>
    );
}

export default KeyQCmetrics;


