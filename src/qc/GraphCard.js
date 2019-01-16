import React from 'react';

const GraphCard = (props) => {
    if (props.size === 'smallest') {
        return (
            <div
                className="item-xs rounded overflow-hidden m-4 p-4 max-w-sm h-12">
                <h5 className="text-center text-grey-darker">{props.header}</h5>
                {(props.subtitle)
                    ? <p className="text-center text-grey-dark text-xs">{props.subtitle}</p>
                    : null}
                {props.children}
            </div>
        );
    } else if (props.size === 'small') {
        return (
            <div
                className="item-sm rounded overflow-hidden m-4 p-4 max-w-md h-12">
                <h5 className="text-center text-grey-darker">{props.header}</h5>
                {(props.subtitle)
                    ? <p className="text-center text-grey-dark text-xs">{props.subtitle}</p>
                    : null}
                {props.children}
            </div>
        );
    } else if (props.size === 'medium') {
        return (
            <div
                className="item-md rounded overflow-hidden m-4 p-4 min-w-sm max-w-md h-24">
                <h5 className="text-center text-grey-darker">{props.header}</h5>
                {(props.subtitle)
                    ? <p className="text-center text-grey-dark text-xs">{props.subtitle}</p>
                    : null}
                {props.children}
            </div>
        );
    } else if (props.size === 'large') {
        return (
            <div
                className="item-lg rounded overflow-hidden m-4 p-4 min-w-sm max-w-md h-24">
                <h5 className="text-center text-grey-darker">{props.header}</h5>
                {(props.subtitle)
                    ? <p className="text-center text-grey-dark text-xs">{props.subtitle}</p>
                    : null}
                {props.children}
            </div>
        );
    } else {
        return (
            <div
                className="item-md rounded overflow-hidden m-4 p-4 min-w-sm max-w-md h-24">
                <h5 className="text-center text-grey-darker">{props.header}</h5>
                {(props.subtitle)
                    ? <p className="text-center text-grey-dark text-xs">{props.subtitle}</p>
                    : null}
                {props.children}
            </div>
        );
    }

}

export default GraphCard;