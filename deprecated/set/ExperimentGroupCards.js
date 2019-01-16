import React from 'react';
import {Icon} from 'semantic-ui-react'
import ExperimentDetails from './ExperimentDetails';
import { Link } from 'react-router-dom';
// const QC_REPORT_URL = require('../../config.json').QC_REPORT_URL

const TISSUESimg = {
    'liver': 'liver.png',
    'Liver UBERON:0002107': 'liver.png',
    'Liver': 'liver.png',
    'Liver - left lobe': 'liver.png',
    'Liver - Left Lobe': 'liver.png',
    'lung': 'lungs.png',
    'Lung UBERON: 0002048': 'lungs.png',
    'lungs': 'lungs.png',
    'Lungs': 'lungs.png',
    'Lung': 'lungs.png',
    'Blood': 'blood.png',
    'blood': 'blood.png',
    'Blood - Whole': 'blood.png',
    'Blood UBERON:0000178': 'blood.png',
    'Blood - leukocytes': 'blood.png',
    'Heart UBERON:0000948': 'heart.png',
    'heart': 'heart.png',
    'Heart': 'Heart.png'
}

const ExperimentCardlet = (props) => {
    return (
        <div className="min-w-md w-full flex mb-2">
            <div className='w-48 flex flex-col'>
                <div
                    className="pt-10 flex-none border-t  border-r border-l bg-white border-grey-light rounded-t-none text-center overflow-hidden">
                    <img height="20" width="40" src='/mouse.png' alt="tissue"/>
                    <div
                        className="bg-white text-xs text-center border-b border-grey-light text-grey-darkest font-light flex justify-around">
                        <p className="text-grey-dark font-hairline">{props.result.age_of_mice}</p>
                        <p>{props.result.mouse_gender}</p>
                    </div>
                </div>

                <div
                    className="flex-none border-r border-l bg-white border-grey-light bg-contain rounded-t rounded-t-none text-center overflow-hidden">
                    <img height="40" width="30" src={'/'+TISSUESimg[props.result.tissue]} alt="tissue"/>
                    <div
                        className="bg-white text-xs text-grey-dark font-hairline text-center border-b border-grey-light text-grey-darkest font-light">{props.result.tissue}</div>
                </div>
                <div
                    className="flex-none border-r border-l bg-white border-grey-light bg-contain rounded-t rounded-t-none text-center overflow-hidden">
                    <img height="40" width="40" src='/treatment.png' alt="tissue"/>
                    <div
                        className="bg-white text-xs text-grey-dark font-hairline text-center border-b border-grey-light text-grey-darkest font-light">{props.result.exposure}</div>
                </div>
            </div>

            <div
                className="w-full border-b border-l border-grey-light border-l-0 border-t border-grey-light bg-white rounded-b-none p-4 flex flex-col justify-between leading-normal">
                <div>
                    <p className="text-sm text-grey-dark flex items-center">
                        {props.result.uuid}
                    </p>
                    <div className="text-black font-bold text-xl mb-2">{props.result.assay_technique}</div>
                    <div className="h-auto w-full p-2 m-2 border-dotted border-green border-2 text-grey-darker text-base">{props.result.title}</div>
                    {/* <div className="font-hairline font-sans m-2 p-2 text-blue text-xs">{props.result._id}</div> */}
                    <Link to={`/experiment-set-replicates/${props.result._id}`}>Details</Link>
                    
                    
                </div>
                
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full text-grey-dark"><Icon name='lab'/></div>
                    <div className="text-sm">
                        <p className="text-black leading-none">{props.result.lab}</p>
                        <p className="text-grey-dark">{props.result.submission}</p>
                    </div>
                </div>
            </div>
            <div
                className="w-full border-r border-b border-grey-light border-l-0 border-t border-grey-light bg-white rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal">
                <div>
                    <ExperimentDetails experiments={props.result.experiments}/>                
                </div>
            </div>
        </div>
    )
}

export default ExperimentCardlet;
