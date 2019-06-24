import React, {Component} from 'react';
import {ReactiveList, DataController} from "@appbaseio/reactivesearch";
import ExperimentSingle from './ExperimentSingle';
const cache = require('memory-cache');

// import ExperimentList from './experimentset/ExperimentList';

class ExperimentSingleView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onAllData = (results, streamResults, loadMoreData) => {
      if (results.length > 0) {
        cache.put(this.props.id, results[0], 60000);
          return <ExperimentSingle result={results}/>
      } else {
          return null;
      }
    }

    render() {
      const ID = this.props.id;
      const cachePowder = cache.get(ID);
      if (cachePowder) {
          return <ExperimentSingle result={cachePowder}/>
      }
        return (
        <div className="sdf">
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

export default ExperimentSingleView;