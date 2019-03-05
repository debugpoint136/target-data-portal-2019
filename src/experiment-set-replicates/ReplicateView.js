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
            // console.log(results);
            cache.put(this.props.id, results, 60000);
            return <ReplicateDetails result={results} experiment_set_id={this.props.id}/>
        } else {
            return null;
        }
    }

    render() {
        const ID = this.props.id;
        const cachePowder = cache.get(ID);
        if (cachePowder) {
            return <ReplicateDetails result={cachePowder} experiment_set_id={this.props.id}/>
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
                                    experiment_set: ID
                                }
                            }
                    }}
                    size={1} />

                <ReactiveList
                    componentId="experiment_set"
                    dataField="age_of_mice"
                    title="ReactiveList"
                    showResultStats={false}
                    loader={<img
                        style={{margin: '20px auto', display: 'block'}}
                        width="24"
                        height="24"
                        src="https://i.pinimg.com/originals/3e/f0/e6/3ef0e69f3c889c1307330c36a501eb12.gif"
                    />}
                    size={20}
                    onAllData={this.onAllData}
                    react={{
                    and: ["ExperimentSetSensor"]
                }}/>
            </div>
        );
    }
    
}

export default ReplicateView;