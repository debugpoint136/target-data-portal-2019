import React from 'react';
import {ReactiveList} from "@appbaseio/reactivesearch";
import Table from '../components/pivottable';
// import { Dimmer } from 'semantic-ui-react'
import SetCards from '../set/SetCards';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: true }
  }

  render() {
    return (
    <div className='test'>
    {/* <Dimmer active={this.state.active} page/> */}
    
    <ReactiveList
      componentId="Experiment"
      dataField="experiment"
      title="ReactiveList"
      size={5000}
      pagination={false}
      onAllData={this.onAllData}
      // onQueryChange={
      //   function(prevQuery, nextQuery) {
      //     // use the query with other js code
      //     console.log('prevQuery', prevQuery);
      //     console.log('nextQuery', nextQuery);
      //   }
      // }
      react={{
      and: ["Age", "Assay", "Tissue", "Exposure", "Lab", "Search", "Sex"]
    }}/>
    </div>
    );
  }
  
  onAllData = (results, streamResults, loadMoreData) => {
    if (results.length > 0) {
      // this.setState({ active: false });
      // console.log(JSON.stringify(results));
      return <Table data={results}/>
    } else {
      return null;
    }
  }
}

export default Results;
