import React from 'react';
import {ReactiveList} from "@appbaseio/reactivesearch";
import Table from '../components/pivottable';
import SetCards from '../set/SetCards';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (<ReactiveList
      componentId="Experiment"
      dataField="experiment"
      title="ReactiveList"
      size={5400}
      onAllData={this.onAllData}
      react={{
      and: ["Age", "Assay", "Tissue", "Exposure", "Lab", "Search", "Sex"]
    }}/>);
  }
  onAllData(results, streamResults, loadMoreData) {
    if (results.length > 0) {
      // console.log(JSON.stringify(results));
      return <Table data={results}/>
      // return <SetCards data={results}/>
    } else {
      return null;
    }
  }
}

export default Results;
