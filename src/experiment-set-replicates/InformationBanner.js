import React, {Component} from 'react';
import TopBanner from '../main/TopBanner';

class InformationBanner extends Component {
    state = {}
    render() {
        const { result } = this.props; 
        if (result.length === 0) {
            return <h3>Not Found</h3>
        }
        const data = result[0]; //pick first experiment - has to be a better way
        return (
            <TopBanner
                data={data}
            />
        );
    }
}
export default InformationBanner;

