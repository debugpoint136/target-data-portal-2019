import React, {Component} from 'react';
import axios from 'axios';
// import ReactJson from 'react-json-view';
import GraphsContainer from '../qc/GraphsContainer';
import { getScoreGeneric } from '../qc/qcutils';
import { Icon } from 'semantic-ui-react';
// import FileQCReport from './FileQCReport';
// const QCREPORT_WEB_DIR = 'https://target.wustl.edu/files/ATAC-seq/b3bd19ff-8fee-4d6d-9056-d8d1f7e9c4b6/5b1987badd88b278190a6c36/';
const QCREPORT_WEB_DIR = 'https://target.wustl.edu/files';
// const API_PATH_BUILDER = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/file/qcreport/5ac284bad3383f510b5dc5df';
const API_PATH_BUILDER = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/file/qcreport/';
// https://target.wustl.edu/files/ATAC-seq/2e7e0c19-40d8-4a80-905b-25cb24442544/5ad4c31fe19ec3f1bd2f0fd5/
// QC_ATAC_data_collection_5ad4c31fe19ec3f1bd2f0fd5.SE/
// plots_collection_5ad4c31fe19ec3f1bd2f0fd5.SE/

class FileQCReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qcJson: null,
            qcStatus: null,
            qcPath: undefined,
            assay: undefined
        }
    }
    componentDidMount() {
        const fileUUID = this.props.match.params.id;
        // TODO: if no fileUUID, show error
        const URLtoPing = API_PATH_BUILDER + fileUUID;
        axios
            .get(URLtoPing)
            .then(res => {
                
                let resBody = res.data.body;
                if (resBody.hasOwnProperty('path')) {
                    const ASSAY = resBody.path.split('/')[1];
                    const QCDIR = `${QCREPORT_WEB_DIR}${resBody.path}/${fileUUID}`;
                    const QCJSON = `${QCDIR}/${fileUUID}.json`;
                    this.setState({ qcPath: QCDIR, qcJSONPath: QCJSON, assay: ASSAY });
                    return axios.get(QCJSON);
                }
            })
            .then(res => {
                const qcJson = normalizeRootKey(res.data);
                const qcStatus = getScoreGeneric(this.state.assay, qcJson)
                this.setState({ qcJson, qcStatus });
            })
            .catch(err => console.log(err))
    }
    render() {
        if (!this.state.qcJson) {
            return <h3>Looking up...</h3>
        }
        return (
            <GraphsContainer 
                data={this.state.qcJson} 
                qcStatus={this.state.qcStatus}
                id={this.props.match.params.id}
                type={this.state.assay} 
                multiQC={`${this.state.qcPath}/multiqc_report.html`}
                fileUUID={this.state.qcJSONPath}/>
        );
    }
}

export default FileQCReportContainer;

function normalizeRootKey(json) {
    if (Object.keys(json).length === 0) {
        return null;
    }
    if (json.hasOwnProperty('Sample_QC_info')) {
        return json.Sample_QC_info;
    } else {
        return json;
    }
}