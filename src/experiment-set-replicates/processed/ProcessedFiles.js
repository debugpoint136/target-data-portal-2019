import React, {Component} from 'react';
import {Icon, Table} from 'semantic-ui-react';
import ProcessedFilesTable from './ProcessedFilesTable';

class ProcessedFiles extends Component {
    state = {}
    renderCols = (input, replicateIndex) => {
        const { assays } = input;
        
        const allRows = assays.map((as, asIndex) => {
                const { assay, files } = as;

                if ( this.props.assay.split(' ')[0] === 'ATAC-seq') {
                    return <ProcessedFilesTable key={files[0].uuid} index={replicateIndex + 1} file={files[0]} assay={'ATAC-seq'} bioRepIndex={this.props.bioRepIndex}/>
                } else if ( this.props.assay.split(' ')[0] === 'RNA-seq' ) {
                    return <ProcessedFilesTable key={files[0].uuid} index={replicateIndex + 1} file={files[0]} assay={'RNA-seq'} bioRepIndex={this.props.bioRepIndex}/>
                } else {
                    return <p>Unsupported assay type found</p>
                }
            });
        return allRows;
    }
    render() {
        return (
            <Table.Body>
                { this.props.result[0].biosamples.map((bioRep, replicateIndex) => {
                    return this.renderCols(bioRep, replicateIndex)
                })}
            </Table.Body>
        );
    }
}

export default ProcessedFiles;