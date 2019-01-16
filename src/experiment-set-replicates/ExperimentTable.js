import React, {Component} from 'react';
import Mouse from './Mouse';
import {Icon, Table} from 'semantic-ui-react';
import { calcItemRows, getSum } from './utils';
import { Biosample, File, QCstatus, Assay } from './Common';

import uuid from 'uuid';
// const RESULT = require('./intact.example.json');
// console.log(RESULT);

class ExperimentTable extends Component {
    state = {}

    componentDidMount = () => {
        const resultID = this.props.result[0]._id;
        this.setState({ resultId: resultID });
        localStorage.setItem(resultID, JSON.stringify(this.props.result));
    }
    

    renderCols = (bioRep) => {
        const { mouse, biosamples } = bioRep;
        const assaysList = calcItemRows(biosamples, 'assays');
        const mouseRowSpan = assaysList.reduce(getSum);
        const allRows = [];
        biosamples.forEach((sam, samIndex) => {
            const { biosample, assays } = sam;
            assays.forEach((as, asIndex) => {
                const { assay, files } = as;
                if (samIndex === 0 && asIndex === 0) {
                    allRows.push(
                        <Table.Row key={`${mouse}:${biosample}:${assay}`}>
                            <Table.Cell rowSpan={mouseRowSpan} >
                                <Mouse id={this.state.resultId} mouse={mouse}/>
                            </Table.Cell> 
                            <Table.Cell>
                                <Biosample biosample={biosample}/>
                            </Table.Cell> 
                            <Table.Cell>
                                <Assay assay={assay}/>
                            </Table.Cell> 
                            <Table.Cell>
                                <File data={files[0]} />
                            </Table.Cell> 
                            <Table.Cell>
                                <QCstatus data={files[0]}/>
                            </Table.Cell>
                        </Table.Row>
                    )
                } else if (!biosampleRowNum && biosampleRowNum === samIndex) { // dont add this biosample for the 2nd time
                    allRows.push(
                        <Table.Row key={`${mouse}:${biosample}:${assay}`}>
                            <Table.Cell>
                                <Assay assay={assay}/>
                            </Table.Cell> 
                            <Table.Cell>
                                <File data={files[0]} />
                            </Table.Cell> 
                            <Table.Cell>
                                <QCstatus data={files[0]}/>
                            </Table.Cell>
                        </Table.Row>
                    )
                } else {
                    allRows.push(
                        <Table.Row key={`${mouse}:${biosample}:${assay}`}>
                            <Table.Cell>
                                <Biosample biosample={biosample}/>
                            </Table.Cell> 
                            <Table.Cell>
                                <Assay assay={assay}/>
                            </Table.Cell> 
                            <Table.Cell>
                                <File data={files[0]} />
                            </Table.Cell> 
                            <Table.Cell>
                                <QCstatus data={files[0]}/>
                            </Table.Cell>
                        </Table.Row>
                    )
                }
                const biosampleRowNum = samIndex; // this is to see if this biosample has already been added
            });
        });

        return allRows;
    }

    render() {
        const {result} = this.props; // uncomment after test
        if (result.length === 0) { // uncomment after test
            return <h3>Not Found</h3> // uncomment after test
        }
        const bioReplicates = result[0].experiments; // just one mouse // uncomment after test
        // const bioReplicates = RESULT.experiments; // TEST DATA
        return (

            <Table structured>
                <Table.Header>
                    <Table.Row className="text-center text-blue font-semibold text-sm font-sans">
                        <Table.HeaderCell rowSpan='2'>Mouse</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2' textAlign='center'>Biosample</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2' textAlign='center'>Assay</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center' colSpan='2'>File</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row className="text-center text-blue font-semibold text-xs font-sans">
                        <Table.HeaderCell textAlign='center'>UUID</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Quality</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {bioReplicates.map((bioRep, mouseIndex) => {
                        return this.renderCols(bioRep)
                    })}
                </Table.Body>
            </Table>
        );
    }
}


export default ExperimentTable

