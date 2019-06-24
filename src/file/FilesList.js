import React from 'react'
import Pagination from '../common/Pagination'
import FileCardlet from './FileCardlet'
import {Button, Modal, Icon} from 'semantic-ui-react'
import DownloadWidget from './Download'
import BrowserView from './BrowserView';
const fileDownload = require('js-file-download')
const FASTQ_URL = "https://target.wustl.edu/processed/fromHTCF"

// reference: https://target.wustl.edu/processed/fromHTCF/5aa81c6ac6876662625fb32b/Processed_5aa81c6ac6876662625fb32b.PE.R1/5aa81c6ac6876662625fb32b.PE.R1.fastq.gz

// import './pagination.css'

class FileCard extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <div className='example'>
                {data.map((item, index) => {
                    return (<FileCardlet key={index} result={item}/>);
                })}
            </div>
        );
    }
}

const inlineStyle = {
    modal: {
        marginTop: '10px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class FilesList extends React.Component {
    state = {
        results: []
    }
/*
    componentDidMount() {
        let results = localStorage.getItem('results')

        if (results !== '') {
            this.setState({
                results: JSON.parse(results)
            })
        }
    }
*/

    render() {
        return (
            <div>                    
                    <div className="mb-4 px-8 py-4 bg-grey-light items-center justify-center">
                        {(this.props.results)
                            ? <div className="flex flex-col">
                                    <div className="h-16 mb-4 w-full p-4 bg-grey-darker text-white text-center">
                                        <h3>
                                            Experiments List</h3>
                                    </div>
                                    <Pagination data={this.props.results}>
                                        <FileCard/>
                                    </Pagination>
                                </div>
                            : null}

                    </div>
            </div>
        )
    }
}

export default FilesList;


function createDownloadManifest(data) {
    let files = []
    data.forEach(({run_type, fileUUID}) => {
        if (run_type === 'paired-end') {
            files.push(`${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.PE.R1/${fileUUID}.PE.R1.fastq.gz`)
            files.push(`${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.PE.R2/${fileUUID}.PE.R2.fastq.gz`)
        }
        else {
            files.push(`${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.SE/${fileUUID}.SE.fastq.gz`)
        }
    })

    return files.join('\n')
} 


function createQcscoresManifest(data) {
    const result = [];
    // const header = Object.keys(data[0]);
    result.push(["Submission","File UUID", "QC score"].join('\t\t'));
    result.push("-----------------------------------------------------------");
    data.forEach(d => (result.push([d.Submission,d.uuid, (d.QCScore === null)? 'NA': d.QCScore ].join('\t'))));
    result.push(
`
`);
    return result.join('\n');
}

function generateMetadataContent(data) {
    const header = Object.keys(data[0]);
    let result = header + "\r\n";;

    data.forEach(rowArray => {
        let rowContent = cleanComma(Object.values(rowArray));
        let row = rowContent.join(",");
        result += row + "\r\n";
    });
    return result;
}

function cleanComma(row) {
    return row.map(r => {
        if (typeof(r) === 'string') {
            return r.replace(/,/g, "_")
        } else {
            return r;
        }
    });
}