import React from 'react';
import {Icon} from 'semantic-ui-react'
// const QC_REPORT_URL = require('../../config.json').QC_REPORT_URL
import { Link } from 'react-router-dom';

const TISSUESimg = {
    'liver': 'liver.png',
    'Liver': 'liver.png',
    'Liver UBERON:0002107': 'liver.png',
    'Liver': 'liver.png',
    'Liver - left lobe': 'liver.png',
    'Liver - Left Lobe': 'liver.png',
    'lung': 'lungs.png',
    'lungs': 'lungs.png',
    'Lungs': 'lungs.png',
    'Lung': 'lungs.png',
    'Lung UBERON:0002048': 'lungs.png',
    'Lung UBERON: 0002048': 'lungs.png',
    'Blood': 'blood.png',
    'Blood UBERON:0000178': 'blood.png',
    'blood': 'blood.png',
    'Blood - Whole': 'blood.png',
    'Heart UBERON:0000948': 'heart.png',
    'heart': 'heart.png',
    'Heart': 'Heart.png'
}

const FileCardlet = (props) => {
    return (
        <div className="min-w-md w-full flex mb-2">
            {/* <div className='w-48 flex flex-col'>
                <div
                    className="pt-10 flex-none border-t  border-r border-l bg-white border-grey-light rounded-t-none text-center overflow-hidden">
                    <img height="20" width="40" src='./mouse.png' alt="tissue"/>
                    <div
                        className="bg-white text-xs text-center border-b border-grey-light text-grey-darkest font-light flex justify-around">
                        <p className="text-grey-dark font-hairline">{props.result.Age}</p>
                        <p>{props.result.Sex}</p>
                    </div>
                </div>

                <div
                    className="flex-none border-r border-l bg-white border-grey-light bg-contain rounded-t rounded-t-none text-center overflow-hidden">
                    {(props.result.Tissue) ? 
                    <img height="50" width="50" src={TISSUESimg[props.result.Tissue.trim()]} alt={props.result.Tissue}/>
                    : <p>Tissue N/A</p>}
                    <div
                        className="bg-white text-xs text-grey-dark font-hairline text-center border-b border-grey-light text-grey-darkest font-light">{props.result.tissue}</div>
                </div>
                <div
                    className="flex-none border-r border-l bg-white border-grey-light bg-contain rounded-t rounded-t-none text-center overflow-hidden">
                    <img height="50" width="50" src='./treatment.png' alt="tissue"/>
                    <div
                        className="bg-white text-xs text-grey-dark font-hairline text-center border-b border-grey-light text-grey-darkest font-light">{props.result.exposure_type}</div>
                </div>
            </div> */}

            <div
                className="w-full border-b border-l border-grey-light border-l-0 border-t border-grey-light bg-white rounded-b-none p-4 flex flex-col justify-between leading-normal">
                <div>
                    <Link to={`/experiment/${props.result.experiment}`}>
                        <p className="text-md font-mono text-blue-dark flex items-center">
                            <Icon name='key'/> {props.result._id}
                        </p>
                    </Link>
                    <div className="text-grey-darker font-bold text-lg mb-2">{props.result.Assay}</div>
                    <div className="text-grey font-bold text-lg mb-2">{props.result.Tissue}</div>
                    <p className="text-grey-darker text-base">{props.result.filename}</p>
                    {/* <p className="text-grey-darker text-base">{props.result.Exposure}</p> */}
                </div>
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full text-grey-dark"><Icon name='lab'/></div>
                    <div className="text-sm">
                        <p className="text-black leading-none">{props.result.Lab}</p>
                        <p className="text-grey-dark">{props.result.Submission}</p>
                    </div>
                </div>
            </div>


            <div
                className="w-full border-r border-b border-grey-light border-l-0 border-t border-grey-light bg-white rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal">
                <div>
                    <div className="flex">
                        <p className="text-blue-dark flex items-center">
                            <Icon name='external'/> <a target="_blank" href={'/file/' + props.result.uuid}>QC Report</a>
                        </p>
                        <div className="ml-2 mt-2 inline-flex">
                            <h5 className="ml-2">QC status: </h5>
                            {/* {makeQCStatusIndicator(props.result.QCScore, props.result.run_type)} */}
                            {getScoreStatus(props.result.score, props.result.Assay)}
                        </div>
                    </div>
                    
                    
                    {/* <div className="text-black font-bold text-xl mb-2">{props.result.data_phase}</div> */}
                    {/* <p className="text-grey-darker text-base">Assay Category: {props.result.Assay}</p> */}
                    <p className="text-grey-darker text-base">Exposure: {props.result.Exposure}</p>
                </div>
                {/* <div className="flex items-center">
                    <div className="text-sm">
                        <p className="text-black leading-none">{props.result.run_type}
                        </p>
                            <p className="text-blue-dark flex items-center">
                                <Icon name='list'/> <a target="_blank" href={QC_REPORT_URL + '/?submission[0]=' + props.result.submission}>Show all files in this submission</a>
                            </p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default FileCardlet;

/* deprecated
function makeQCStatusIndicator(score, run_type) {
    let element = []    
    if (score === 'NA') {

        if (run_type === 'paired-end') {
            element.push(<div key='3rsdfsdf' className="ml-2 mb-8 ">Not Available.</div>)
            element.push(<div key='32rjksjd' className="text-xs text-grey ml-2">For paired-end file, QC status displayed for Forward Read only</div>)
        } else {
            element.push(<div key='848djfhw' className="ml-2 mb-8">Not Available</div>)
        }
    } else if (parseInt(score, 10) > 0) {

        for (let index = 0; index < 10; index++) {
            element.push(<div key={`tmp-${index}`} className="w-2 h-6 bg-red-lightest ml-1"></div>)
        }
        for (let index = 0; index < score; index++) {
            element.push(<div key={`jsdfnv-${index}`} className="w-2 h-6 bg-green ml-1"></div>)
        }
        let remaining = 10 - score
        for (let index = 0; index < remaining; index++) {
            element.push(<div key={`iwednd-${index}`} className="w-2 h-6 bg-green-lightest ml-1"></div>)
        }
    } else if (parseInt(score, 10) < 0) {        
        
        
        let remaining = 10 + parseInt(score, 10)
        for (let index = 0; index < remaining; index++) {
            element.push(<div key={`6tfgyhy-${index}`} className="w-2 h-6 bg-red-lightest ml-1"></div>)
        }   
        for (let index = 0; index > parseInt(score, 10); index--) {
            element.push(<div key={`jvcfdj-${index}`} className="w-2 h-6 bg-red ml-1"></div>)
        }  
        for (let index = 0; index < 10; index++) {
            element.push(<div key={`kkuuhg-${index}`} className="w-2 h-6 bg-green-lightest ml-1"></div>)
        }  
    } else {
        for (let index = 0; index < 10; index++) {
            element.push(<div key={`83jfdjj-${index}`} className="w-2 h-6 bg-red-lightest ml-1"></div>)
        }
        for (let index = 0; index < 10; index++) {
            element.push(<div key={`94ifjre-${index}`} className="w-2 h-6 bg-green-lightest ml-1"></div>)
        }
    }
        
    return element
}
*/
function getScoreStatus(score, assay) {
    if (score || score === 0) {
        if (assay === 'ATAC-seq (transposase-accessible chromatin, OBI:0002039)' || assay === 'ATAC-seq') {
            if (score >= 5) {
                return '✅';
            } else {
                return '🔴';
            }
        } else if (assay === 'RNA-seq (OBI:0001271)' || assay === 'RNA-seq'){
            if (score === 3) {
                return '✅';
            } else {
                return '🔴';
            }
        } else {
            return 'NA';
        }
    } else {
        return 'NA';
    }
    
    
}