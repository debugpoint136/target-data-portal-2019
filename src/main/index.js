import React from 'react';
import * as cn from 'classnames';

const Main = (props) => {
    return (
        <div className={styles.topBar}>
            <div className={styles.logo}>
                <img src="/TaRGET_logo.png" alt="logo" height="36" width="72"/>
            </div>
            <div className={styles.topBarMiddle}>
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
            </div>
        </div>
    );
}

export default Main;

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