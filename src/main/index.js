import React from 'react';
import * as cn from 'classnames';
import SearchBar from '../base/SearchBar';
import {Dropdown} from 'semantic-ui-react';

const Main = (props) => {
    return (
        <div className={styles.topBar}>
            <div className={styles.logo}>
                <img src="/TaRGET_logo.png" alt="logo" height="36" width="72"/>
                <div className="flex justify-center items-center pl-2 uppercase text-white tracking-wide font-bold text-sm">
                    Data Portal
                </div>
            </div>
            {/* <div className={styles.topBarMiddle}>
                <input
                    type="text"
                    className={styles.searchBar}
                    placeholder="Search by Assay, Tissue, UUID, Lab, or Exposure etc..."/>
                <div className={styles.searchIcon}>
                    <svg
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"><path
                        className="heroicon-ui"
                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
                </div>
            </div> */}

            <div className={styles.topBarMiddle}>
                <SearchBar/>
            </div>
            <div className='w-right'>
                <div className='px-8 mx-auto text-center text-lg text-tracking-wide text-uppercase text-white hover:bg-white hover:text-grey-darker'>
                    <DropdownExampleDropdown/>
                </div>
                {/* <a className="px-8 mx-auto text-center text-sm text-tracking-wide font-mono text-uppercase text-white hover:bg-white hover:text-grey-darker" href="https://bit.ly/2Rp9Oat" target='_blank'>Documentation</a>  */}
            </div>
        </div>
    );
}

export default Main;

const styles = {
    page: cn(`bg-grey-lighter font-sans antialiased text-grey-darkest`),
    topBar: cn(`flex items-center py-4 bg-blue-resolute`),
    logo: cn(`pl-4 w-left flex`),
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

const DropdownExampleDropdown = () => (
    <Dropdown text='Help'>
      <Dropdown.Menu>
        <Dropdown.Item href="https://bit.ly/2Rp9Oat" text='Tutorial' />
        {/* <Dropdown.Item href="https://docs.targetepigenomics.org" text='Documentation' /> */}
        <Dropdown.Divider />
        <Dropdown.Item icon='external' href='https://targetepigenomics.org/' text='TaRGET Homepage' />
        <Dropdown.Item text='E-mail DCC' href='mailto:dpurushotham@wustl.edu' />
      </Dropdown.Menu>
    </Dropdown>
  )