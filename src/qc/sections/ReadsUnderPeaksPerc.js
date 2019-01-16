import React from 'react';
import GroupedBarChartComponentWithMarker from '../components/GroupedBarChartComponentWithMarker';

const ReadsUnderPeaksPerc = (props) => {

    if (Object.keys(props.data).length === 0) {
        return <p>Loading...</p>
    } else {
        return (
            <GroupedBarChartComponentWithMarker {...props}/>
        );
    }
}

export default ReadsUnderPeaksPerc;
