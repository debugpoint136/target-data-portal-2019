import React, { Component } from 'react';
// import { Radio } from 'semantic-ui-react';
import {
  ReactiveBase,
  // DataSearch, 
  // MultiDataList,
  // RangeSlider,
  // DateRange,
  // MultiList,
  // SingleRange,
  SelectedFilters,
  // ResultCard
} from "@appbaseio/reactivesearch";
import "./App.css";

import Tissues from './base/Tissues';
import Age from './base/Age';
import Sex from './base/Sex';
import Assays from './base/Assays';
import Exposures from './base/Exposures';
import Labs from './base/Labs';
import Results from './base/Results';
import SearchBar from './base/SearchBar';

// const ESCLUSTER = 'https://search-targetdcc-3dlio7dsb2i4woj3cw6q4a4ghq.us-east-1.es.amazonaws.com/';
const ESCLUSTER = 'https://search-dataportal-eado5sdwt6hh6z67rslt5nioby.us-east-1.es.amazonaws.com';
const INDEX = 'experimentset';

const THEME_CONFIG = {
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: "18px"
  },
  colors: {
    // textColor: "#fff",
    // backgroundColor: "#153958",
    primaryTextColor: "#fff",
    primaryColor: "#2196F3",
    titleColor: "#fff",
    alertColor: "#d9534f",
    borderColor: "#666"
  }
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
      message: "🔬Show Filters",
      qctoggle: false
    };
  }

  handleClick() {
    this.setState({
      isClicked: !this.state.isClicked,
      message: this.state.isClicked
        ? "🔬 Show Filters"
        : "Show Results"
    });
  }  
  toggle = () => this.setState({ qctoggle: !this.state.qctoggle })
  render() {
    return (
      <div className="main-container">
        {/* <div className="m-2 p-2 rounded border-2 border-teal-darker bg-white w-1/5 text-white">
          <Radio toggle label='Show Experiments that pass QC' onChange={this.toggle} checked={this.state.qctoggle}/>
        </div> */}
        <ReactiveBase
          url={ESCLUSTER}
          app={INDEX}
          theme={THEME_CONFIG}>
          <div className="mb-2 p-4 flex justify-center">
            <div className="search-container">
              <SearchBar/>
            </div>
            <div className="sdfs"></div>

          </div>
          <div className="sub-container">
            <div
              className={this.state.isClicked
              ? "left-bar-optional"
              : "left-bar"}>
              <div className="filter-heading center">
                  
                  <Tissues/>
                  <Assays/>
              </div>
              <Exposures/>
              <Labs/>
              {/* <div className='text-grey font-sans font-xs'>Age of mice (in weeks)</div> */}
                  <Age/>
                  <Sex/>
            </div>
            <div
              className={this.state.isClicked
              ? "result-container-optional"
              : "result-container"}>
              <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" URLParams={true}/>
              <Results/>
            </div>

            <button
              className="toggle-button"
              onClick={this
              .handleClick
              .bind(this)}>
              {this.state.message}
            </button>
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;