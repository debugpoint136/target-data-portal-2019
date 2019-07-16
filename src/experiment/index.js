import React, {Component} from 'react';
import {ReactiveBase} from "@appbaseio/reactivesearch";
import 'semantic-ui-css/semantic.min.css';
import ExperimentSingleView from './ExperimentSingleView';
const ESCLUSTER = 'https://search-targetdcc-3dlio7dsb2i4woj3cw6q4a4ghq.us-east-1.es.amazonaws.com/';
// const INDEX = 'experiment'; const ESCLUSTER =
// 'https://search-dataportal-eado5sdwt6hh6z67rslt5nioby.us-east-1.es.amazonaws.c
// om';
const INDEX = 'experimentset';

class ExperimentById extends Component {
  state = {}

  render() {
    return (
      <div className="test">
        <ReactiveBase url={ESCLUSTER} app={INDEX}>
          <ExperimentSingleView id={this.props.match.params.id}/> 
        </ReactiveBase>
      </div>
    );
  }
}

export default ExperimentById;