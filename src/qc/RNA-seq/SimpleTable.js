import React from 'react';
import RowNeatDisplayLean from './RowNeatDisplayLean';
const SimpleTable = (props) => {
    const entries = Object.entries(props.data);
    return ( 
        <div className="m-2 p-2">
            {entries.map((entry, index) => <RowNeatDisplayLean key={`${props.type}-${index}`} data={entry}/>)}
        </div>
    );
}

export default SimpleTable;