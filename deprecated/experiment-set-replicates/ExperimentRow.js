import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ExperimentRow extends Component {
    state = {  }

    handleFileEntryClick = (name) => {
        // invoke single experiment
        this.props.history.push('/experiment/1');
    }
    // STOPPING HERE: NEED AN EXPERIMENT ID TO GRAB DATA FROM INDEX
    render() { 
        // Expects input obj = {biosample: "TRGTSMP0001657", assays: Array(2)}
        // 0: {assay: "TGTASO2EVCSD", files: Array(1)}
        // 1: {assay: "TGTASO2EVCSD", files: files: Array(1)
                                                        // 0: {uuid: "5baa6baee69ce56b9421bfb7", score: 1, accession: "TGTFIRX4U84V", paired_file_uuid: "5baa6bafe69ce5689021bfb9", paired_file_accession: "TGTFIQIZWNB6", …}}
        const {biosample, assays} = this.props.data;
        const {assay, files} = assays[0];
    
        return (
            <div
                className="single-experiment"
                style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, auto)',
                gridTemplateRows: '20px auto'
            }}>
                <div className="text-xs font-hairline bg-grey-lighter px-4 text-teal-darker text-uppercase">Technical Replicate {this.props.count}</div>
                <div className="bg-grey-lighter"></div>
                <div className="bg-grey-lighter"></div>
                <div className="bg-grey-lighter"></div>
                <div className="">
                    <AssayBody>
                        <AssayItem key={biosample}>{biosample}</AssayItem>
                    </AssayBody>
                </div>
                <div className="">
                    <AssayBody>
                        <AssayItem key={assay}>{assay}</AssayItem>
                    </AssayBody>
                </div>
                <div className="" name={files[0].uuid} onClick={(e) => this.handleFileEntryClick(files[0].uuid)}>
                    <DetailsBody>
                        {files.map(file => <FileEntry key={file.uuid} name={file.uuid} >
                            {file.accession}
                            <div className="text-xs font-hairline">Paired file: {file.paired_file_accession}</div>
                        </FileEntry>)}
                    </DetailsBody>
                </div>
                <div className="">
                    <DetailsBody>
                        {files.map(file => <QCEntry className='font-thin text-green-dark' key={file.uuid}>
                                                {<a href={`/file/${file.uuid}`} target="_blank">{file.status}</a>} {"  "} {showQCstatus(file.status)}
                                            </QCEntry>)}
                    </DetailsBody>
                </div>
            </div>
        );
    }
}

export default withRouter(ExperimentRow);


const FileEntry = ({children}) => {
    return (
        <div
            className="py-4 text-center text-grey-dark font-semibold text-xs font-sans transition-normal hover:brighter hover:translate-y-1 hover:shadow-lg hover:border-indigo">
            {children}
        </div>
    );
}

const QCEntry = ({children}) => {
    return (
        <div
            className="py-4 text-center text-grey-dark font-semibold text-xs font-sans">
            {children}
        </div>
    );
}

const AssayBody = ({children}) => {
    return (
        <div
            style={{
            display: 'grid',
            gridTemplateRows: 'repeat(auto-fill, auto)',
            height: '100%'
        }}
            className="text-center bg-grey-lightest text-grey-darker font-thin text-sm font-sans">
            {children}
        </div>
    );
}

const AssayItem = ({children}) => {
    return (
        <div
            style={{
            display: 'grid',
            minHeight: '0',
            height: '100%'
        }}
            className=''
            key={children}>
            <p style={{
                alignSelf: 'center'
            }}>
                {children}
            </p>
        </div>
    );
}

const DetailsBody = ({children}) => {
    return (
        <div
            style={{
            display: 'grid',
            minHeight: 0,
            height: '100%'
        }}
            className="text-center text-grey-dark font-semibold text-xs font-sans">
            <div style={{
                alignSelf: 'center'
            }}>
                {children}
            </div>
        </div>
    );
}

/*
function makeQCStatusIndicator(score) {
    let element = []    
    // if (score === 'NA') {

    //     if (run_type === 'paired-end') {
    //         element.push(<div key='3rsdfsdf' className="ml-2 mb-8 ">Not Available.</div>)
    //         element.push(<div key='32rjksjd' className="text-xs text-grey ml-2">For paired-end file, QC status displayed for Forward Read only</div>)
    //     } else {
    //         element.push(<div className="ml-2 mb-8">Not Available</div>)
    //     }
    // } else 
    if (parseInt(score, 10) > 0) {

        for (let index = 0; index < 10; index++) {
            element.push(<div key={`tmp-${index}`} className="w-1 h-3 bg-red-lightest ml-1"></div>)
        }
        for (let index = 0; index < score; index++) {
            element.push(<div key={`jsdfnv-${index}`} className="w-1 h-3 bg-green ml-1"></div>)
        }
        let remaining = 10 - score
        for (let index = 0; index < remaining; index++) {
            element.push(<div key={`iwednd-${index}`} className="w-1 h-3 bg-green-lightest ml-1"></div>)
        }
    } else if (parseInt(score, 10) < 0) {        
        
        
        let remaining = 10 + parseInt(score, 10)
        for (let index = 0; index < remaining; index++) {
            element.push(<div className="w-1 h-3 bg-red-lightest ml-1"></div>)
        }   
        for (let index = 0; index > parseInt(score, 10); index--) {
            element.push(<div className="w-1 h-3 bg-red ml-1"></div>)
        }  
        for (let index = 0; index < 10; index++) {
            element.push(<div className="w-1 h-3 bg-green-lightest ml-1"></div>)
        }  
    } else {
        for (let index = 0; index < 10; index++) {
            element.push(<div className="w-1 h-3 bg-red-lightest ml-1"></div>)
        }
        for (let index = 0; index < 10; index++) {
            element.push(<div className="w-1 h-3 bg-green-lightest ml-1"></div>)
        }
    }
        
    return element
}*/

function showQCstatus(value) {
    if (value === 'PASS') {
        return <span role="img" aria-label="qcstatus">✅</span>
    } else {
        return <span role="img" aria-label="qcstatus">🔴</span>
    }
}
