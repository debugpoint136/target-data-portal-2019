import React from 'react';
import { parseStringAndSplitBy_, getPercentage } from './utils';

const RowNeatDisplayLean = (props) => {
    return ( 
        <div className="flex justify-between border-rounded border-t-2 border-t-green-lightest">
            <div className="text-grey-darker rounded bg-grey-lighter">{ parseStringAndSplitBy_(props.data[0])}</div>
            { (props.percentage) ?
            <div className="font-bold text-grey-darker font-mono">{ getPercentage(props.data[1]) }</div>
            : <div className="font-bold text-grey-darker font-mono">{ props.data[1] }</div>
            }
        </div>
    );
}

export default RowNeatDisplayLean;