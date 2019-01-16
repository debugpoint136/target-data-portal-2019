import React from 'react';
import { parseStringAndSplitBy_, getPercentage } from './utils';

const RowNeatDisplay = (props) => {
    return ( 
        <div className="flex justify-between border-rounded border-2 border-green-lightest m-2 p-2">
            <div className="text-grey-darker rounded mr-2">{ parseStringAndSplitBy_(props.data[0])}</div>
            { (props.percentage) ?
            <div className="font-bold text-grey-darker font-mono">{ getPercentage(props.data[1]) }</div>
            : <div className="font-bold text-grey-darker font-mono">{ props.data[1] }</div>
            }
        </div>
    );
}

export default RowNeatDisplay;