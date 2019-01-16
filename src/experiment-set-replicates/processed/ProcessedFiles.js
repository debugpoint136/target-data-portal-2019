import React, {Component} from 'react';
import {Icon, Table} from 'semantic-ui-react';
import ProcessedFilesTable from './ProcessedFilesTable';

class ProcessedFiles extends Component {
    state = {}
    renderCols = (exp, replicateIndex) => {
        const { biosampleRowSpan, assayRowSpan,
            mouse, biosample, assay, Assay, uuid, accession, paired_file_accession, status, submission } = exp;

        if ( Assay === 'ATAC-seq') {
            return <ProcessedFilesTable key={uuid} index={replicateIndex + 1} 
                        file={{uuid, accession, paired_file_accession, status, submission}} 
                        assay={'ATAC-seq'} bioRepIndex={this.props.bioRepIndex}/>
        } else if ( Assay === 'RNA-seq' ) {
            return <ProcessedFilesTable key={uuid} index={replicateIndex + 1} 
                        file={{uuid, accession, paired_file_accession, status, submission}} 
                        assay={'RNA-seq'} bioRepIndex={this.props.bioRepIndex}/>
        } else {
            return <p>Unsupported assay type found</p>
        }
            
    }
    render() {
        return (
            <Table.Body>
                { this.props.result.map((bioRep, replicateIndex) => {
                    return this.renderCols(bioRep, replicateIndex)
                })}
            </Table.Body>
        );
    }
}

export default ProcessedFiles;