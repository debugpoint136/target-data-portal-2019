import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div
            className="h-16 bg-blue-darkest border-b-4 border-orange p-2 shadow-lg text-center">
                <Link className="rounded m-8 p-4 text-white text-sm" to='/'>Home</Link>
                <div className="inline-flex justify-between">
                    <div className="rounded mr-4"><img src="/TaRGET_logo.png" alt="logo" height="36" width="72"/></div>
                    <div>
                    <div className="p-2 text-grey-lightest font text-3xl">
                            Data Portal
                    </div>
                    </div>
                </div>
                {/* <a className='m-8' href="https://dcc.targetepigenomics.org/">Files View</a> */}
                <Link className="rounded m-8 p-4 text-white text-sm" to='/files'>Files</Link>
        </div>
    )
}

export default Header;