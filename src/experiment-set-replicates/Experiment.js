import React, { Component } from 'react';
import {Container} from 'semantic-ui-react'
import InformationBanner from './InformationBanner';
import ExperimentTable from './ExperimentTable';
import ExperimentDetails from './ExperimentDetails';
import ProcessedFiles from './processed/ProcessedFiles';
import ProcessedFilesScaffold from './processed/ProcessedFilesScaffold';


class Experiment extends Component {
    state = { replicateObj: null, data: [] }

    componentDidMount() {
        const mouseId = this.props.match.params.accession;
        const identifier = this.props.match.params.id;
        const pullData = localStorage.getItem(identifier);

        if (pullData) {
            const dataParsed = JSON.parse(pullData);
            if (dataParsed.length > 0) {
                const rowsToDisplay = dataParsed.filter(d => d.mouse === mouseId);

                if (rowsToDisplay.length > 0) {
                    this.setState({ data: rowsToDisplay });
                }
            }
        }
    }
    
    render() { 
        if (this.state.data.length === 0) {
            return <h3>Not found</h3>
        }
        return ( 
            
            <div className="bg-grey-lighter">
            <Container>
            <div className="p-4 h-screen">
                <div className="flex">
                    <div className="text-3xl text-uppercase font-extrabold font-sans p-4">Experiment : </div>
                    <div className="text-3xl text-uppercase font-thin font-sans p-4">{this.props.match.params.id.split('-TGT')[0]}</div>
                </div>
                <div className="mb-4 p-4 w-auto"><InformationBanner result={this.state.data}/></div>
                {/* <div className="m-4 bg-white w-auto"><DetailsContainer result={this.props.result}/></div> */}
                {(this.state.data.length > 0) ? <div className="m-4 bg-white w-auto"><ExperimentDetails result={this.state.data}/></div> : 'Loading..'}
                <div className="text-xl text-uppercase font-extrabold font-sans p-4">Processed files :</div>
                <ProcessedFilesScaffold>
                    {(this.state.data.length > 0) ? <ProcessedFiles result={this.state.data} assay={this.state.data[0].Assay}/> : 'Loading..'}
                </ProcessedFilesScaffold>
                <div className="footer"></div>
            </div>
            </Container>
            </div>
        );
    }
}

export default Experiment;

function sanitize(info) {
    const { assay } = info;

    if (assay === "RNA-seq (OBI:0001271)") {
        return 'RNA-seq';
    } else if (assay === 'ATAC-seq (transposase-accessible chromatin, OBI:0002039)') {
        return 'ATAC-seq';
    } else {
        return assay;
    }

}

