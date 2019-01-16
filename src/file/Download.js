import React, {Component} from 'react';
// import {Button} from 'semantic-ui-react'

const FASTQ_URL = "https://target.wustl.edu/processed/fromHTCF"
// reference: https://target.wustl.edu/processed/fromHTCF/5aa81c6ac6876662625fb32b/Processed_5aa81c6ac6876662625fb32b.PE.R1/5aa81c6ac6876662625fb32b.PE.R1.fastq.gz


class DownloadWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="test">
                {this.props.data.map(item => <DownloadItem data={item}/>)}
            </div>
        );
    }
}

export default DownloadWidget;

const DownloadItem = (props) => {
    const {run_type, fileUUID} = props.data
    return (
        <div className="text-xs font-hairline font-mono">
            { run_type === 'paired-end' ? 
                `${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.PE.R1/${fileUUID}.PE.R1.fastq.gz
                ${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.PE.R2/${fileUUID}.PE.R2.fastq.gz
                `
                : `${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.SE/${fileUUID}.SE.fastq.gz`
            }
        </div>
    );
}
