import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {ReactiveBase, SelectedFilters} from "@appbaseio/reactivesearch";
import Tissues from './base/Tissues';
import Age from './base/Age';
import Sex from './base/Sex';
import Assays from './base/Assays';
import Exposures from './base/Exposures';
import Labs from './base/Labs';
import Results from './base/Results';
import Main from './main/index';
import Card from './main/Card';
import * as cn from 'classnames';
import Axios from 'axios';

const ESCLUSTER = 'https://search-targetdcc-3dlio7dsb2i4woj3cw6q4a4ghq.us-east-1.es.amazonaws.com/';
// const ESCLUSTER =
// 'https://search-dataportal-eado5sdwt6hh6z67rslt5nioby.us-east-1.es.amazonaws.c
// om';
const INDEX = 'experimentset';

const THEME_CONFIG = {
  typography: {
    fontFamily: '"Muli", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "U' +
        'buntu", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: "18px"
  },
  colors: {
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
      qctoggle: false,
      viewExperiments: true,
      updates: null
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
  toggle = () => this.setState({
    qctoggle: !this.state.qctoggle
  })

  setMode = () => this.setState({ viewExperiments: !this.state.viewExperiments })

  componentDidMount() {
    Axios.get('https://target.wustl.edu/updates.json')
      .then(res => this.setState({ updates: res.data }))
  }

  render() {
    return (
      <div>
        {/* // was main-container */}
        <ReactiveBase url={ESCLUSTER} app={INDEX} theme={THEME_CONFIG}>
          <Main/>
          <div className='three-columns flex'>
            <div className={styles.leftSideBar}>
            {/* {(this.state.viewExperiments)? 
              <ul className={styles.leftSideList}>  
                <ListRowSelected>Experiments</ListRowSelected>
                <ListRow onClick={this.setMode}>Files</ListRow>
              </ul>:
              <ul className={styles.leftSideList}>  
                <ListRow onClick={this.setMode}>Experiments</ListRow>
                <ListRowSelected>Files</ListRowSelected>
              </ul>
            } */}
              <ul
                className='list-reset text-sm border-b-2 border-solid border-grey-light p-4'>
                <Tissues/>
                <Assays/>
                <Exposures/>
                <Labs/>
                <Age/>
                <Sex/>
              </ul>
            </div>

            <div className="p-2 middle-column w-3/5 flex-1 border-b-2">
              <div className="px-8 container-resolute mx-auto">
                <div className='p-2 flex justify-between mx-auto text-blue'>
                  <SelectedFilters
                    showClearAll={true}
                    clearAllLabel="Clear filters"
                    URLParams={true}/>
                </div>
                <Results viewExperiments={this.state.viewExperiments} handleClose={this.setMode}/>
              </div>
            </div>

            <div className="right-sidebar w-right bg-white shadow">
              <div className="flex items-center justify-between p-4 mb-2">
                <div className="font-semibold text-lg text-grey-darkest">Recent updates</div>
                {/* <button className={styles.button}>+ New Note</button> */}
              </div>
              <Tabs/>
              {(!this.state.updates) ? <p>No updates found</p> : this.state.updates.map(item => <Card key={item.id} content={item.content} id={item.id} by={item.by} date={item.date}/>)}
            </div>
          </div>
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
      <div className={styles.leftSideLink}>{props.children}</div>
    </li>
  );
}

const ListRow = (props) => {
  return (
    <li className='flex items-center py-2 pl-4 my-1 hover:box-shadow hover:bg-white cursor-pointer' onClick={props.onClick}>
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
      <div className={styles.leftSideLink}>{props.children}</div>
    </li>
  );
}

const Tabs = () => {
  return (
    <div
      className="flex items-center justify-between text-sm font-semibold border-b border-solid border-grey-light px-4 mb-4">
      <div
        className="text-grey-darkest border-b-4 border-solid border-blue-resolute pb-4">Metadata</div>
      {/* <div className="text-grey-darkest border-b-4 border-solid border-white pb-4">Submissions</div>
      <div className="text-grey-darkest border-b-4 border-solid border-white pb-4">Audits</div> */}

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