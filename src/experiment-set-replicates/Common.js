import React from 'react'

export const Biosample = (props) => {
    const { biosample } = props;
    return ( 
        <div className="empty">
            <BiosampleAccession>{biosample}</BiosampleAccession>  
            {/* <BiosampleText>TEST biosample</BiosampleText> */}
        </div>
    );
}


export const Submission = (props) => {
    const { submission } = props.data;
    return ( 
        <FileEntry key={submission} name={submission} >
            <FileText>{submission}</FileText>
        </FileEntry>
    );
}
export const File = (props) => {
    const { uuid, accession, paired_file_accession } = props.data;
    return ( 
        <FileEntry key={uuid} name={uuid} >
            <FileAccession>{accession}</FileAccession>
            <FileSubText>File UUID: {uuid}</FileSubText>
            <FileText>Paired file: {paired_file_accession}</FileText>
        </FileEntry>
    );
}

export const QCstatus = (props) => {
    const { uuid, status } = props.data;
    return ( 
        <QCEntry key={uuid}>
            {<a href={`/file/${uuid}`} target="_blank">{status}</a>} {"  "} {showQCstatus(status)}
        </QCEntry>
    );
}

export const FileEntry = ({children}) => {
    return (
        <div
            className="py-4 text-center transition-normal hover:brighter hover:translate-y-1 hover:shadow-lg hover:border-indigo">
            {children}
        </div>
    );
}
export const FileAccession = ({children}) => {
    return (
        <div
            className="text-grey-dark font-semibold text-xs font-sans">
            {children}
        </div>
    );
}
export const FileText = ({children}) => {
    return (
        <div
            className="text-grey-darker text-xs font-hairline">
            {children}
        </div>
    );
}
export const FileSubText = ({children}) => {
    return (
        <div
            className="text-grey text-xs font-mono font-hairline">
            {children}
        </div>
    );
}


export const BiosampleAccession = ({children}) => {
    return (
        <div
            className="text-center text-grey-dark font-thin text-sm font-sans">
            {children}
        </div>
    );
}
export const BiosampleText = ({children}) => {
    return (
        <div
            className="text-center text-green font-thin text-sm font-sans">
            {children}
        </div>
    );
}

export const Assay = (props) => {
    const { assay } = props;
    return ( 
        <div className="empty">
            <AssayAccession>{assay}</AssayAccession>  
        </div>
    );
}

export const AssayAccession = ({children}) => {
    return (
        <div
            className="text-center text-grey-dark font-thin text-sm font-sans">
            {children}
        </div>
    );
}

export const AssayText = ({children}) => {
    return (
        <div
            className="text-center text-green font-thin text-sm font-sans">
            {children}
        </div>
    );
}

export const QCEntry = ({children}) => {
    return (
        <div
            className="py-4 text-center text-grey-dark font-semibold text-xs font-sans">
            {children}
        </div>
    );
}

export function showQCstatus(value) {
    if (value === 'PASS') {
        return <span role="img" aria-label="qcstatus">✅</span>
    } else {
        return <span role="img" aria-label="qcstatus">🔴</span>
    }
}