import React, {Component} from 'react';
import {Icon, Table} from 'semantic-ui-react';
import { Biosample, Assay, File, QCstatus, Submission } from './Common';

class ExperimentDetails extends Component {
    state = {}

    // renderCols = (input) => {
    //     const { biosample, assays } = input;
    //     const allRows = [];
        
    //         assays.forEach((as, asIndex) => {
    //             const { assay, files } = as;
    //             if (asIndex === 0) {
    //                 allRows.push(
    //                     <Table.Row key={`${biosample}:${assay}`}>
    //                         <Table.Cell>
    //                             <Biosample biosample={biosample}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <Assay id={this.state.resultId} biosample={biosample} assay={assay}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <File data={files[0]} />
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <QCstatus data={files[0]}/>
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <Submission data={files[0]}/>
    //                         </Table.Cell>
    //                     </Table.Row>
    //                 )
    //             // } else if (!biosampleRowNum && biosampleRowNum === samIndex) { // dont add this biosample for the 2nd time
    //             //     allRows.push(
    //             //         <Table.Row key={`${biosample}:${assay}`}>
    //             //             <Table.Cell>
    //             //                 <Assay assay={assay}/>
    //             //             </Table.Cell> 
    //             //             <Table.Cell>
    //             //                 <File data={files[0]} />
    //             //             </Table.Cell> 
    //             //             <Table.Cell>
    //             //                 <QCstatus data={files[0]}/>
    //             //             </Table.Cell>
    //             //         </Table.Row>
    //             //     )
    //             } else {
    //                 allRows.push(
    //                     <Table.Row key={`${biosample}:${assay}`}>
    //                         <Table.Cell>
    //                             <Biosample biosample={biosample}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <Assay assay={assay}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <File data={files[0]} />
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <QCstatus data={files[0]}/>
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <Submission data={files[0]}/>
    //                         </Table.Cell>
    //                     </Table.Row>
    //                 )
    //             }
    //             // const biosampleRowNum = samIndex; // this is to see if this biosample has already been added
    //         });
    

    //     return allRows;
    // }

    renderFlatExps = (exp, rowIndex) => {
        const { biosampleRowSpan, assayRowSpan,
            mouse, biosample, assay, uuid, accession, paired_file_accession, status, submission } = exp;

        const allRows = [];
        if (rowIndex === 0) {
            allRows.push(
                <Table.Row key={`${mouse}:${biosample}:${assay}`}>
                    { (exp.hasOwnProperty('biosampleRowSpan')) ?
                    <Table.Cell rowSpan={biosampleRowSpan}>
                        <Biosample biosample={biosample}/>
                    </Table.Cell> : null }
                    { (exp.hasOwnProperty('assayRowSpan')) ?
                    <Table.Cell rowSpan={assayRowSpan}>
                        <Assay assay={assay}/>
                    </Table.Cell> : null }
                    <Table.Cell>
                        <File data={{uuid, accession, paired_file_accession}} />
                    </Table.Cell> 
                    <Table.Cell>
                        <QCstatus data={{uuid, status}}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Submission data={{submission}}/>
                    </Table.Cell>
                </Table.Row>
            )
        } else {
            allRows.push(
                <Table.Row key={`${mouse}:${biosample}:${assay}`}>
                    <Table.Cell>
                        <File data={{uuid, accession, paired_file_accession}} />
                    </Table.Cell> 
                    <Table.Cell>
                        <QCstatus data={{uuid, status}}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Submission data={{submission}}/>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return allRows;
    }

    render() {
        // const { entry, mouse, info } = this.props.result;
        return (
            <div className="border border-grey-light border-solid border-t-4 border-t-yellow rounded">
                <Table structured>
                <Table.Header>
                    <Table.Row className="text-center text-blue font-semibold text-sm font-sans">
                        <Table.HeaderCell textAlign='center'>Biosample</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Assay</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Accession</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>File status</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Submission</Table.HeaderCell>
                        {/* <Table.HeaderCell textAlign='center'>Run type</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Read</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>File size</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Date added</Table.HeaderCell> */}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    { this.props.result.map((bioRep, rowIndex) => {
                        return this.renderFlatExps(bioRep, rowIndex)
                    })}
                </Table.Body>
            </Table>
            </div>
        );
    }
}

export default ExperimentDetails;