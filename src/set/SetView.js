import React, {Component} from 'react';
import {ReactiveList} from "@appbaseio/reactivesearch";
import ExperimentSet from './experimentset/ExperimentSet';
// import ExperimentList from './experimentset/ExperimentList';

class SetView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
        <div className="sdf">

        {/* <ReactiveList
            componentId="ExperimentSet"
            dataField="experiment"
            title="ReactiveListSet"
            // showResultStats={true}
            size={5400}
            onAllData={this.onAllData}
            react={{
                and: ["Age", "Assay", "Tissue", "Exposure", "Lab", "Search", "Sex"]
        }}/> */}
        <ReactiveList
            componentId="ExperimentSet"
            dataField="experiment"
            title="ReactiveList"
            loader={<img
                style={{margin: '20px auto', display: 'block'}}
                width="24"
                height="24"
                src="https://i.pinimg.com/originals/3e/f0/e6/3ef0e69f3c889c1307330c36a501eb12.gif"
            />}
            showResultStats={false}
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
            return <ExperimentSet results={results}/>
            // return <p>Cool</p>
        } else {
            return null;
        }
    }
}

export default SetView;