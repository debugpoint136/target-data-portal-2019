import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Icon} from 'semantic-ui-react';

class Mouse extends Component {
    state = {  }

    handleFileEntryClick = () => {
        const { mouse } = this.props;
        // invoke single experiment
        this.props.history.push(`/experiment/${this.props.id}/${mouse}`);
    }
    render() { 
        const { mouse } = this.props;
        return ( 
            <div className="text-center">
                <MouseAccession> {mouse}</MouseAccession>  
                <div className="px-4 text-blue font-thin text-xs font-sans cursor-pointer" onClick={(e) => this.handleFileEntryClick()}>Details <Icon name='expand arrows alternate'/></div>
            </div>
        );
    }
}

export default withRouter(Mouse);

const MouseAccession = ({children}) => {
    return (
        <div
            className="text-center text-grey-darker font-thin text-sm font-sans">
            {children}
        </div>
    );
}


export const MouseText = ({children}) => {
    return (
        <div
            className="text-center text-blue font-semibold text-xs font-sans">
            {children}
        </div>
    );
}