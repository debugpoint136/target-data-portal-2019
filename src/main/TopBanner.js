import React from 'react';

const TopBanner = (props) => {
    const { Assay, Tissue, Exposure, Dose, Age, Sex, Lab,
        treatment_exposure_category,
        treatment_exposure_life_stage } = props.data;
    return (
        <div
            className="bg-white border border-grey-light border-solid border-t-4 border-t-blue-resolute rounded px-4 py-6 mb-8">
            <div className="flex">
                <div className="w-1/3 pr-4">
                    <h2 className="text-lg font-semibold mb-4">Details</h2>
                    <p className="text-black text-sm leading-loose mb-4">
                            {`${treatment_exposure_category} mice exposed at stage: ${treatment_exposure_life_stage}`}
                    </p>

                    <p className="text-grey text-xs leading-normal mb-4">
                        If you need to update the details, you may do so on by contacting DCC Admin
                        {/* <a href="http://"></a>. */}
                    </p>

                </div>
                <div className="w-2/3 pl-8">
                    <div className="flex flex-wrap">
                        <div className="w-1/2 pr-4 mb-6">
                            <label htmlFor="pid" className="block text-grey-darkest text-base mb-2">Assay</label>
                            <input
                                id="pid"
                                type="text"
                                value={Assay}
                                readOnly
                                className="w-full text-base bg-grey-lightest  border border-solid border-grey-light text-grey-darkest outline-0 rounded px-3 py-3"/>
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="cad_owner_name"
                                className="block text-grey-darkest text-base mb-2">Tissue</label>
                            <input
                                id="cad_ownder_name"
                                type="text"
                                readOnly
                                value={Tissue}
                                className="w-full text-base bg-grey-lightest border border-solid border-grey-light text-grey-darkest outline-0 rounded px-3 py-3"/>
                        </div>
                        <div className="w-full mb-6">
                            <label
                                htmlFor="protest_address"
                                className="block text-grey-darkest text-base mb-2">Exposure</label>
                            <input
                                id="protest_address"
                                type="text"
                                readOnly
                                value={Exposure}
                                className="w-full text-base bg-grey-lightest  border border-solid border-grey-light text-grey-darkest outline-0 rounded px-3 py-3"/>
                        </div>
                        <div className="w-full mb-6">
                            <label
                                htmlFor="cad_mailing_address"
                                className="block text-grey-darkest text-base mb-2">Dose</label>
                            <input
                                id="cad_mailing_address"
                                type="text"
                                readOnly
                                value={Dose}
                                className="w-full text-base bg-grey-lightest  border border-solid border-grey-light text-grey-darkest outline-0 rounded px-3 py-3"/>
                        </div>
                        <div className="w-1/3 mb-6">
                            <label htmlFor="fee_rate" className="block text-grey-darkest text-base mb-2">Gender</label>
                            <input
                                id="fee_rate"
                                type="text"
                                value={Sex}
                                readOnly
                                className="w-full text-base bg-grey-lightest border border-solid border-grey-light text-grey-darkest outline-0 rounded px-3 py-3"/>
                        </div>
                        <div className="w-1/3 mb-6 pl-4">
                            <label htmlFor="start_year" className="block text-grey-darkest text-base mb-2">Age</label>
                            <input
                                id="start_year"
                                type="text"
                                value={Age}
                                readOnly
                                className="w-full text-base bg-grey-lightest border border-solid border-grey-light text-grey-darkest outline-0 rounded px-3 py-3"/>
                        </div>
                        <div className="w-1/3 mb-6 pl-4">
                            <label
                                htmlFor="agency_end_date"
                                className="block text-grey-darkest text-base mb-2">Lab</label>
                            <input
                                id="agency_end_date"
                                type="text"
                                value={Lab}
                                readOnly
                                className="w-full text-base bg-grey-lightest  border border-solid border-grey-light text-grey-darkest outline-0 rounded px-3 py-3"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBanner;