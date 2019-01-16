import React, {Component} from 'react';
import {ReactiveList} from "@appbaseio/reactivesearch";
import ExperimentSet from './experimentset/ExperimentSet';

class SetView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
        <div className="sdf">

        <ReactiveList
            componentId="experiment_set"
            dataField="age_of_mice"
            title="ReactiveList"
            // showResultStats={false}
            size={5400}
            onAllData={this.onAllData}
            react={{
            and: [
                "age_list",
                "tissue_list",
                "assay_list",
                "exposure_list",
                "lab_list",
                "search",
                "BookSensor"
            ]
        }}/>
        </div>
        );
    }
    onAllData(results, streamResults, loadMoreData) {
        if (results.length > 0) {
            return <ExperimentSet results={results}/>
        } else {
            return null;
        }
    }
}

export default SetView;