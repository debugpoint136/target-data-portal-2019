import React from 'react';
import {Icon} from 'semantic-ui-react';

const AccessionHeading = (props) => {
    return (
        <div className="flex justify-start items-center mb-1">
            <div className="pr-2 text-blue-resolute">
                <Icon name={props.iconName}/>
            </div>
            <h1 className="font-normal text-3xl mr-2">{props.accession}</h1>
            <div>
                <div
                    className="rounded-full font-bold bg-blue-resolute-dark text-white px-3 py-1 text-xs uppercase tracking-wide">{props.status}</div>
            </div>
        </div>
    );
}

export default AccessionHeading;