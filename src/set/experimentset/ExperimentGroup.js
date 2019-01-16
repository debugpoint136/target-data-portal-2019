import React from 'react';
import { Icon, Image } from 'semantic-ui-react'
// import ExperimentDetails from './ExperimentDetails';
import { Link } from 'react-router-dom';
import _ from 'lodash';
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

const ExperimentGroup = (props) => {
    const { _id, Count, Age, Assay, Tissue, Exposure, Lab, Dose, Sex, experiment_set } = props.result;

    return (
        <Link to={`/experiment-set-replicates/${_id}`}>
        <div className="m-4 transition-normal hover:brighter hover:translate-y-1 hover:shadow-lg hover:border-indigo">
            <div className="h-48 w-64 p-4 bg-white shadow">
                <DisplayMice Count={Count} Sex={Sex} Age={Age}/>
                <div className="text-xs font-bold font-sans text-orange mt-2">{Assay}</div>
                <div className="text-xs font-hairline text-grey flex mr-2">{Tissue}
                    <Image className='' src={'/'+TISSUESimg[Tissue]} height="23" width="23" />
                </div>
                <div className="flex ">
                    <div className="text-xs font-hairline font-mono text-teal-dark m-2 w-2/3">
                        {Exposure}
                    </div>
                    <div className="text-xs font-bold font-sans text-blue-dark m-2 w-1/3">{
                        Lab}
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
}

export default ExperimentGroup;

const DisplayMice = (props) => {
    const { Count, Sex, Age} = props;
    return <div> 
            <div className="flex">
                {
                    _.times(Count, (i) => <div key={i} className={`flex-col ${(Sex === 'Male'? 'text-blue' : 'text-pink')}`}>
                                <Icon name={(Sex === 'Male'? 'man' : 'woman')}/>
                                <Image key={i} src='/mouse.png' height="12" width="23" />
                            </div>)
                }
            </div>
            <div className="mx-2 font-thin text-xs italic text-grey-dark">{Age}</div>
        </div>
}
