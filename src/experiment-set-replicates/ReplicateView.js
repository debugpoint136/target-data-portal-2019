import React, {Component} from 'react';
import {ReactiveList, DataController} from "@appbaseio/reactivesearch";
// import ExperimentSet from '../set/experimentset/ExperimentSet';
import ReplicateDetails from './ReplicateDetails';
const cache = require('memory-cache');

class ReplicateView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    onAllData = (results, streamResults, loadMoreData) => {
        if (results.length > 0) {
            cache.put(this.props.id, results, 60000);
            return <ReplicateDetails result={results}/>
        } else {
            return null;
        }
    }

    render() {
        const ID = this.props.id;
        const cachePowder = cache.get(ID);
        if (cachePowder) {
            return <ReplicateDetails result={cachePowder}/>
        }
        
        return (
            <div className="bg-grey-lighter">
                <DataController
                    title="DataController"
                    componentId="ExperimentSetSensor"
                    dataField="_id"
                    customQuery={
                        function (value, props) {
                            return {
                                match: {
                                    _id: ID
                                }
                            }
                    }}
                    size={1} />

                <ReactiveList
                    componentId="experiment_set"
                    dataField="age_of_mice"
                    title="ReactiveList"
                    showResultStats={false}
                    size={1}
                    onAllData={this.onAllData}
                    react={{
                    and: ["ExperimentSetSensor"]
                }}/>
            </div>
        );
    }
    
}

export default ReplicateView;