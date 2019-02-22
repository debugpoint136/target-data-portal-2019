import React, {Component} from 'react';
import {ReactiveBase} from "@appbaseio/reactivesearch";
// import Results from '../base/Results';
import 'semantic-ui-css/semantic.min.css';
import Tissues from '../base/Tissues';
import Age from '../base/Age';
import Sex from '../base/Sex';
import Assays from '../base/Assays';
import Exposures from '../base/Exposures';
import Labs from '../base/Labs';
import SetView from './SetView';
import SearchBar from '../base/SearchBar';

const ESCLUSTER = 'https://search-targetdcc-3dlio7dsb2i4woj3cw6q4a4ghq.us-east-1.es.amazonaws.com/';
// const INDEX = 'experiment';
// const ESCLUSTER = 'https://search-dataportal-eado5sdwt6hh6z67rslt5nioby.us-east-1.es.amazonaws.com';
const INDEX = 'experimentset';

class Set extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="test">
                <ReactiveBase url={ESCLUSTER} app={INDEX}>
                    <div className="hidden">
                        <SearchBar/>
                        <div
                            className={this.state.isClicked
                            ? "left-bar-optional"
                            : "left-bar"}>
                            <div className="filter-heading center">
                                <Age/>
                                <Tissues/>
                                <Assays/>
                            </div>
                            <hr className="blue"/>
                            <div className="filter-heading center">
                                <b>
                                    {" "}
                                    <i className="fa fa-exclamation-triangle"/>
                                    Exposure{" "}
                                </b>
                            </div>
                            <Exposures/>
                            <Labs/>
                            <Sex/>
                        </div>
                        </div>
                        <SetView/>
                        {/* <div
                            className={this.state.isClicked
                            ? "result-container-optional"
                            : "result-container"}>
                            <SelectedFilters showClearAll={true} clearAllLabel="Clear filters"/>
                        </div> */}
                </ReactiveBase>
            </div>
        );
    }
}

export default Set;