import React from 'react';
import * as cn from 'classnames';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className={styles.topBar}>
            <Link to='/'>
                <div className={styles.logo}>
                    <img src="/TaRGET_logo.png" alt="logo" height="36" width="72"/>
                    <div className="flex justify-center items-center pl-2 uppercase text-white tracking-wide font-bold text-sm">
                        Data Portal
                    </div>
                </div>
            </Link>
            <div className={styles.topBarMiddle}>
            </div>
            <div className='w-right'>
                <div >
                    <a className='px-8 mx-auto text-center text-sm text-tracking-wide font-mono text-uppercase text-white hover:bg-white hover:text-grey-darker' href="https://bit.ly/2Rp9Oat">Documentation</a> 
                </div>
            </div>
        </div>
    );
}

export default Header;

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