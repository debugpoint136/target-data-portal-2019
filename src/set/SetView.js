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
            componentId="ExperimentSet"
            dataField="experiment"
            title="ReactiveListSet"
            // showResultStats={true}
            size={5400}
            onAllData={this.onAllData}
            react={{
                and: ["Age", "Assay", "Tissue", "Exposure", "Lab", "Search", "Sex"]
        }}/>
        </div>
        );
    }
    onAllData(results, streamResults, loadMoreData) {
        if (results.length > 0) {
            // return <ExperimentSet results={results}/>
            return <p>Cool</p>
        } else {
            return null;
        }
    }
}

export default SetView;