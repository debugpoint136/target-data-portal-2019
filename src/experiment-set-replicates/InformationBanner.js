import React, {Component} from 'react';

class InformationBanner extends Component {
    state = {}
    render() {
        const { result } = this.props; 
        if (result.length === 0) {
            return <h3>Not Found</h3>
        }
        const data = result[0];
        const { Age, Sex, Assay, Tissue, Exposure, Dose, Lab } = data;
        return (
            <div className="hidden px-6 md:px-0 mt-4 md:flex flex-wrap order-1 md:-order-1 md:shadow-md js-tab-pane">
            <div className="p-4 px-6 w-full md:w-1/2 rounded md:rounded-r-none bg-white shadow-md md:shadow-none">
                <h4>Mice group details</h4>
                <table className="mt-4 w-full">
                    <thead className="p-2 text-sm leading-loose border-b text-indigo">
                        <tr>
                            <td>Assay</td>
                            <td className="text-center">Sample</td>
                            <td className="text-right">Exposure</td>
                        </tr>
                    </thead>
                    <tbody className="p-2 leading-loose text-sm">
                        <tr className="border-b">
                            <td className="py-2">{Assay}</td>
                            <td className="py-2 text-center">{Tissue}</td>
                            <td className="py-2 text-right">{Exposure}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full md:w-1/2 p-4 md:pt-12 md:pl-1 mt-4 md:mt-0 lg:pt-12 lg:pl-8 rounded md:rounded-r-none bg-white shadow-md md:shadow-none">
                <div className="flex">
                    <div className="w-1/2">
                        <p className="text-indigo text-sm p-2">Dose</p>
                        <p className="font-medium text-sm pl-2">{Dose}</p>
                    </div>
                    <div className="w-1/2">
                        <p className="text-indigo text-sm p-2">Age of mice</p>
                        <p className="font-medium text-sm pl-2">{Age}</p>
                    </div>
                </div>
                <div className="flex">
                <div className="pt-6 w-1/2">
                    <p className="text-indigo text-sm p-2">Mice gender</p>
                    <p className="font-medium text-sm pl-2 leading-normal">{Sex}</p>
                </div>
                <div className="pt-6 w-1/2">
                    <p className="text-indigo text-sm p-2">Lab</p>
                    <p className="font-medium text-sm pl-2 leading-normal">{Lab}</p>
                </div>
                </div>
            </div>
        </div>
        );
    }
}

export default InformationBanner;

const DisplayCard = ({ children }) => {
    return ( <div classNameName="m-2 p-2 bg-indigo text-center text-grey-lightest font-semibold ">{children}</div> );
}
