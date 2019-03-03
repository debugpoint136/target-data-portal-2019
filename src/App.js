import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
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
// import "./App.css";
import Tissues from './base/Tissues';
import Age from './base/Age';
import Sex from './base/Sex';
import Assays from './base/Assays';
import Exposures from './base/Exposures';
import Labs from './base/Labs';
import Results from './base/Results';
import SearchBar from './base/SearchBar';
import Main from './main/index';
import * as cn from 'classnames';

// import PieChartWidget from './summary/PieChartWidget';
// import SankeyWidget from './summary/SankeyWidget';
// import SunburstWidget from './summary/SunburstWidget';
// import BubbleWidget from './summary/BubbleWidget';
// import ButtonWidget from './components/ButtonWidget';


const ESCLUSTER = 'https://search-targetdcc-3dlio7dsb2i4woj3cw6q4a4ghq.us-east-1.es.amazonaws.com/';
// const ESCLUSTER = 'https://search-dataportal-eado5sdwt6hh6z67rslt5nioby.us-east-1.es.amazonaws.com';
const INDEX = 'experimentset';

const THEME_CONFIG = {
  typography: {
    fontFamily: '"Muli", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
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
      <div className="bg-grey-lighter font-sans antialiased text-grey-darkest"> 
      {/* // was main-container */}
        {/* <div className="m-2 p-2 rounded border-2 border-teal-darker bg-white w-1/5 text-white">
          <Radio toggle label='Show Experiments that pass QC' onChange={this.toggle} checked={this.state.qctoggle}/>
        </div> */}
        <ReactiveBase
          url={ESCLUSTER}
          app={INDEX}
          theme={THEME_CONFIG}>
          {/* <div className="mb-2 p-4 flex justify-center"> */}
            {/* <div className="search-container">
              <SearchBar/>
            </div> */}
            <Main/>

          {/* </div> */}

          <div className='three-columns flex'>
          <div className={styles.leftSideBar}>
            <ul className={styles.leftSideList}>
            <ListRowSelected>Experiment Sets</ListRowSelected>
              <ListRow>Experiments</ListRow>
              <ListRow>Files</ListRow>
            </ul>
            <ul className='list-reset text-sm border-b-2 border-solid border-grey-light p-4'>
                <Tissues/>
                <Assays/>
                <Exposures/>
                <Labs/>
                <Age/>
                <Sex/>
            </ul>

          </div>

          <div className="p-2 middle-column w-3/5 flex-1 border-b-2">
            {/* <Breadcrumbs/> */}
            


            <div className="px-8 container-resolute mx-auto">
              <div className='p-2 flex justify-between mx-auto text-blue'>
              <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" URLParams={true}/>
              <Button.Group icon>
                <Button>
                  <Icon name='th' />
                </Button>
                <Button>
                  <Icon name='list' />
                </Button>
              </Button.Group>
              </div>
              {/* <Header accession='GALDZO2R4I5ZK' status='PASS'/>
              <HeaderSubtitle>123 Main St., Galvenston, TX 77555</HeaderSubtitle>
              <CardDetails/>
              <CardFlags/>
              <CardAOAS/>
              <CardCancel/> */}
              <Results/>
            </div>
            </div>


          <div className="right-sidebar w-right bg-white shadow">
            <div className="flex items-center justify-between p-4 mb-2">
              <div className="font-semibold text-lg text-grey-darkest">Recent updates</div>
              {/* <button className={styles.button}>+ New Note</button> */}
            </div>

            <Tabs/>

            <Card
              content='Bartolomei Lab'
              id='-LZl9DdpCxAxswFbwF7v'
              by='Yujie(Ivy) Chen'
              date='Feb 27, 2019 4:52 PM'/>
            <Card
              content='Bartolomei Lab'
              id='-LYmxmgFFGdxsBRwWVDA'
              by='Yemin Lan'
              date='Feb 15, 2019 4:01 PM'/>
            <Card
              content='Bartolomei Lab'
              id='-LYbNvwSiLqzQxDZHlkb'
              by='Yemin Lan'
              date='Feb 13, 2019 10:05 AM'/>
            <Card
              content='Walker Lab'
              id='-LY42hExwxX6b8aE4m_2'
              by='Benpeng Miao'
              date='Feb 6, 2019 5:05 PM'/>

          </div>
          </div>


          {/* <div className="sub-container">
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
              <div className='text-grey font-sans font-xs'>Age of mice (in weeks)</div>
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
          </div> */}
        </ReactiveBase>
      </div>
    );
  }
}

export default App;

const ListRowSelected = (props) => {
  return (
    <li className={styles.selectedItem}>
      <div className={styles.selectedItemIcon}>
        <svg
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"><path
          className="heroicon-ui"
          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"/></svg>
      </div>
      <a href='#' className={styles.leftSideLink}>{props.children}</a>
    </li>
  );
}

const ListRow = (props) => {
  return (
    <li className={styles.leftSideListRow}>
      <div className={styles.leftSideListIcon}>
        <svg
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"><path
          className="heroicon-ui"
          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"/></svg>
      </div>
      <a href='#' className={styles.leftSideLink}>{props.children}</a>
    </li>
  );
}

const Card = (props) => {
  return (
      <div className="flex px-4 mb-4">
          <div className="text-blue-resolute-icon mr-2">
              <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"><path
                  className="heroicon-ui"
                  d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/></svg>
          </div>
          <div className="mb-2">
              <div className="text-sm text-grey-darkest leading-normal mb-2">{props.content}</div>
              <div className="text-xs text-grey-light leading-normal mb-2">{props.id}</div>
              <div className="text-xs text-grey-dark">{props.by} &middot; {props.date}
              </div>
          </div>
      </div>
  );
}

const Tabs = () => {
  return (
      <div
          className="flex items-center justify-between text-sm font-semibold border-b border-solid border-grey-light px-4 mb-4">
          <div
              className="text-grey-darkest border-b-4 border-solid border-blue-resolute pb-4">Metadata</div>
          <div className="text-grey-darkest border-b-4 border-solid border-white pb-4">Submissions</div>
          <div className="text-grey-darkest border-b-4 border-solid border-white pb-4">Audits</div>

      </div>
  );
}


const Breadcrumbs = () => {
  return (
      <div
          className="breadcrumbs text-sm px-2 py-4 border-b-2 border-solid border-grey-light mb-8">
          <span className="px-2">
              <a href="http://">Contacts</a>
          </span>
          <span>
              <svg
                  width="6px"
                  height="10px"
                  viewBox="0 0 6 10"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                          transform="translate(-311.000000, -90.000000)"
                          fill="#82909E"
                          fillRule="nonzero">
                          <path
                              d="M317.292893,92.2928932 C317.683418,91.9023689 318.316582,91.9023689 318.707107,92.2928932 C319.097631,92.6834175 319.097631,93.3165825 318.707107,93.7071068 L314.707107,97.7071068 C314.316582,98.0976311 313.683418,98.0976311 313.292893,97.7071068 L309.292893,93.7071068 C308.902369,93.3165825 308.902369,92.6834175 309.292893,92.2928932 C309.683418,91.9023689 310.316582,91.9023689 310.707107,92.2928932 L314,95.5857864 L317.292893,92.2928932 Z"
                              transform="translate(314.000000, 95.000000) rotate(-90.000000) translate(-314.000000, -95.000000) "></path>
                      </g>
                  </g>
              </svg>
          </span>

          <span className="px-2">
              <a href="http://">Bart Simpson</a>
          </span>
          <span>
              <svg
                  width="6px"
                  height="10px"
                  viewBox="0 0 6 10"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                          transform="translate(-311.000000, -90.000000)"
                          fill="#82909E"
                          fillRule="nonzero">
                          <path
                              d="M317.292893,92.2928932 C317.683418,91.9023689 318.316582,91.9023689 318.707107,92.2928932 C319.097631,92.6834175 319.097631,93.3165825 318.707107,93.7071068 L314.707107,97.7071068 C314.316582,98.0976311 313.683418,98.0976311 313.292893,97.7071068 L309.292893,93.7071068 C308.902369,93.3165825 308.902369,92.6834175 309.292893,92.2928932 C309.683418,91.9023689 310.316582,91.9023689 310.707107,92.2928932 L314,95.5857864 L317.292893,92.2928932 Z"
                              transform="translate(314.000000, 95.000000) rotate(-90.000000) translate(-314.000000, -95.000000) "></path>
                      </g>
                  </g>
              </svg>
          </span>
          <span className="px-2">Properites</span>
      </div>
  );
}


const styles = {
  page: cn(`bg-grey-lighter font-sans antialiased text-grey-darkest`),
  topBar: cn(`flex items-center py-4 bg-blue-resolute`),
  logo: cn(`pl-4 w-left`),
  topBarMiddle: cn(`w-full pr-4 flex-1 relative`),
  searchBar: cn(`w-full py-4 px-4 pl-10 text-sm bg-grey-lighter border border-solid border-blue-resolute-dark outline-0`),
  searchIcon: cn(`absolute pin-t flex items-center py-4 px-3 text-grey-darker`),
  container: cn(`bg-white container my-8 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden font-sans`),
  leftSideBar: cn(`left-sidebar w-left border-r-2 border-solid border-grey-light min-h-screen pt-4`),
  leftSideList: cn(`list-reset text-sm border-b-2 border-solid border-grey-light`),
  leftSideListRow: cn(`flex items-center py-2 pl-4 my-1`),
  leftSideListIcon: cn(`pr-2 text-blue-resolute-icon`),
  leftSideListLink: cn(`text-grey-darker hover:text-black`),
  selectedItem: cn(`flex items-center py-1 pl-2 bg-white border-l-8 border-blue-resolute`),
  selectedItemIcon: cn(`pr-2 text-blue-resolute fix-negative-margin`),
  button: cn(`bg-white uppercase text-grey-darkest text-xs font-bold tracking-wide rounded border border-solid border-grey-light px-3 py-2 hover:text-white hover:bg-grey-darkest`)
}