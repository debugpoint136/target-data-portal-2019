import React from 'react';
import {ReactiveList} from "@appbaseio/reactivesearch";
import Table from '../components/pivottable';
import { Dimmer, Header, Icon } from 'semantic-ui-react'
import SetCards from '../set/SetCards';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return (
    <div className='test'>
    <Dimmer active={!this.props.viewExperiments} onClickOutside={this.props.handleClose} page>
      <Header as='h2' icon inverted>
        <Icon name='warning' />
        Files view not available yet
        <Header.Subheader>Coming soon..</Header.Subheader>
      </Header>
    </Dimmer>
    
    <ReactiveList
      componentId="Experiment"
      dataField="experiment"
      title="ReactiveList"
      loader={<img
          style={{margin: '20px auto', display: 'block'}}
          width="24"
          height="24"
          src="https://i.pinimg.com/originals/3e/f0/e6/3ef0e69f3c889c1307330c36a501eb12.gif"
      />}
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
      // console.log(JSON.stringify(results));
      return <Table data={results} viewExperiments={this.props.viewExperiments}/>
    } else {
      return null;
    }
  }
}

export default Results;
